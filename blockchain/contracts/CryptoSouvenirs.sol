//SPDX-License-Identifier: GPL-3
pragma solidity ^0.8.14;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

/// Custom error if a token with a given ID is already minted.
error AlreadyMinted();

/// Custom error if a token with a given ID does not exists.
error TokenDoesNotExists();

/// Custom error if funds are not enough.
error NotEnoughFunds();

/// Custom error if problem occurs during transaction.
error ProblemDuringTransaction();

contract CryptoSouvenirs is ERC721Enumerable, Ownable, ChainlinkClient {
    using Chainlink for Chainlink.Request;
    using Strings for uint256;

    uint256 public cost = 0.05 ether;
    string private baseURI;
    bytes32 private jobId;
    bool public canBuy;
    bool public transactionSuccessful;
    uint256 private fee;
    mapping(bytes32 => address) private walletMapping;
    mapping(bytes32 => uint256) private tokenMapping;
    address public currentAddress;
    uint256 public currentToken;

    event RequestIfTokenCanBeBought(bytes32 indexed requestId, bool canBuy);

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _initialBaseURI
    ) ERC721(_name, _symbol) {
        setBaseURI(_initialBaseURI);

        setChainlinkToken(0x01BE23585060835E02B77ef475b0Cc51aA1e0709);
        setChainlinkOracle(0x3A56aE4a2831C3d3514b5D7Af5578E45eBDb7a40);
        jobId = "99e99d6e82be464a9e4b6acc55bbcf14";
        fee = (1 * LINK_DIVISIBILITY) / 10;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        if (!_exists(tokenId)) revert TokenDoesNotExists();

        string memory currentBaseURI = _baseURI();
        return
            bytes(currentBaseURI).length > 0
                ? string(
                    abi.encodePacked(
                        currentBaseURI,
                        tokenId.toString(),
                        ".json"
                    )
                )
                : "";
    }

    function mint(uint256 _tokenId) public payable returns (bytes32 requestId) {
        if (_exists(_tokenId)) revert AlreadyMinted();

        if (msg.sender != owner()) {
            if (msg.value < cost) revert NotEnoughFunds();
        }

        Chainlink.Request memory req = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfill.selector
        );

        req.add(
            "get",
            string(
                abi.encodePacked(
                    "https://cryptosouvenirs.azurewebsites.net/api/can-buy-nft?walletId=",
                    msg.sender,
                    "&nftId=",
                    _tokenId
                )
            )
        );

        req.add("path", "canBuy");
        bytes32 _requestId = sendChainlinkRequest(req, fee);
        walletMapping[_requestId] = msg.sender;
        tokenMapping[_requestId] = _tokenId;
        return _requestId;
    }

    function fulfill(bytes32 _requestId, bool _canBuy)
        public
        recordChainlinkFulfillment(_requestId)
    {
        emit RequestIfTokenCanBeBought(_requestId, _canBuy);
        transactionSuccessful = true;
        canBuy = _canBuy;
        currentAddress = walletMapping[_requestId];
        currentToken = tokenMapping[_requestId];
        if (_canBuy) {
            _safeMint(walletMapping[_requestId], tokenMapping[_requestId]);
        }
    }

    function setCost(uint256 _value) external onlyOwner {
        cost = _value;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function withdraw() public payable onlyOwner {
        (bool os, ) = payable(owner()).call{value: address(this).balance}("");
        if (!os) revert ProblemDuringTransaction();
    }
}

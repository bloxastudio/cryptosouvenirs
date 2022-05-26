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
    bool private canBuy;
    uint256 private fee;

    event RequestIfTokenCanBeBought(bytes32 indexed requestId, bool canBuy);

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _initialBaseURI
    ) ERC721(_name, _symbol) {
        setBaseURI(_initialBaseURI);

        setChainlinkToken(0xa36085F69e2889c224210F603D836748e7dC0088);
        setChainlinkOracle(0x74EcC8Bdeb76F2C6760eD2dc8A46ca5e581fA656);
        jobId = "c1c5e92880894eb6b27d3cae19670aa3";
        fee = (1 * LINK_DIVISIBILITY) / 10;
    }

    function mint(uint256 _tokenId) public payable {
        if (_exists(_tokenId)) revert AlreadyMinted();

        if (msg.sender != owner()) {
            if (msg.value < cost) revert NotEnoughFunds();
        }

        requestLocation(_tokenId);

        _safeMint(msg.sender, _tokenId);
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

    function requestLocation(uint256 _tokenId)
        public
        returns (bytes32 requestId)
    {
        Chainlink.Request memory req = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfill.selector
        );

        req.add(
            "get",
            string(
                abi.encodePacked(
                    "https://localhost:5001/api/can-buy-nft?WalletId=",
                    msg.sender,
                    "&NftId=",
                    _tokenId
                )
            )
        );

        req.add("path", "canBuy");

        return sendChainlinkRequest(req, fee);
    }

    function fulfill(bytes32 _requestId, bool _canBuy)
        public
        recordChainlinkFulfillment(_requestId)
    {
        emit RequestIfTokenCanBeBought(_requestId, _canBuy);
        canBuy = _canBuy;
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

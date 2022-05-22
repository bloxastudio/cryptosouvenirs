//SPDX-License-Identifier: GPL-3
pragma solidity ^0.8.14;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

error AlreadySold();

contract CryptoSouvenirs is ERC721Enumerable, Ownable {
    using Strings for uint256;

    uint256 public cost = 0.05 ether;
    string private baseURI;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _initialBaseURI
    ) ERC721(_name, _symbol) {
        setBaseURI(_initialBaseURI);
    }

    function mint(uint256 _tokenId) public payable {
        require(!_exists(_tokenId), "This NFT is already minted");

        if (msg.sender != owner()) {
            require(msg.value >= cost, "Not enough funds");
        }

        _safeMint(msg.sender, _tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

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
        require(os, "There was a problem during the transaction");
    }
}

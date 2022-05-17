//SPDX-License-Identifier: GPL-3
pragma solidity ^0.8.13;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

error AlreadySold();

contract CryptoSouvenirs is ERC721Enumerable, Ownable {
    string baseURI;

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {
        
    }

    function mint(string memory _tokenURI) public payable {
        uint256 supply = totalSupply();
        uint256 tokenId = supply + 1;

        _safeMint(msg.sender, tokenId);
        setBaseURI(_tokenURI);
    }

   function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }
}

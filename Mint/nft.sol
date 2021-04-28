pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MintbotCollection is ERC721URIStorage, Ownable {
    

    constructor(string memory A, string memory B, address C) ERC721(A, B) {
        
    transferOwnership(C);  
    
    }
    function mintItem(address owner, string memory tokenURI, uint newItemId)
        public
        returns (uint256)
    {

        
        _mint(owner, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}

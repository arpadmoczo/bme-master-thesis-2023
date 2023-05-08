// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract BravoNFTMinter is ERC721, ERC721Enumerable, ERC721URIStorage, ERC721Burnable, AccessControl {
    using Counters for Counters.Counter;
    using SafeMath for uint256;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    Counters.Counter private _tokenIdCounter;

    mapping(uint256 => address) public tokenIDtoAddress;

    event bravoAssigned(uint256 indexed tokenID, address nominer, address nominee); 

    modifier onlyAdmin()
    {
        require(isAdmin(msg.sender), "Restricted to admins.");
        _;
    }
    
    /// @dev Restricted to members of the user role.
    modifier onlyMinter()
    {
        require(isMinter(msg.sender), "Restricted to users.");
        _;
    }

    constructor() ERC721("BravoNFT", "BNFT") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    function safeMint(address to, string memory uri) public onlyRole(MINTER_ROLE) {
        uint256 tokenId = _tokenIdCounter.current();

        tokenIDtoAddress[tokenId] = msg.sender;

        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // The following functions are responsible for user access management.

    /// @dev Return `true` if the account belongs to the admin role.
    function isAdmin(address account)
        public virtual view returns (bool)
    {
        return hasRole(DEFAULT_ADMIN_ROLE, account);
    }
    /// @dev Return `true` if the account belongs to the user role.
    function isMinter(address account)
        public virtual view returns (bool)
    {
        return hasRole(MINTER_ROLE, account);
    }
    /// @dev Add an account to the user role. Restricted to admins.
    function addMinter(address account)
        public virtual onlyAdmin
    {
        grantRole(MINTER_ROLE, account);
    }
    /// @dev Add an account to the admin role. Restricted to admins.
    function addAdmin(address account)
        public virtual onlyAdmin
    {
        grantRole(DEFAULT_ADMIN_ROLE, account);
    }
    /// @dev Remove an account from the user role. Restricted to admins.
    function removeUser(address account)
        public virtual onlyAdmin
    {
        revokeRole(MINTER_ROLE, account);
    }
    /// @dev Remove oneself from the admin role.
    function renounceAdmin()
        public virtual
    {
        renounceRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
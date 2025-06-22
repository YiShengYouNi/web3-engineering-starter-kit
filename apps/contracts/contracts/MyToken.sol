// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Heng is ERC20, Ownable {
    string public logoURI;
    mapping(address => bool) public minters;

    event LogoUpdated(string newLogoURI);
    event MinterAdded(address indexed minter);
    event MinterRemoved(address indexed minter);

    constructor(
        string memory _logoURI,
        address initialOwner
    ) ERC20("Heng", "HENG") Ownable(initialOwner) {
        logoURI = _logoURI;
        minters[msg.sender] = true;
    }

    modifier onlyMinter() {
        require(minters[msg.sender], "Not authorized");
        _;
    }

    function setLogoURI(string calldata _logoURI) external onlyOwner {
        logoURI = _logoURI;
        emit LogoUpdated(_logoURI);
    }

    function addMinter(address _minter) external onlyOwner {
        minters[_minter] = true;
        emit MinterAdded(_minter);
    }

    function removeMinter(address _minter) external onlyOwner {
        minters[_minter] = false;
        emit MinterRemoved(_minter);
    }

    function mint(address to, uint256 amount) external onlyMinter {
        _mint(to, amount);
    }

    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }
}

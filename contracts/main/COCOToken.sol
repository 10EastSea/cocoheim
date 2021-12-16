// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract COCOToken is ERC20 {
    constructor() ERC20('COCO Token', 'COCO', 18) public {
        _mint(msg.sender, 100000 * 10 ** uint256(18));
    }
}
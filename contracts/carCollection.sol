// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract carCollection is ERC1155 {
    uint256 public constant BMW = 1;
    uint256 public constant AUDI = 2;
    uint256 public constant Toyota = 3;

    constructor()
        ERC1155(
            "https://ipfs.io/ipfs/bafybeic5l64ouffbgmdh2njf3seim3gabdezv4xf5hhd3u5mbk23tsbmwy/{id}.json"
        )
    {
        _mint(msg.sender, BMW, 1, "");
        _mint(msg.sender, AUDI, 1, "");
        _mint(msg.sender, Toyota, 1, "");
    }

    function uri(
        uint256 _tokenid
    ) public pure override returns (string memory) {
        return
            string(
                abi.encodePacked(
                    "https://ipfs.io/ipfs/bafybeic5l64ouffbgmdh2njf3seim3gabdezv4xf5hhd3u5mbk23tsbmwy/",
                    Strings.toString(_tokenid),
                    ".json"
                )
            );
    }
}

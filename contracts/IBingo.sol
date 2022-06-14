// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IBingo {
    event GameJoined(address indexed playerAddress);
    event GameStarted(uint timestamp);
    event NumberDrawn(uint8 number);
    event GameWon(uint timestamp, address indexed winner);

    function joinGame() external payable;
    function startGame() external;
    function getBoard() external returns(string memory boardStr);
    function drawNumber() external;
    function claimBingo() external;
}
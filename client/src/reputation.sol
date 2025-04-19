// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ReputationSystem {
    address public owner;
    uint public sbtThreshold = 100;

    mapping(address => uint) public reputation;
    mapping(address => bool) public hasMintedSBT;

    event ReputationUpdated(address indexed user, uint newScore);
    event SBTMinted(address indexed user);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this.");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // Example Action 1: DAO Vote
    function voteInDAO(address user) public onlyOwner {
        _increaseReputation(user, 10);
    }

    // Example Action 2: Complete Task
    function completeTask(address user) public onlyOwner {
        _increaseReputation(user, 20);
    }

    // Example Action 3: Verify User
    function verifyUser(address user) public onlyOwner {
        _increaseReputation(user, 30);
    }

    // Internal function to handle rep logic
    function _increaseReputation(address user, uint points) internal {
        reputation[user] += points;
        emit ReputationUpdated(user, reputation[user]);

        if (reputation[user] >= sbtThreshold && !hasMintedSBT[user]) {
            hasMintedSBT[user] = true;
            emit SBTMinted(user);
        }
    }

    // View function
    function getReputation(address user) public view returns (uint) {
        return reputation[user];
    }

    function hasSoulboundToken(address user) public view returns (bool) {
        return hasMintedSBT[user];
    }
}

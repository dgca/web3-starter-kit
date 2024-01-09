// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

struct Todo {
    string text;
    bool completed;
}

contract TodoList is Ownable {
    Todo[] public todos;

    event TodoAdded(string text, bool completed);

    constructor(address _initialOwner) Ownable(_initialOwner) {}

    function add(string memory _todo) public onlyOwner {
        todos.push(Todo({ text: _todo, completed: false }));
        emit TodoAdded(_todo, false);
    }

    function toggleCompleted(uint _index) public onlyOwner {
        todos[_index].completed = !todos[_index].completed;
    }

    function getAll() public view returns (Todo[] memory) {
        return todos;
    }

    function isCompleted(uint _index) public view returns (bool) {
        return todos[_index].completed;
    }
}

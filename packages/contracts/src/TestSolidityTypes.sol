// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract TestSolidityTypes {
    uint256 public counter;

    function echoBoolean(bool input) public pure returns (bool) {
        return input;
    }

    function getBoolean() public pure returns (bool) {
        return true;
    }

    function echoUint(uint256 input) public pure returns (uint256) {
        return input;
    }

    function getUint() public pure returns (uint256) {
        return 420;
    }

    function echoString(
        string memory input
    ) public pure returns (string memory) {
        return input;
    }

    function getString() public pure returns (string memory) {
        return "Hello World";
    }

    function echoBytes(bytes memory input) public pure returns (bytes memory) {
        return input;
    }

    function getBytes() public pure returns (bytes memory) {
        return "these are some bytes";
    }

    function echoAddress(address input) public pure returns (address) {
        return input;
    }

    function getAddress() public view returns (address) {
        return msg.sender;
    }

    function echoUintArray(
        uint256[] memory input
    ) public pure returns (uint256[] memory) {
        return input;
    }

    function getUintArray() public pure returns (uint256[] memory) {
        uint256[] memory array = new uint256[](3);
        array[0] = 1;
        array[1] = 2;
        array[2] = 3;
        return array;
    }

    function echoBoolArray(
        bool[] memory input
    ) public pure returns (bool[] memory) {
        return input;
    }

    function getBoolArray() public pure returns (bool[] memory) {
        bool[] memory array = new bool[](3);
        array[0] = true;
        array[1] = false;
        array[2] = true;
        return array;
    }

    enum MockEnum {
        Value1,
        Value2,
        Value3
    }

    function echoEnum(MockEnum input) public pure returns (MockEnum) {
        return input;
    }

    function getEnum() public pure returns (MockEnum) {
        return MockEnum.Value2;
    }

    struct MockStruct {
        uint256 num;
        string text;
    }

    function echoStruct(
        MockStruct memory input
    ) public pure returns (MockStruct memory) {
        return input;
    }

    function getStruct() public pure returns (MockStruct memory) {
        return MockStruct(420, "Nice");
    }

    // Note: Solidity functions cannot accept or return mappings directly,
    // but we can demonstrate setting and getting values from a mapping.
    mapping(uint256 => string) private exampleMapping;

    function setMappingValue(uint256 key, string memory value) public {
        exampleMapping[key] = value;
    }

    function getMappingValue(uint256 key) public view returns (string memory) {
        return exampleMapping[key];
    }

    function incrementCounter() public returns (uint256) {
        counter++;
        return counter;
    }
}

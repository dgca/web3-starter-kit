// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract TestSolidityTypes {
    uint256 public counter;

    function echoBoolean(bool input) public pure returns (bool) {
        return input;
    }

    function echoInt(uint256 input) public pure returns (uint256) {
        return input;
    }

    function echoString(
        string memory input
    ) public pure returns (string memory) {
        return input;
    }

    function echoBytes(bytes memory input) public pure returns (bytes memory) {
        return input;
    }

    function echoArray(
        uint256[] memory input
    ) public pure returns (uint256[] memory) {
        return input;
    }

    enum MockEnum {
        Value1,
        Value2,
        Value3
    }

    function echoEnum(MockEnum input) public pure returns (MockEnum) {
        return input;
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

    function echoAddress(address input) public pure returns (address) {
        return input;
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

import { AbiFunction } from "abitype";
import { Address } from "viem";

export function isReadFunction(fn: AbiFunction) {
  return fn.stateMutability === "view" || fn.stateMutability === "pure";
}

export function assertAddress(
  maybeAddress: string,
): asserts maybeAddress is Address {
  if (!maybeAddress.startsWith("0x")) {
    throw new Error(`Address ${maybeAddress} does not start with 0x`);
  }
  if (maybeAddress.length !== 42) {
    throw new Error(`Address ${maybeAddress} is not 42 characters long`);
  }
}

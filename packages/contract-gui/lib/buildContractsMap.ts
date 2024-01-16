import fs from "fs";
import { join } from "path";

import { Abi } from "viem";

export function buildContractsMap(
  artifactsPath: string,
  contracts: Array<string>,
  defaultAddresses: {
    [key: string]: string;
  },
) {
  const result: {
    [key: string]: {
      abi: Abi;
      address?: string;
    };
  } = {};

  for (const contract of contracts) {
    const contractJsonPath = join(
      artifactsPath,
      `${contract}.sol`,
      `${contract}.json`,
    );
    const contractJsonContent = fs.readFileSync(contractJsonPath, "utf8");
    const contractJson = JSON.parse(contractJsonContent);
    const abi = contractJson.abi;

    result[contract] = {
      abi,
    };

    if (defaultAddresses[contract]) {
      result[contract].address = defaultAddresses[contract];
    }
  }

  return result;
}

import fs from "fs";
import { join } from "path";

import { Abi } from "viem";

import { parseNestedDir } from "./parseNestedDir";

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

  const contractNamesSet = new Set(contracts);

  const contractJsonFilePaths = parseNestedDir(artifactsPath).filter((path) => {
    const fileName = path.at(-1);
    const isContractJson = !!fileName && /^\w+\.json$/.test(fileName);
    if (!isContractJson) return false;
    return contractNamesSet.has(fileName.replace(/\.json$/, ""));
  });

  for (const filePath of contractJsonFilePaths) {
    const contractName = filePath.at(-1)?.replace(/\.json$/, "");

    if (!contractName) continue;

    const contractJsonPath = join(artifactsPath, ...filePath);
    const contractJsonContent = fs.readFileSync(contractJsonPath, "utf8");
    const contractJson = JSON.parse(contractJsonContent);
    const abi = contractJson.abi;

    result[contractName] = {
      abi,
    };

    if (defaultAddresses[contractName]) {
      result[contractName].address = defaultAddresses[contractName];
    }
  }

  return result;
}

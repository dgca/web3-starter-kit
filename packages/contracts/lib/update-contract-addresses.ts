import fs from "fs";
import path from "path";

import { updateExportIndexFile } from "./update-export-index-file";

const addressesFilePath = path.join(path.resolve(), "exports", "addresses.ts");

export function updateContractAddresses(
  network: string,
  addresses: {
    [contract: string]: string;
  },
) {
  console.log("updating addresses");
  console.log(addressesFilePath);
  let addressMap: {
    [network: string]: {
      [contract: string]: string;
    };
  } = {};

  if (fs.existsSync(addressesFilePath)) {
    addressMap = require(addressesFilePath);
  }

  if (!addressMap[network]) {
    addressMap[network] = {};
  }

  for (const [contract, address] of Object.entries(addresses)) {
    addressMap[network][contract] = address;
  }

  const fileContents = `export const contractAddresses = ${JSON.stringify(
    addressMap,
    null,
    2,
  )};`;

  fs.writeFileSync(addressesFilePath, fileContents);
  updateExportIndexFile();
}

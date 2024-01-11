import fs from "fs";
import path from "path";

const abisFilePath = path.join(path.resolve(), "exports", "abis.ts");
const addressesFilePath = path.join(path.resolve(), "exports", "addresses.ts");
const indexFilePath = path.join(path.resolve(), "exports", "index.ts");

export function updateExportIndexFile() {
  let fileContent = "";

  if (fs.existsSync(abisFilePath)) {
    fileContent += `export * from "./abis";\n`;
  }

  if (fs.existsSync(addressesFilePath)) {
    fileContent += `export * from "./addresses";\n`;
  }

  fs.writeFileSync(indexFilePath, fileContent);
}

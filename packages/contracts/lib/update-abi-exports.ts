import fs from "fs";
import path from "path";

import { updateExportIndexFile } from "./update-export-index-file";

const contractArtifactsDir = path.join(path.resolve(), "artifacts", "src");

const contractArtifacts = fs.readdirSync(contractArtifactsDir);

let fileContent = "";
const contractNames: string[] = [];

for (const folderName of contractArtifacts) {
  const contractName = folderName.replace(/\.sol$/, "");
  const jsonPath = path.join(
    contractArtifactsDir,
    folderName,
    `${contractName}.json`,
  );

  const contractJson = require(jsonPath);

  fileContent += `export const ${contractName} = ${JSON.stringify(
    contractJson.abi,
    null,
    2,
  )} as const;\n\n`;
  contractNames.push(contractName);
}

if (contractNames.length) {
  fileContent += `export const abis = { ${contractNames.join(
    ", ",
  )} } as const;\n`;
}

const distPath = path.join(path.resolve(), "exports");

if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath);
}

const filePath = path.join(distPath, "abis.ts");

fs.writeFileSync(path.join(filePath), fileContent);

updateExportIndexFile();

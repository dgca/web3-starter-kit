import path from "path";
import fs from "fs";

const contractArtifactsDir = path.join(path.resolve(), "artifacts", "src");

const contractArtifacts = fs.readdirSync(contractArtifactsDir);

let fileContent = "";

for (const folderName of contractArtifacts) {
  const contractName = folderName.replace(/\.sol$/, "");
  const jsonPath = path.join(
    contractArtifactsDir,
    folderName,
    `${contractName}.json`
  );

  const contractJson = require(jsonPath);

  fileContent += `export const ${contractName} = ${JSON.stringify(
    contractJson.abi,
    null,
    2
  )} as const;\n\n`;
}

const distPath = path.join(path.resolve(), "abis");

if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath);
}

const filePath = path.join(distPath, "index.ts");

fs.writeFileSync(path.join(filePath), fileContent);

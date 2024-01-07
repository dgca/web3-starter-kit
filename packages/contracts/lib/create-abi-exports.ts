import path from "path";
import fs from "fs";

const contractArtifactsDir = path.join(path.resolve(), "artifacts", "src");

const contractArtifacts = fs.readdirSync(contractArtifactsDir);

let importsContent = `import { ArtifactsMap } from "hardhat/types/artifacts";\n`;

let exportsContent = `\n`;

for (const contract of contractArtifacts) {
  const contractName = contract.replace(/\.sol$/, "");
  importsContent += `import ${contractName}Json from "../artifacts/src/${contract}/${contractName}.json";\n`;
  exportsContent += `export const ${contractName} = ${contractName}Json as ArtifactsMap["${contractName}"];\n`;
}

const dirPath = path.join(path.resolve(), "artifacts");

if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

const filePath = path.join(dirPath, "index.ts");

fs.writeFileSync(path.join(filePath), importsContent + exportsContent);

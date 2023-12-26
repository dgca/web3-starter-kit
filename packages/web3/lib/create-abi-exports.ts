import path from "path";
import fs from "fs";

const contractArtifactsDir = path.join(
  path.resolve(),
  "artifacts",
  "contracts"
);

const contractArtifacts = fs.readdirSync(contractArtifactsDir);

let importsContent = `import { ArtifactsMap } from "hardhat/types/artifacts";\n`;

let exportsContent = `\n`;

for (const contract of contractArtifacts) {
  const contractName = contract.replace(/\.sol$/, "");
  importsContent += `import ${contractName}Json from "../artifacts/contracts/${contract}/${contractName}.json";\n`;
  exportsContent += `export const ${contractName} = ${contractName}Json as ArtifactsMap["${contractName}"];\n`;
}

fs.writeFileSync(
  path.join(path.resolve(), "dist", "index.ts"),
  importsContent + exportsContent
);

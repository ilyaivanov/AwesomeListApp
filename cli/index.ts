import * as fs from "fs";
import {createRepository, getTokens, stringify} from "./loadMd";

const modelsPath = 'data/models/awesome.ts';

getTokens()
  .then((tokens) => {
    const repository = createRepository(tokens);
    const sectionFormatted = `export default ${stringify(repository)}`;
    fs.writeFileSync(modelsPath, sectionFormatted);
    console.log(`Done writing to ${modelsPath}`);
  });
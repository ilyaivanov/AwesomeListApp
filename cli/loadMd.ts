import fetch from 'node-fetch'
import * as fs from 'fs'
import {parse} from "./parseMd";
import {parseHeader} from "./parseTokens";

const url = 'https://api.github.com/repos/sindresorhus/awesome/readme';
const tokensPath = 'data/parsed/awesome.ts';
const modelsPath = 'data/models/awesome.ts';

const decode = (response: string, encoding: string) => new Buffer(response, encoding).toString('ascii');

const stringify = (obj: any) => JSON.stringify(obj, null, 2);


fetch(url)
  .then(res => res.json())
  .then(response => decode(response.content, response.encoding))
  .then(function (md) {
    console.log(`Downloaded md from ${url}. Length: ${md.length} chars.`);
    console.log(`Sample: ${md.slice(0, 50)}...`);

    const tokens = parse(md);

    console.log(`Parsed ${tokens.length} tokens`);

    const formattedTokens = `export default ${stringify(tokens)};`;

    fs.writeFileSync(tokensPath, formattedTokens);

    console.log(`Done writing to ${tokensPath}`);

    const section = parseHeader(tokens);
    const sectionFormatted = `export default ${stringify(section)}`;
    fs.writeFileSync(modelsPath, sectionFormatted);
    console.log(`Done writing to ${modelsPath}`);
  });
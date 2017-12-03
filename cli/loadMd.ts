import fetch from 'node-fetch'
import * as fs from 'fs'
import {parse} from "./parseMd";

const url = 'https://api.github.com/repos/sindresorhus/awesome/readme'
const path = 'data/parsed/awesome.ts';

const decode = (response: string, encoding: string) => new Buffer(response, encoding).toString('ascii');

fetch(url)
  .then(res => res.json())
  .then(response => decode(response.content, response.encoding))
  .then(function (md) {
    console.log(`Downloaded md from ${url}. Length: ${md.length} chars.`);
    console.log(`Sample: ${md.slice(0, 50)}...`);

    const tokens = parse(md);

    console.log(`Parsed ${tokens.length} tokens`);

    const formattedTokens = `export default ${JSON.stringify(tokens, null, 2)};`;

    fs.writeFileSync(path, formattedTokens);

    console.log(`Done writing to ${path}`);
  });
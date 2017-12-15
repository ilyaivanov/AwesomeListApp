import * as fs from 'fs';
import fetch from 'node-fetch';
import {parse} from './parseMd';
import {decode, stringify} from './common';

const url = 'https://api.github.com/repos/sindresorhus/awesome/readme';
const tokensPath = 'data/parsed/awesome.ts';

export const load = () =>
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
  });
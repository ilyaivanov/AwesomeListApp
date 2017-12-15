import * as fs from 'fs';
import fetch from 'node-fetch';

import {decode} from './common';

const url = 'https://api.github.com/repos/sindresorhus/awesome/readme';
export const mdPath = 'data/md/root.md';

export const load = () =>
  fetch(url)
  .then(res => res.json())
  .then(response => decode(response.content, response.encoding))
  .then(function (md) {
    console.log(`Downloaded md from ${url}. Length: ${md.length} chars.`);
    console.log(`Sample: ${md.slice(0, 50)}...`);
    fs.writeFileSync(mdPath, md);

    console.log(`Done writing to ${mdPath}`);
  });
import * as fs from 'fs';
import fetch from 'node-fetch';

import {createFilePath, toMd, decode} from './util';

export const mdBase = 'data/md/';

export const load = (url: string) =>
  fetch(toMd(url))
    .then(res => res.json())
    .then(response => decode(response.content, response.encoding))
    .then(function (md) {
      console.log(`Downloaded md from ${url}. Length: ${md.length} chars.`);
      console.log(`Sample: ${md.slice(0, 50)}...`);
      const fileUrl = createFilePath(mdBase, url, 'md');
      fs.writeFileSync(fileUrl, md);

      console.log(`Done writing to ${fileUrl}`);
    });
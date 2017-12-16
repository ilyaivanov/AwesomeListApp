import * as fs from 'fs';
import fetch from 'node-fetch';

import {createFilePath, decode, root, toMd} from './util';
import {parseRoot, readAndParse} from './parse';
import {flatten} from 'lodash';

export const mdBase = 'data/md/';

const loadRepo = (url: string) =>
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


export const load = () => {
  return loadRepo(root.url)
    .then(() => {
      const sections = readAndParse(root.url);
      const allLinks = flatten(sections.map(s => s.links.map(l => l.link)));
      console.log(allLinks)
      // return Promise.all([
      //   () =>
      // ])
    });
}

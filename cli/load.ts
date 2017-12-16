import * as fs from 'fs';
import fetch from 'node-fetch';

import {allRemoteLinks, createIdForUrl, decode, root, toGithubFromRepoId} from './util';
import {readAndParse} from './parse';

export const mdBase = 'data/md/';

const loadRepo = (repoId: string) =>
  fetch(toGithubFromRepoId(repoId))
    .then(res => res.json())
    .then(response => decode(response.content, response.encoding))
    .then(function (md) {
      console.log(`Downloaded md from ${repoId}. Length: ${md.length} chars.`);
      const fileUrl = mdBase + repoId + '.md';
      fs.writeFileSync(fileUrl, md);
      console.log(`Done writing to ${fileUrl}`);
    });


export const load = () => {
  return loadRepo(createIdForUrl(root.url))
    .then(() => {
      const sections = readAndParse(root.url);
      const allLinks = allRemoteLinks(sections);
      return Promise.all([
        loadRepo(allLinks[0]),
        loadRepo(allLinks[2]),
      ]).then(() => {
        console.log('Done loading two repos')
      })
    });
}

import * as fs from 'fs';
import fetch from 'node-fetch';

import {allRemoteLinks, createIdForUrl, decode, root, toGithubFromRepoId} from './util';
import {parseFromFile} from './parse';

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

const waitFor = (time: number) => new Promise(resolve => setTimeout(resolve, time));

export const load = () => {
  return loadRepo(createIdForUrl(root.url))
    .then(() => {
      const sections = parseFromFile(root.url);
      const allLinks = allRemoteLinks(sections);
      const sectionsToLoad = allLinks.slice(0, 50);

      return sectionsToLoad.reduce((promise, link, i) => {
        return promise.then(() => {
          return loadRepo(link).then(() => waitFor(i * 1000 * 2)) as any
        });
      }, Promise.resolve())
        .then(
          () => console.log('Done loading two repos'),
          (error) => console.error(error));
    });
}

import {flatten} from 'lodash';
import {Section} from '../data/types';

export const getParts = (url: string) => {
  const parts = url.split('/');
  return parts.slice(parts.length - 2);
}
export const createIdForUrl = (url: string) => getParts(url).join('_');

export const toMd = (url: string) => {
  const [username, reponame] = getParts(url);
  return `https://api.github.com/repos/${username}/${reponame}/readme`;
};
export const toGithubFromRepoId = (repoId: string) => {
  const [username, reponame] = repoId.split('_');
  return `https://api.github.com/repos/${username}/${reponame}/readme`;
};

export const createFilePath = (base: string, url: string, extension: string) =>
  base + getParts(url).join('_') + '.' + extension;


export const allRemoteLinks = (sections: Section[]) =>
  flatten(sections.map(s => s.links.map(l => l.link)))
    .filter(l => l.indexOf('#') === -1);


export const decode = (response: string, encoding: string) => new Buffer(response, encoding).toString('utf8');

export const stringify = (obj: any) => JSON.stringify(obj, null, 2);

const rootUrl = 'https://github.com/sindresorhus/awesome';
export const root = {
  name: 'Awesome',
  id: createIdForUrl(rootUrl),
  url: rootUrl,
};

export const findRoot = (sections: Section[]) => sections.find(s => s.id === 'sindresorhus_awesome') as Section;
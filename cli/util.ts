import {flatten} from 'lodash';
import {Repository} from '../types';

export const getParts = (url: string) => {
  const parts = url.split('/');
  return parts.slice(parts.length - 2);
}

export const toMd = (url: string) => {
  const [username, reponame] = getParts(url);
  return `https://api.github.com/repos/${username}/${reponame}/readme`;
};

export const createFilePath = (base: string, url: string, extension: string) =>
  base + getParts(url).join('_') + '.' + extension;


export const allLinks = (rep: Repository) =>
  flatten(rep.sections.map(s => s.links.map(l => l.link)))


export const decode = (response: string, encoding: string) => new Buffer(response, encoding).toString('utf8');

export const stringify = (obj: any) => JSON.stringify(obj, null, 2);

export const root = {
  name: 'Awesome',
  url: 'https://github.com/sindresorhus/awesome'
};


import * as fs from 'fs';
import {Repository, Token} from '../types';
import {parseHeader, parseLocalSection} from './parseTokens';
import {mdBase} from './load';
import parseMd from './parseMd';
import {allLinks, createFilePath, stringify} from './util';

const modelsBase = 'data/models/';

export const createRepository = (tokens: Token[]): Repository => {
  const home = parseHeader(tokens);
  return {
    home,
    sections: home.links.map(link => parseLocalSection(tokens, link))
  };
};

export const parseRepository = (url: string) => {
  const md = fs.readFileSync(createFilePath(mdBase, url, 'md'));

  const tokens = parseMd(md.toString());

  console.log(`Parsed ${tokens.length} tokens`);
  return createRepository(tokens as any);
};

const saveRepository = (repository: Repository, url: string) => {
  const sectionFormatted = `export default ${stringify(repository)}`;

  const modelsPath = createFilePath(modelsBase, url, 'ts');
  fs.writeFileSync(modelsPath, sectionFormatted);
  console.log(`Done writing to ${modelsPath}. Total of ${repository.sections.length} sections`);
}

export const parseRoot = (url: string) => {
  const rep = parseRepository(url);
  saveRepository(rep, url);
  const links = allLinks(rep);

  const nodeRep = parseRepository(links[0] as string);
  saveRepository(nodeRep, links[0] as string);
}
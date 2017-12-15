import * as fs from 'fs';
import {stringify} from './common';
import {Repository, Token} from '../types';
import {parseHeader, parseLocalSection} from './parseTokens';
import {mdBase} from './load';
import parseMd from './parseMd';
import {createFilePath} from './url';

const modelsBase = 'data/models/';

export const createRepository = (tokens: Token[]): Repository => {
  const home = parseHeader(tokens);
  return {
    home,
    sections: home.links.map(link => parseLocalSection(tokens, link.link))
  };
};

export const parse = (url: string) => {
  const md = fs.readFileSync(createFilePath(mdBase, url, 'md'));

  const tokens = parseMd(md.toString());

  console.log(`Parsed ${tokens.length} tokens`);
  const repository = createRepository(tokens as any);

  const sectionFormatted = `export default ${stringify(repository)}`;

  const modelsPath = createFilePath(modelsBase, url, 'ts');
  fs.writeFileSync(modelsPath, sectionFormatted);
  console.log(`Done writing to ${modelsPath}. Total of ${repository.sections.length} sections`);
};

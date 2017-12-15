import * as fs from 'fs';
import {stringify} from './common';
import {Repository, Token} from '../types';
import {parseHeader, parseLocalSection} from './parseTokens';
import {mdPath} from './load';
import parseMd from './parseMd';

const modelsPath = 'data/models/awesome.ts';

export const createRepository = (tokens: Token[]): Repository => {
  const home = parseHeader(tokens);
  return {
    home,
    sections: home.links.map(link => parseLocalSection(tokens, link.link))
  };
};

export const parse = () => {
  const md = fs.readFileSync(mdPath);

  const tokens = parseMd(md.toString());

  console.log(`Parsed ${tokens.length} tokens`);
  const repository = createRepository(tokens as any);

  const sectionFormatted = `export default ${stringify(repository)}`;
  fs.writeFileSync(modelsPath, sectionFormatted);
  console.log(`Done writing to ${modelsPath}. Total of ${repository.sections.length} sections`);
};

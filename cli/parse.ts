import * as fs from 'fs';
import {Section, Token} from '../data/types';
import {parseHeader, parseLocalSection} from './parseTokens';
import {mdBase} from './load';
import parseMd from './parseMd';
import {allRemoteLinks, createFilePath, stringify} from './util';

export const parseIntoSections = (repositoryUrl: string, tokens: Token[]): Section[] => {
  const root = parseHeader(tokens, repositoryUrl);
  const next = root.links.map(link => parseLocalSection(tokens, repositoryUrl, link));
  return [root, ...next];
};

export const readAndParse = (url: string) => {
  const md = fs.readFileSync(createFilePath(mdBase, url, 'md'));

  const tokens = parseMd(md.toString());

  console.log(`Parsed ${tokens.length} tokens`);
  return parseIntoSections(url, tokens);
};


export const parseRoot = (rootRepoId: string) => {
  const repSections = readAndParse(rootRepoId);
  const links = allRemoteLinks(repSections);

  const nodeSections = readAndParse(links[0]);
  const overall = [
    ...repSections,
    ...nodeSections,
  ];
  save(overall);
};


const save = (repository: {}) => {
  const sectionFormatted = `export default ${stringify(repository)}`;

  fs.writeFileSync('data/sections.ts', sectionFormatted);
  console.log(`Done writing to 'data/sections.ts'`);
};

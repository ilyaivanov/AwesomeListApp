import * as fs from 'fs';
import {Section, Token} from '../data/types';
import {parseHeader, parseLocalSection} from './parseTokens';
import {mdBase} from './load';
import parseMd from './parseMd';
import {allLinksFromSections, createFilePath, stringify} from './util';
import {isLocalLink} from '../data/utils';

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

const save = (repository: {}) => {
  const sectionFormatted = `export default ${stringify(repository)}`;

  fs.writeFileSync('data/sections.ts', sectionFormatted);
  console.log(`Done writing to 'data/sections.ts'`);
}

export const parseRoot = (url: string) => {
  const repSections = readAndParse(url);
  const links = allLinksFromSections(repSections);
  const remoteLinks = links.filter(l => !isLocalLink(l));

  const nodeSections = readAndParse(remoteLinks[0]);
  const overall = [
    ...repSections,
    ...nodeSections,
  ];
  save(overall);
};
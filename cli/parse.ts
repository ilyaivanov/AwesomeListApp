import * as fs from 'fs';
import {Link, Section, Token} from '../data/types';
import {parseHeader, parseLocalSection} from './parseTokens';
import {mdBase} from './load';
import parseMd from './parseMd';
import {allRemoteLinks, getParts, root, stringify} from './util';
import {flatten} from 'lodash';

export const parseIntoSections = (tokens: Token[], repoId: string): Section[] => {
  const root = parseHeader(tokens);
  root.id = repoId;
  const next = root.links.map(link => parseLocalSection(tokens, link));
  const nextWithIds = next.map(s => ({...s, id: repoId + s.id,}));
  const sections = [root, ...nextWithIds];
  return sections.map(s => ({...s, links: transformLinks(s.links, repoId)}))
};

export const readAndParse = (repoId: string) => {
  console.log(`Parsing ${repoId}`);
  const md = fs.readFileSync(mdBase + repoId + '.md');

  const tokens = parseMd(md.toString());

  console.log(`Parsed ${tokens.length} tokens`);
  return parseIntoSections(tokens, repoId);
};

export const parseRoot = () => {
  const repSections = readAndParse(root.id);
  const links = allRemoteLinks(repSections);

  const linkToParse = [0];

  const parsed = flatten(linkToParse.map(i => readAndParse(links[i])));

  const sections = [
    ...repSections,
    ...parsed,
  ];

  const sectionFormatted = `export default ${stringify(sections)}`;

  fs.writeFileSync('data/sections.ts', sectionFormatted);
  console.log(`Done writing to 'data/sections.ts'`);
};

const transformLinks = (links: Link[], repoId: string): Link[] =>
  links.map(l => ({...l, link: transformLink(l.link, repoId)}));


const transformLink = (link: string, repoUrl: string): string =>
  link.startsWith('#') ? getParts(repoUrl).join('_') + link : getParts(link).join('_');
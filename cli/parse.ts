import {Link, Section, Token} from '../data/types';
import * as md from 'markdown-it';
import {find, findIndex, flatten, trim} from 'lodash';
import {normalizeLocalLink, validateNonEmpty} from '../data/utils';
import {allRemoteLinks, createIdForUrl, root, stringify} from './util';
import {mdBase} from './load';
import * as fs from 'fs';
import postProcessing from './postProcessing';

const mark = md({
  html: true,
  linkify: true,
  typographer: true
});

export const parseFromFile = (repoId: string): Section[] => {
  const filePath = mdBase + repoId + '.md';
  console.log(`Reading ${repoId} from ${filePath}`);

  const md = fs.readFileSync(filePath);

  return parseFromMd(md.toString(), repoId);
};

export const parseAll = () => {
  const repSections = parseFromFile(root.id);
  const links = allRemoteLinks(repSections);

  const linkToParse = [0, 1];

  const parsed = flatten(linkToParse.map(i => parseFromFile(links[i])));

  const sections = [
    ...repSections,
    ...parsed,
  ];

  const sectionFormatted = `export default ${stringify(sections)}`;

  fs.writeFileSync('data/sections.ts', sectionFormatted);
  console.log(`Done writing to 'data/sections.ts'`);
};

export const parseFromMd = (md: string, repoId: string): Section[] => {
  const tokens = mark.parse(md, null);
  const headingIndices = tokens
    .map((token, i) => (token.type === 'heading_open' && token.markup !== '#') ? i : -1)
    .filter(i => i >= 0);

  const sections = headingIndices.map(index => localizeSection(parseSection(tokens, index), repoId));

  //first section considered root of the repository, move to postprocessing
  sections[0].id = repoId;
  return postProcessing(sections);
};

const localizeSection = (section: Section, repoId: string) => ({
  ...section,
  id: repoId + normalizeLocalLink(section.title),
  links: section.links.map(l => ({...l, link: localizeLink(l.link, repoId)}))
});


//LEGACY, to refactor
const mapTitle = (token: Token) => {
  const textToken = token.children.find(x => x.type === 'text');
  const validated = validateNonEmpty(textToken, 'Could not find text token in ');
  return validated.content;
};

const parseLink = (token: Token): string => {
  const linkToken = token.children.find(x => x.type === 'link_open');
  if (!linkToken) {
    return '';
  }
  const validated = validateNonEmpty(linkToken, 'Could not find link_open token in ');
  return validated.attrs[0][1];
};

const parseSubtitle = (token: Token) => {
  const textTokenIndex = token.children.findIndex(x => x.type === 'text');
  const subtitleToken = find(token.children, x => x.type === 'text', textTokenIndex + 1);
  const subtitle = subtitleToken ? subtitleToken.content : '';
  return trim(subtitle, '- —');
};

const createLink = (token: Token): Link => ({
  title: mapTitle(token),
  subtitle: parseSubtitle(token),
  link: parseLink(token),
  level: Math.min(token.level - 3, 1)
});

const parseSection = (tokens: Token[], startIndex: number): Section => {
  const endParagraphIndex = findIndex(tokens.slice(startIndex), token => token.type === 'heading_close') + startIndex;
  const nextParagraph = findIndex(tokens.slice(endParagraphIndex + 1), token => token.type === 'heading_open') + endParagraphIndex;
  const headerToken = find(tokens, token => token.type === 'inline', startIndex);
  const linkTokens = tokens.slice(endParagraphIndex, nextParagraph).filter(t => t.type === 'inline');
  return {
    id: '',
    title: headerToken ? headerToken.content : 'Unknown',
    links: linkTokens.map(createLink),
  };
};

const localizeLink = (link: string, repoId: string): string =>
  link.startsWith('#') ? repoId + link :  repoId === root.id ? createIdForUrl(link) : link;
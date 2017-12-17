import {find, findIndex, trim} from 'lodash';
import {Link, Section, Token} from '../data/types';
import {normalizeLocalLink, validateNonEmpty} from '../data/utils';
import {getParts} from './util';

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

export const parseLocalSection = (tokens: Token[], localLink: Link): Section => {
  const sectionStateIndex = tokens.findIndex(token => normalizeLocalLink(token.content) === localLink.link || token.content === localLink.title);
  if (sectionStateIndex === -1) {
    throw  new Error(`Can't find section header for ${localLink.link}`);
  }
  const previousToken = sectionStateIndex - 1;
  if (tokens[previousToken].type !== 'heading_open') {
    //TODO: investigate for Node.js repository
    // throw new Error(`Token at ${previousToken} should be start of heading, but what ${tokens[previousToken].type}`)
  }
  const baseSection = parseSection(tokens, previousToken);
  return {
    ...baseSection,
    id: localLink.link,
  };
};

export const parseHeader = (tokens: Token[]): Section => {
  const startIndex = findIndex(tokens, token => token.type === 'heading_open' && token.markup !== '#'); //specific for node.js repo
  return {
    ...parseSection(tokens, startIndex),
    title: 'Awesome List',
    id: '',
  };
};
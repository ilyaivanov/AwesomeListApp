import {findIndex} from 'lodash';
import {Link, Section, Token} from '../types';
import {normalizeTitle, validateNonEmpty} from "../data/utils";

const mapTitle = (token: Token) => {
  const textToken = token.children.find(x => x.type === 'text');
  const validated = validateNonEmpty(textToken, 'Could not find text token in ');
  return validated.content;
};

const parseLink = (token: Token) => {
  const linkToken = token.children.find(x => x.type === 'link_open');
  const validated = validateNonEmpty(linkToken, 'Could not find link_open token in ');
  return validated.attrs[0][1];
};

const createLink = (token: Token): Link => ({title: mapTitle(token), subtitle: '', link: parseLink(token)});

const parseSection = (tokens: Token[], startIndex: number): Section => {
  const endParagraphIndex = findIndex(tokens.slice(startIndex), token => token.type === 'heading_close') + startIndex + 2;
  const res = tokens.slice(startIndex, endParagraphIndex);
  const nextParagraph = findIndex(tokens.slice(endParagraphIndex + 1), token => token.type === 'heading_open') + endParagraphIndex + 2;
  const contentTokens = tokens.slice(endParagraphIndex, nextParagraph).filter(t => t.type === 'inline');
  const inlined = res.find(token => token.type === 'inline');
  return {
    title: inlined ? inlined.content : 'Unknown',
    links: contentTokens.map(createLink),
  };
};

export const parseLocalSection = (tokens: Token[], localLink: string): Section => {
  const sectionStateIndex = tokens.findIndex(token => normalizeTitle(token.content) === localLink);
  if (sectionStateIndex === -1) {
    throw  new Error(`Can't find section header for ${localLink}`);
  }
  const previousToken = sectionStateIndex - 1;
  if (tokens[previousToken].type !== 'heading_open') {
    throw new Error(`Token at ${previousToken} should be start of heading, but what ${tokens[previousToken].type}`)
  }
  return parseSection(tokens, previousToken);
};

export const parseHeader = (tokens: Token[]): Section => {
  const startIndex = findIndex(tokens, token => token.type === 'heading_open');
  return parseSection(tokens as any, startIndex);
};
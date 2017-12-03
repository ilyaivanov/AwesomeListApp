import {findIndex} from 'lodash';
import {Link, Section, Token} from '../types';

const mapTitle = (token: Token) => {
  const textToken = token.children.find(x => x.type === 'text');
  if (!textToken) {
    throw new Error('Could not find text token in ' + JSON.stringify(token));
  }
  return textToken.content;
};

const extracted = (token: Token) => {
  const linkToken = token.children.find(x => x.type === 'link_open');
  if (!linkToken) {
    throw new Error('Could not find link_open token in ' + JSON.stringify(token));
  }
  return linkToken.attrs[0][1];
};

const createLink = (token: Token): Link => ({title: mapTitle(token), subtitle: '', link: extracted(token)});

const parseSection = (tokens: Token[], startIndex: number): Section => {
  const endParagraphIndex = findIndex(tokens.slice(startIndex + 1), token => token.type === 'heading_close') + startIndex + 2;
  const res = tokens.slice(startIndex, endParagraphIndex);
  const nextParagraph = findIndex(tokens.slice(endParagraphIndex + 1), token => token.type === 'heading_open') + endParagraphIndex + 2;
  const contentTokens = tokens.slice(endParagraphIndex, nextParagraph).filter(t => t.type === 'inline');
  const inlined = res.find(token => token.type === 'inline');
  return {
    title: inlined ? inlined.content : 'Unknown',
    links: contentTokens.map(createLink),
  };
};
export const parseHeader = (tokens: Token[]): Section => {
  const startIndex = findIndex(tokens, token => token.type === 'heading_open');
  return parseSection(tokens as any, startIndex);
};
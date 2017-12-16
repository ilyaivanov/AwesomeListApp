import * as md from 'markdown-it';
import {Token} from '../data/types';
export const mark = md({
  html: true,
  linkify: true,
  typographer: true
});

export default (md: string): Token[] => mark.parse(md, null);
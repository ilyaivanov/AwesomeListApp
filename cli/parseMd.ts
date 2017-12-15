import * as md from 'markdown-it';

export const mark = md({
  html: true,
  linkify: true,
  typographer: true
});

export default (md: string) => mark.parse(md, null);
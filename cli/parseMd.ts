import root from '../data/md/awesome';
import * as md from 'markdown-it';
import * as fs from 'fs'

const mark = md({
  html: true,
  linkify: true,
  typographer: true
});
const path = 'data/parsed/awesome.ts';

const tokens = mark.parse(root, null);

console.log(`Parsed ${tokens.length} tokens`);

const formattedTokens = `export default ${JSON.stringify(tokens, null, 2)};`;

fs.writeFileSync(path, formattedTokens);

console.log(`Done writing to ${path}`);
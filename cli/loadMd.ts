import fetch from 'node-fetch'
import * as fs from 'fs'
import {parse} from "./parseMd";
import {parseHeader, parseLocalSection} from "./parseTokens";
import {Repository, Token} from "../types";
import tokens from '../data/parsed/awesome';

const USE_REAL_API = false;
const url = 'https://api.github.com/repos/sindresorhus/awesome/readme';

const tokensPath = 'data/parsed/awesome.ts';

const decode = (response: string, encoding: string) => new Buffer(response, encoding).toString('utf8');

export const stringify = (obj: any) => JSON.stringify(obj, null, 2);

export const createRepository = (tokens: Token[]): Repository => {
  const home = parseHeader(tokens);
  return {
    home,
    sections: home.links.map(link => parseLocalSection(tokens, link.link))
  };
};

const updateTokens = (): Promise<Token[]> =>
  fetch(url)
    .then(res => res.json())
    .then(response => decode(response.content, response.encoding))
    .then(function (md) {
      console.log(`Downloaded md from ${url}. Length: ${md.length} chars.`);
      console.log(`Sample: ${md.slice(0, 50)}...`);

      const tokens = parse(md);

      console.log(`Parsed ${tokens.length} tokens`);

      const formattedTokens = `export default ${stringify(tokens)};`;

      fs.writeFileSync(tokensPath, formattedTokens);

      console.log(`Done writing to ${tokensPath}`);
      return tokens;
    });

const sampleTokens = (): Promise<Token[]> => Promise.resolve(tokens as any);

export const getTokens = (): Promise<Token[]> => USE_REAL_API ? updateTokens() : sampleTokens();

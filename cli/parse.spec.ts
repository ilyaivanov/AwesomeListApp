import {parseIntoSections} from './parse';
import {Section} from '../data/types';
import parseMd from './parseMd';
import {findRoot, root} from './util';

const rootMd = `
## Contents

- [Platforms](#platforms)
- [Programming Languages](#programming-languages)

## Platforms

- [Node.js](https://github.com/sindresorhus/awesome-nodejs) - JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Frontend Development](https://github.com/dypsilon/frontend-dev-bookmarks)
- [iOS](https://github.com/vsouza/awesome-ios) - Mobile operating system for Apple phones and tablets.
- [Android](https://github.com/JStumpp/awesome-android)

## Programming Languages

- [Node.js](https://github.com/sindresorhus/awesome-nodejs) - JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Frontend Development](https://github.com/dypsilon/frontend-dev-bookmarks)
- [iOS](https://github.com/vsouza/awesome-ios) - Mobile operating system for Apple phones and tablets.
- [Android](https://github.com/JStumpp/awesome-android)
`;

describe('A header and two subsequent sections', () => {
  let sections: Section[];
  beforeEach(() => {
    sections = parseIntoSections(root.url, parseMd(rootMd));
  });

  it('should result in a list of sections of three sections', function () {
    expect(sections).toHaveLength(3)
  });

  it('platforms sections should have id ', function () {
    expect(sections[0].links[0].link).toBe('sindresorhus_awesome#platforms');
  });

  it('platforms sections should have id ', function () {
    expect(sections[1].id).toBe('sindresorhus_awesome#platforms');
  });

  it('should have two links at the root', function () {
    expect(findRoot(sections).links).toHaveLength(2);
  });
});
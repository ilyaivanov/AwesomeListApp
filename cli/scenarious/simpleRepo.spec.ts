import {Section} from '../../data/types';
import {root} from '../util';
import {parseFromMd} from '../parse';

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

describe('Parsing a sample from Awesome List', () => {
  let sections: Section[];
  beforeEach(() => {
    sections = parseFromMd(rootMd, root.id);
  });

  it('should be matched to a snapshot', function () {
    expect(sections).toMatchSnapshot();
  });

  it('should result in three sections', function () {
    expect(sections).toHaveLength(3)
  });

  describe('Root section', () => {
    let rootSection: Section;
    beforeEach(() => {
      rootSection = sections[0];
    });

    it('should have correct id', function () {
      expect(rootSection.id).toBe(root.id);
    });

    it('should have two link', function () {
      expect(rootSection.links).toHaveLength(2);
    });

  });

  describe('Platforms section', () => {
    let platforms: Section;
    beforeEach(() => {
      platforms = sections[1];
    });

    it('should have the same id as platforms link', function () {
      expect(platforms.id).toBe('sindresorhus_awesome#platforms');
    });

    it('should have four links', function () {
      expect(platforms.links).toHaveLength(4);
    });

    it('should have a link to a node.js repo', function () {
      expect(platforms.links[0].link).toBe('sindresorhus_awesome-nodejs');
    });
  });
});
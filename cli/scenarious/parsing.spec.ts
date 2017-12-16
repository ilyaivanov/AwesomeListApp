import nodejs from './sindresorhus_awesome-nodejs';
import md from './sindresorhus_awesome';
import {parseIntoSections} from '../parse';
import parseMd from '../parseMd';
import {Section} from '../../data/types';
import {findRoot, root} from '../util';

const parse = (md: string) => parseIntoSections(root.url, parseMd(md));

it('should parse Node.js repository', function () {
  const sections = parse(nodejs);
  const root = findRoot(sections);
  expect(root.links).toHaveLength(62);
});

describe('Parsing root', () => {
  let section: Section;

  beforeEach(() => {
    section = findRoot(parse(md));
  });

  it('should have correct link titles', function () {
    const expectedSectionNames = ['Platforms', 'Programming Languages', 'Front-End Development', 'Back-End Development', 'Computer Science', 'Big Data', 'Theory', 'Books', 'Editors', 'Gaming', 'Development Environment', 'Entertainment', 'Databases', 'Media', 'Learn', 'Security', 'Content Management Systems', 'Hardware', 'Business', 'Work', 'Networking', 'Decentralized Systems', 'Miscellaneous',];
    expect(section.links.map(x => x.title)).toEqual(expectedSectionNames);
  });

  describe('Big Data', () => {
    let bigDataSection: Section;

    beforeEach(() => {
      bigDataSection = parse(md).find(x => x.title === 'Big Data') as Section;
    });

    it('should ', function () {
      expect(bigDataSection.title).toBe('Big Data');
      const expectedTitles = ['Big Data', 'Public Datasets', 'Hadoop', 'Data Engineering', 'Streaming', 'Apache Spark']
      expect(bigDataSection.links.map(l => l.title)).toEqual(expectedTitles);
    });
  });
});

import nodejs from './sindresorhus_awesome-nodejs';
import root from './sindresorhus_awesome';
import {createRepository} from '../parse';
import parseMd from '../parseMd';
import {Section} from '../../types';

const parse = (md: any) => createRepository(parseMd(md));

xit('should parse Node.js repository', function () {
  const rep = parse(nodejs);
});

describe('Parsing root', () => {
  let section: Section;

  beforeEach(() => {
    section = parse(root).home;
  });

  it('should have correct link titles', function () {
    const expectedSectionNames = ['Platforms', 'Programming Languages', 'Front-End Development', 'Back-End Development', 'Computer Science', 'Big Data', 'Theory', 'Books', 'Editors', 'Gaming', 'Development Environment', 'Entertainment', 'Databases', 'Media', 'Learn', 'Security', 'Content Management Systems', 'Hardware', 'Business', 'Work', 'Networking', 'Decentralized Systems', 'Miscellaneous',];
    expect(section.links.map(x => x.title)).toEqual(expectedSectionNames);
  });

  it('should have correct links', function () {
    const expectedLinks = ['#platforms', '#programming-languages', '#front-end-development', '#back-end-development', '#computer-science', '#big-data', '#theory', '#books', '#editors', '#gaming', '#development-environment', '#entertainment', '#databases', '#media', '#learn', '#security', '#content-management-systems', '#hardware', '#business', '#work', '#networking', '#decentralized-systems', '#miscellaneous'];
    expect(section.links.map(x => x.link)).toEqual(expectedLinks);
  });

  describe('Big Data', () => {
    let bigDataSection: Section;

    beforeEach(() => {
      bigDataSection = parse(root).sections.find(x => x.title === 'Big Data') as Section;
    });

    it('should ', function () {
      expect(bigDataSection.title).toBe('Big Data');
      const expectedTitles = ['Big Data', 'Public Datasets', 'Hadoop', 'Data Engineering', 'Streaming', 'Apache Spark']
      expect(bigDataSection.links.map(l => l.title)).toEqual(expectedTitles);
    });
  });
});

import tokens from '../data/parsed/awesome';
import {Section} from '../types';
import {parseHeader} from "./parseTokens";

describe('Parsing a header from an awesome root', () => {
  let section: Section;
  beforeEach(() => {
    section = parseHeader(tokens as any);
  });

  it('should have title as Contents', function () {
    expect(section.title).toBe('Contents');
  });

  it('should have 22 links', function () {
    expect(section.links).toHaveLength(23);
  });

  it('should have correct link titles', function () {
    const expectedSectionNames = ['Platforms', 'Programming Languages', 'Front-End Development', 'Back-End Development', 'Computer Science', 'Big Data', 'Theory', 'Books', 'Editors', 'Gaming', 'Development Environment', 'Entertainment', 'Databases', 'Media', 'Learn', 'Security', 'Content Management Systems', 'Hardware', 'Business', 'Work', 'Networking', 'Decentralized Systems', 'Miscellaneous',];
    expect(section.links.map(x => x.title)).toEqual(expectedSectionNames);
  });

  it('should have correct links', function () {
    const expectedLinks = ['#platforms', '#programming-languages', '#front-end-development', '#back-end-development', '#computer-science', '#big-data', '#theory', '#books', '#editors', '#gaming', '#development-environment', '#entertainment', '#databases', '#media', '#learn', '#security', '#content-management-systems', '#hardware', '#business', '#work', '#networking', '#decentralized-systems', '#miscellaneous'];
    expect(section.links.map(x => x.link)).toEqual(expectedLinks);
  });
});

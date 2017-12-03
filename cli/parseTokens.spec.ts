import tokens from '../data/parsed/awesome';
import {Section} from '../types';
import {normalizeTitle, parseHeader, parseLocalSection} from "./parseTokens";

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

describe('Parsing a second-level section linking a big data section', () => {
  let bigDataSection: Section;
  beforeEach(() => {
    bigDataSection = parseLocalSection(tokens as any, '#big-data');
  });

  it('should have title Big Data', function () {
    expect(bigDataSection.title).toBe('Big Data');
  });

  it('should have six links', function () {
    expect(bigDataSection.links).toHaveLength(6);
  });

  it('should have exact title names', function () {
    const expectedTitles = ['Big Data', 'Public Datasets', 'Hadoop', 'Data Engineering', 'Streaming', 'Apache Spark']
    expect(bigDataSection.links.map(l => l.title)).toEqual(expectedTitles);
  });

  it('should have correct external link', () => {
    expect(bigDataSection.links[0].link).toBe('https://github.com/onurakpolat/awesome-bigdata');
  });
});

describe('Parsing Work section, which has nested links', () => {
  let workSection: Section;
  beforeEach(() => {
    workSection = parseLocalSection(tokens as any, '#work');
  });

  it('should flatten all links', function () {
    expect(workSection.links).toHaveLength(6);
  });

  it('should have Communities as second link', () => {
    expect(workSection.links[1].title).toBe('Communities');
  });
});

it('normalizing a "Big Data" should return "#big-data"', () => {
  expect(normalizeTitle('Big Data')).toBe('#big-data');
});

it('normalizing a "Big Data" should return "#big-data"', () => {
  expect(normalizeTitle('Content Management Systems')).toBe('#content-management-systems');
});
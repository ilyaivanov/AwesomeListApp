import root from './samples/rootSample';
import * as md from 'markdown-it';

interface Section {
  name: string
}

const mark = md({
  html: true,
  linkify: true,
  typographer: true
});

const parse = (markup: string): Section[] => ([]);

it('parsing a header from awesome root should return 22 sections', function () {
  const res = mark.parse(root, null);

  expect(parse(root)).toHaveLength(22);
});
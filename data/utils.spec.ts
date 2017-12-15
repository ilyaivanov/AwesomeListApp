import {normalizeTitle} from './utils';

it('normalizing a "Big Data" should return "#big-data"', () => {
  expect(normalizeTitle('Big Data')).toBe('#big-data');
});

it('normalizing a "Big Data" should return "#big-data"', () => {
  expect(normalizeTitle('Content Management Systems')).toBe('#content-management-systems');
});
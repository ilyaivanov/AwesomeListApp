import {normalizeLocalLink} from './utils';

it('normalizing a "Big Data" should return "#big-data"', () => {
  expect(normalizeLocalLink('Big Data')).toBe('#big-data');
});

it('normalizing a "Big Data" should return "#big-data"', () => {
  expect(normalizeLocalLink('Content Management Systems')).toBe('#content-management-systems');
});

it('should ', function () {
  expect(normalizeLocalLink('Debugging / Profiling')).toBe('#debugging--profiling');
}); 
import {Repository} from '../types';
import {createRepository} from './parse';
import tokens from '../data/parsed/awesome';

describe('Parsing a all 2nd level links in awesome repository', () => {
  let repository: Repository;

  beforeEach(() => {
    repository = createRepository(tokens as any);
  });

  it('should return on 23 sections', function () {
    expect(repository.sections).toHaveLength(23);
  });
});
import {Repository, Section} from '../../types';
import {normalizeTitle, validateNonEmpty} from '../utils';

export const navigate = (repository: Repository, link?: string): Section => {
  if (!link) {
    return repository.home;
  }
  const section = repository.sections.find(section => normalizeTitle(section.title) === link);
  const validated = validateNonEmpty(section, `Couldn't not found section for link ` + link);
  return validated;
}
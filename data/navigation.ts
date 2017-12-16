import {Repository, Section} from '../types';
import {normalizeTitle, validateNonEmpty} from './utils';
// import repository from './models/sindresorhus_awesome';
import repository from './models/sindresorhus_awesome-nodejs';

export const navigate = (currentRepository: Repository, link?: string): Section => {
  if (!link) {
    return currentRepository.home;
  }
  // check if link is local
  const section = currentRepository.sections.find(section => normalizeTitle(section.title) === link);
  return validateNonEmpty(section, `Couldn't not found section for link ` + link);
}
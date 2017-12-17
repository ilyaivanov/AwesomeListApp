import sections from '../../data/sampleSections';
// import sections from '../../data/sections';
import {Section} from '../../data/types';
import {findRoot} from '../../cli/util';

export const findSection = (link: string): Section => {
  if (!link)
    return findRoot(sections);
  const sectionFound = sections.find(s => s.id === link);
  if (!sectionFound)
    throw new Error(`Can't find section with id == ${link}`);
  return sectionFound;
};
import sections, {Section} from '../../data/sampleSections';

export const sectionExist = (link?: string): boolean =>
  sections.findIndex(s => s.id === link) >= 0;

export const navigate = (link?: string): Section => {
  link = link || 'root';
  const sectionFound = sections.find(s => s.id === link);
  if (!sectionFound)
    throw new Error(`Can't find section with id == ${link}`);
  return sectionFound;
};
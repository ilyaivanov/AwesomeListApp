import {Section} from '../data/types';
import {findIndex, max, min} from 'lodash';

export default (sections: Section[]): Section[] => {
  //assemble header section if missing
  return handleIntermediateSections(sections);
};


const handleIntermediateSections = (sections: Section[]) => {
  const root = sections[0];
  const minLevel = min(root.links.map(l => l.level));
  const maxLevel = max(root.links.map(l => l.level));
  if (minLevel != maxLevel) {
    const firstLevel = root.links.filter(l => l.level === minLevel);

    const emptySections = firstLevel.map(link => sections.find(s => s.id === link.link));
    for (let i = 0; i < emptySections.length; i++) {
      const s = emptySections[i];
      if (!s) {
        continue;
      }
      if (s.links.length > 0) {
        console.warn(`Section ${s.id} is not empty, ignoring`)
      } else {
        const startIndex = root.links.findIndex(l => l.link === s.id) + 1;
        const endIndex = findIndex(root.links, l => l.level === minLevel, startIndex);
        const endIndexToApply = endIndex === -1 ? undefined : endIndex;
        s.links = root.links.slice(startIndex, endIndexToApply).map((l: any) => ({...l, level: l.level - 1}));
      }
    }
  }

  root.links = root.links.filter(l => l.level === minLevel);

  return sections;
};
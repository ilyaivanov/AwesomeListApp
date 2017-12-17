import {Section} from '../data/types';
import * as _ from 'lodash';

export default (sections: Section[], repoId: string): Section[] => {
  //assemble header section if missing
  //first section considered root of the repository, move to postprocessing
  if (isContents(sections[0]))
    sections[0].id = repoId;
  else {
    const contents: Section = {
      id: repoId,
      title: 'Contents',
      links: sections.map(s => ({link: s.id, title: s.title}))
    };
    sections = [contents].concat(sections);
  }

  return handleIntermediateSections(sections);
};


const handleIntermediateSections = (sections: Section[]) => {
  const root = sections[0];
  const minLevel = _.min(root.links.map(l => l.level));
  const maxLevel = _.max(root.links.map(l => l.level));
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
        const endIndex = _.findIndex(root.links, l => l.level === minLevel, startIndex);
        const endIndexToApply = endIndex === -1 ? undefined : endIndex;
        s.links = root.links.slice(startIndex, endIndexToApply).map((l: any) => ({...l, level: l.level - 1}));
      }
    }
  }

  root.links = root.links.filter(l => l.level === minLevel);

  return sections;
};

function all<T>(array: T[], predicate: (item: T, index: number) => boolean) {
  return array.length === array.filter(predicate).length;
}


const isContents = (section: Section) => all(section.links, link => link.link.indexOf('#') >= 0);

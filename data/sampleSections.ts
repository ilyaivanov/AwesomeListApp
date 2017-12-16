import {Section} from './types';
import {root} from '../cli/util';

const sections: Section[] = [
  {
    title: 'Awesome List',
    id: root.id,
    links: [
      {title: 'Platforms', link: root.id+'#platforms'},
      {title: 'Languages', link: root.id+'#languages', subtitle:'fancy languages'},
    ]
  },
  {
    title: 'Platforms',
    id: root.id+'#platforms',
    links: [
      {title: 'Node,js', link: 'another_repo#nodejs'},
    ]
  },
  {
    title: 'Languages',
    id: root.id+'#languages',
    links: [
      {title: 'JavaScript', link: ''},
    ]
  },
  {
    title: 'Node,js',
    id: 'another_repo#nodejs',
    links: [
      {title: 'Node.js topic1', link: ''},
      {title: 'Node.js topic2', link: ''},
    ]
  },
];

export default sections;

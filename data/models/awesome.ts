import {Section} from "../../types";

const section: Section = {
  title: 'Awesome List',
  links: [
    'Platforms',
    'Programming Languages',
    'Front-End Development',
    'Back-End Development',
    'Computer Science',
    'Big Data',
    'Theory',
    'Books',
    'Editors',
    'Gaming',
    'Development Environment',
    'Entertainment',
    'Databases',
    'Media',
    'Learn',
    'Security',
    'Content Management Systems',
    'Hardware',
    'Business',
    'Work',
    'Networking',
    'Decentralized Systems',
    'Miscellaneous',
  ].map(title => ({title, subtitle: '', link: ''}))
};

export default section;
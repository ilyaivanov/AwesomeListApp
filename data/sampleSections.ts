const sections: Section[] = [
  {
    title: 'Awesome List (dummy)',
    id: 'root',
    links: [
      {title: 'Platforms', link: '#platforms'},
      {title: 'Languages', link: '#languages', subtitle:'fancy languages'},
      {title: 'Functional Languages', link: '#functional', subtitle:'subsection', level: 1},
      {title: 'Declarative Languages', link: '#declarative', subtitle:'subsection', level: 1},
      {title: 'Theory', link: '#theory'},
      {title: 'Broken link', link: '#non-exising section'},
    ]
  },
  {
    title: 'Platforms',
    id: '#platforms',
    links: [
      {title: 'Node,js', link: '#nodejs'},
      {title: 'Frontend Development', link: ''},
      {title: 'iOS', link: ''},
    ]
  },
  {
    title: 'Languages',
    id: '#languages',
    links: [
      {title: 'JavaScript', link: ''},
      {title: 'TypeScript', link: ''},
      {title: 'F#', link: ''},
      {title: 'C#', link: ''},
    ]
  },
  {
    title: 'Theory',
    id: '#theory',
    links: [
      {title: 'Talks', link: ''},
      {title: 'Math', link: ''},
    ]
  },
  {
    title: 'Node,js',
    id: '#nodejs',
    links: [
      {title: 'Node.js topic1', link: ''},
      {title: 'Node.js topic2', link: ''},
    ]
  },
];

export default sections;

export type Section = {
  title: string;
  id: string;
  links: Link[];
}

export type Link = {
  title: string;
  link: string;
  subtitle?: string,
  level?:number;
}
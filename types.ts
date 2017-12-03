export {Token} from 'markdown-it';

export interface Section {
  title: string;
  links: Link[];
}

export interface Link {
  title: string;
  subtitle: string,
  link: string,
  level:number;
}

export interface Repository {
  home: Section,
  sections: Section[],
}
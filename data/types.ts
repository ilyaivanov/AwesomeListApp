
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

export {Token} from 'markdown-it';
import rep from '../data/models/sindresorhus_awesome';
import {flatten} from 'lodash';
import {load} from './load';


export default () => {
  const allLinks = flatten(rep.sections.map(s => s.links.map(l => l.link)));
  load(allLinks[0]);
}

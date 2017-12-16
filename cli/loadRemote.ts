import rep from '../data/models/sindresorhus_awesome';
import {load} from './load';
import {allLinks} from './util';


export default () => {
  load(allLinks(rep)[0] as string);
}

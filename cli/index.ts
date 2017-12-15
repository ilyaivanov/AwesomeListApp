import {load} from './load';
import {parseRoot} from './parse';
import loadRemote from './loadRemote';
import {root} from './util';

const command = process.argv[2];

if (command === 'load') {
  load(root.url);
} else if (command === 'parse') {
  parseRoot(root.url);
} else if (command === 'update') {
  load(root.url).then(() => parseRoot(root.url));
} else if (command === 'remote') {
  loadRemote();
} else {
  console.log(`Unrecognized parameter: ${command}`)
}

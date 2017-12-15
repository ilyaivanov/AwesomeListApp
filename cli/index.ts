import {load} from './load';
import {parse} from './parse';
import loadRemote from './loadRemote';
import {root} from './const';

const command = process.argv[2];

if (command === 'load') {
  load(root.url);
} else if (command === 'parse') {
  parse(root.url);
} else if (command === 'update') {
  load(root.url).then(() => parse(root.url));
} else if (command === 'remote') {
  loadRemote();
} else {
  console.log(`Unrecognized parameter: ${command}`)
}

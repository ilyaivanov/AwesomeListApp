import {load} from './load';
import {parseRoot} from './parse';
import {root} from './util';

const command = process.argv[2];

if (command === 'load') {
  load();
} else if (command === 'parse') {
  parseRoot(root.url);
} else if (command === 'update') {
  load().then(() => parseRoot(root.url));
}  else {
  console.log(`Unrecognized parameter: ${command}`)
}

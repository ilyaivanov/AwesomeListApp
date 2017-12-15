import {load} from './load';
import {parse} from './parse';

const command = process.argv[2];

if (command === 'load') {
  load();
} else if (command === 'parse') {
  parse();
} else if (command === 'update') {
  load().then(parse);
} else {
  console.log(`Unrecognized parameter: ${command}`)
}

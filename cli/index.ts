import {load} from './load';
import {parseAll} from './parse';

const command = process.argv[2];

if (command === 'load') {
  load();
} else if (command === 'parse') {
  parseAll();
} else {
  console.log(`Unrecognized parameter: ${command}`)
}

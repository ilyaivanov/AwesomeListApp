import {Repository} from '../types';
import {createRepository} from './parse';
import parseMd from './parseMd';

const sampleMd = `
## Contents

- [Platforms](#platforms)
- [Programming Languages](#programming-languages)

## Platforms

- [Node.js](https://github.com/sindresorhus/awesome-nodejs) - JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Android](https://github.com/JStumpp/awesome-android)

## Programming Languages

- [JavaScript](https://github.com/sorrycc/awesome-javascript)
	- [Promises](https://github.com/wbinnssmith/awesome-promises)
	- [Standard Style](https://github.com/standard/awesome-standard) - Style guide and linter.
	- [Must Watch Talks](https://github.com/bolshchikov/js-must-watch)
- [Swift](https://github.com/matteocrippa/awesome-swift)
`;
describe('Parsing a all 2nd level links in awesome repository', () => {
  let repository: Repository;

  beforeEach(() => {
    const tokens = parseMd(sampleMd);
    console.log(tokens.length);
    repository = createRepository(tokens as any);
  });

  it('should return on 23 sections', function () {
    expect(repository.sections).toHaveLength(2);
  });
});
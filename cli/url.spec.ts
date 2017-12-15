
import {toMd} from './url'

describe('Coverting a github repo to md file', () => {
  it('should return correct link', function () {
    expect(toMd('https://github.com/sindresorhus/awesome-nodejs'))
      .toBe('https://api.github.com/repos/sindresorhus/awesome-nodejs/readme');
  });
});
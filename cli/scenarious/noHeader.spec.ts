import {parseFromMd} from '../parse';
import {Section} from '../../data/types';

const md = `
### Header1

- [webtorrent](https://github.com/feross/webtorrent) - Streaming torrent client for Node.js and the browser.

### Header2

- [peerflix](https://github.com/mafintosh/peerflix) - Streaming torrent client.
`;

describe('Having a repository with no contents (first section has external links)', () => {
  it('new contents section should be assembler from the top-level headers', function () {
    const sections = parseFromMd(md, 'nodejsRepo');
    const header = sections.find(s => s.id === 'nodejsRepo') as Section;
    expect(header.links).toHaveLength(2);
  });
});
import {parseFromMd} from '../parse';
import {Section} from '../../data/types';

const md = `
## Contents

- [Packages](#packages)
	- [Mad science](#mad-science)
	- [Command-line apps](#command-line-apps)
	- [Functional programming](#functional-programming)
	- [HTTP](#http)
	- [Debugging / Profiling](#debugging--profiling)
	- [Weird](#weird)
	- [Miscellaneous](#miscellaneous)
- [Resources](#resources)
	- [Tutorials](#tutorials)
	- [Discovery](#discovery)

## Packages

### Mad science

- [webtorrent](https://github.com/feross/webtorrent) - Streaming torrent client for Node.js and the browser.
- [peerflix](https://github.com/mafintosh/peerflix) - Streaming torrent client.
- [dat](http://dat-data.com) - Real-time replication and versioning for data sets.

## Resources

### Mad science

- [webtorrent](https://github.com/feross/webtorrent) - Streaming torrent client for Node.js and the browser.
- [peerflix](https://github.com/mafintosh/peerflix) - Streaming torrent client.
- [dat](http://dat-data.com) - Real-time replication and versioning for data sets.
`;

describe('When handling a section with no link', () => {
  it('new intermediate section should be created', function () {
    const sections = parseFromMd(md, 'nodejsRepo');
    const header = sections.find(s => s.id === 'nodejsRepo') as Section;
    expect(header.links).toHaveLength(2);
  });

  it('should exist separate packages section', function () {
    const packages = parseFromMd(md, 'nodejsRepo').find(s => s.id == 'nodejsRepo#packages') as Section;
    expect(packages.links.map(l => l.link)).toHaveLength(7);
  });

  it('should exist separate resources section', function () {
    const packages = parseFromMd(md, 'nodejsRepo').find(s => s.id == 'nodejsRepo#resources') as Section;
    expect(packages.links).toHaveLength(2);
  });
});
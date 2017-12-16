import {findSection} from './navigation';
import {Link} from '../../data/types';

describe('Finding a section without a link', () => {
  it('should return a root section', function () {
    expect(findSection().title).toBe('Awesome List');
  });
  it('should return a root section', function () {
    expect(findSection('').title).toBe('Awesome List');
  });
});

it('Finding a section for platforms should return that section', function () {
  const root = findSection();
  const platformsLink = root.links.find(l => l.title == 'Platforms') as Link;
  const platformsSection = findSection(platformsLink.link, root.id);
  expect(platformsSection.title).toBe('Platforms');
  expect(platformsSection.links).toHaveLength(28)
});

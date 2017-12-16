import {navigate} from './navigation';
import {Link} from '../../data/sampleSections';

describe('Finding a section without a link', () => {
  it('should return a root section', function () {
    expect(navigate().title).toBe('Awesome List (dummy)');
  });
  it('should return a root section', function () {
    expect(navigate('').title).toBe('Awesome List (dummy)');
  });
});

it('Finding a section for platforms should return that section', function () {
  const root = navigate();
  const platforms = root.links.find(l => l.title == 'Platforms') as Link;
  expect(navigate(platforms.link).title).toBe('Platforms');
});
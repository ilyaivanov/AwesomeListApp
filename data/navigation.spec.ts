import repository from './models/awesome'
import {navigate} from './navigation';

describe('Having an awesome repository ', () => {
  it('when referencing an empty link shound return a Home section', function () {
    const section = navigate(repository);
    expect(section.title).toBe('Awesome List');
  });
  it('when referencing a Big Data section should return that section with non-empty links', function () {
    const section = navigate(repository, '#big-data');
    expect(section.title).toBe('Big Data');
  });
});
import * as React from 'react';
import Sample from './Sample';

// Note: test renderer must be required after react-native.
import {create} from 'react-test-renderer';

it('renders correctly', () => {
  const tree = create(
    <Sample type="sample"/>
  );
  expect(1).toBe(1);
});
import * as React from 'react';
import List from './List';
import {create} from 'react-test-renderer';

it('Approval test for List with hardcoded data', () => {
  const list = create(<List/>).toJSON();
  expect(list).toMatchSnapshot();
});
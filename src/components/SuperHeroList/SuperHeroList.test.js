import React from 'react';
import renderer from 'react-test-renderer';
import {Button, Input} from './SuperHeroList';

it('renders ok', () => {
  const tree = renderer.create(<Button colorScheme="blue" />).toJSON();
  expect(tree).toMatchSnapshot();
});
it('renders ok', () => {
  const tree = renderer.create(<Input placeholder="Type superhero" />).toJSON();
  expect(tree).toMatchSnapshot();
});

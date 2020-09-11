import React from 'react';
import { render } from 'testing-utils';
import AppContainer from '..';

describe('AppContainer Component', () => {
   test('should render correctly', () => {
     const { asFragment } = render();

      expect(asFragment()).toMatchSnapshot();
   });
});

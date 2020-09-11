import React from 'react';
import { render } from 'testing-utils';
import AppContainer from '..';

/**
 * scrollIntoView is not a function fix.
 * @see https://stackoverflow.com/a/60225417/12873927
 */
window.HTMLElement.prototype.scrollIntoView = jest.fn()

describe('AppContainer Component', () => {
   test('should render correctly', () => {
     const { asFragment } = render(<AppContainer />);

      expect(asFragment()).toMatchSnapshot();
   });
});

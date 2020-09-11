import React from 'react';
import { render, cleanup } from 'testing-utils';
import { useSelector } from 'react-redux';
import Navigation from '..';

jest.mock('react-redux', () => ({
   ...jest.requireActual<any>('react-redux'),
   useSelector: jest.fn(),
}));

describe('Navigation Component', () => {
   afterEach(() => cleanup());

   test('should display logout button if on page index', () => {
      (useSelector as jest.Mock).mockImplementationOnce(() => 'index');
      const { getByTestId } = render(<Navigation />);

      expect(getByTestId('navigation-button-logout')).toBeVisible();
   });

   test('should display back button if not on page index', () => {
      (useSelector as jest.Mock).mockImplementationOnce(() => 'conversation');
      const { getByTestId } = render(<Navigation />);

      expect(getByTestId('navigation-button-back')).toBeVisible();
   });

   test('should render correctly', () => {
      const { asFragment } = render(<Navigation />);

      expect(asFragment()).toMatchSnapshot();
   });
});

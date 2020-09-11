import React from 'react';
import { render } from 'testing-utils';
import AvatarWithLabel from '..';

describe('AvatarWithLabel component', () => {
   test('should render label if provided in props', () => {
      const testText = 'test label text';
      const {getByText} = render(<AvatarWithLabel title={testText} />);

      expect(getByText(testText)).toBeVisible();
   });
   test('should render label even if no label text provided', () => {
      const {getByTestId} = render(<AvatarWithLabel />);

      expect(getByTestId('avatar-inner-container')).toBeVisible();
   });
   
   test('should render correctly', () => {
      const { asFragment } = render(<AvatarWithLabel />);

      expect(asFragment()).toMatchSnapshot();
   });
});

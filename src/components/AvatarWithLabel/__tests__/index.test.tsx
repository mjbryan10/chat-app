import React from 'react';
import { render } from 'testing-utils';
import AvatarWithLabel from '..';

describe('Avatar component', () => {
   test('should render label if provided in props', () => {
      const testText = 'test label text';
      const utils = render(<AvatarWithLabel text={testText} />);

      const label = utils.getByText(testText);

      expect(label).toBeTruthy();
   });
   test('should render label even if no label text provided', () => {
      const utils = render(<AvatarWithLabel />);

      const innerContainer = utils.getByTestId('avatar-inner-container');

      expect(innerContainer).toBeTruthy();
   });
});

import React from 'react';
import { render, cleanup, fireEvent } from 'testing-utils';
import AvatarWithLabelAndDelete from '..';

describe('AvatarWithLabelAndDelete component', () => {
   beforeEach(cleanup);
   test('should render only first word as label if provided in props', () => {
      const testText = 'test label text';
      const utils = render(<AvatarWithLabelAndDelete userId={1} title={testText} />);

      const label = utils.getByText('test') || false;

      expect(label).toBeTruthy();
   });
   test('should render label even if no label text provided', () => {
      const utils = render(<AvatarWithLabelAndDelete userId={1} />);

      const innerContainer = utils.getByTestId('avatar-inner-container');

      expect(innerContainer).toBeTruthy();
   });
   test('should fire clickHandler', () => {
      const clickHandler = jest.fn();
      const utils = render(<AvatarWithLabelAndDelete userId={1} handleClick={clickHandler} />);

      const innerContainer = utils.getByTestId('avatar-inner-container');

      fireEvent.click(innerContainer)

      expect(clickHandler).toHaveBeenCalledTimes(1);
   });
});

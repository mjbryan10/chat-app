import React from 'react';
import { render, cleanup, fireEvent } from 'testing-utils';
import AvatarWithLabelAndDelete from '..';
import { RenderResult } from '@testing-library/react';

describe('AvatarWithLabelAndDelete component', () => {
   let utils: RenderResult;
   const clickHandler = jest.fn();
   const testText = 'test label text';
   beforeEach(() => {
      utils = render(
         <AvatarWithLabelAndDelete
            userId={1}
            title={testText}
            handleClick={clickHandler}
         />
      );
   });
   afterEach(() => cleanup());

   test('should render only first word as label if provided in props', () => {
      const {getByText} = utils;

      expect(getByText(/test/)).toBeVisible();
      expect(getByText(/test/)).toHaveTextContent('test');
   });

   test('should fire clickHandler on click', () => {
      const {getByTestId} = utils;

      const innerContainer = getByTestId('avatar-inner-container');

      fireEvent.click(innerContainer);

      expect(clickHandler).toHaveBeenCalledTimes(1);
   });

   test('should render correctly', () => {
      const { asFragment } = render(<AvatarWithLabelAndDelete userId={1} />);

      expect(asFragment()).toMatchSnapshot();
   });
});

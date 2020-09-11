import React from 'react';
import { render, RenderResult } from 'testing-utils';
import MessageCreator from '..';
import { fireEvent, act, cleanup } from '@testing-library/react';

describe('MessageCreator component', () => {
   const testText = 'This is a test message.';
   let utils: RenderResult;
   beforeEach(() => {
      utils = render(<MessageCreator />);
   });

   test('should be disabled, if disabled === true ', () => {
      cleanup();
      const __handleSubmit = jest.fn();
      utils = render(<MessageCreator disabled={true} handleSubmit={__handleSubmit} />);
      const { getByTestId, getByText } = utils;
      const textbox = getByTestId('message-creator-textbox');
      const sendButton = getByText(/send/i).closest('input');

      act(() => {
         fireEvent.change(textbox, { target: { value: testText } });
         if (sendButton) fireEvent.click(sendButton);
      });

      expect(__handleSubmit).toBeCalledTimes(0);
      expect(textbox).toHaveDisplayValue('');
      expect(textbox).toBeDisabled();
      expect(sendButton).toBeDisabled();
   });

   test('should display a button with the text `Send`', () => {
      const { getByText } = utils;

      expect(getByText(/Send/i)).toBeVisible();
   });

   test('should change value of textbox when typed', () => {
      const { getByTestId } = utils;
      const textbox = getByTestId('message-creator-textbox');

      fireEvent.change(textbox, { target: { value: testText } });

      expect(textbox).toBeVisible();
      expect(textbox).toHaveDisplayValue(testText);
   });

   test('should submit to handler on button click', () => {
      cleanup();
      const __handleSubmit = jest.fn();
      utils = render(<MessageCreator handleSubmit={__handleSubmit} />);
      const { getByTestId, getByText } = utils;
      const textbox = getByTestId('message-creator-textbox');

      const sendButton = getByText(/send/i);

      act(() => {
         fireEvent.change(textbox, { target: { value: testText } });
         fireEvent.click(sendButton);
      });

      expect(__handleSubmit).toBeCalledTimes(1);
      expect(textbox).toHaveDisplayValue('');
   });

   test('should submit to handler on `Enter` keypress', () => {
      cleanup();
      const __handleSubmit = jest.fn();
      utils = render(<MessageCreator handleSubmit={__handleSubmit} />);
      const { getByTestId, getByText } = utils;
      const textbox = getByTestId('message-creator-textbox');

      act(() => {
         fireEvent.change(textbox, { target: { value: testText } });
         fireEvent.keyPress(getByText(testText), {
            key: 'Enter',
            charCode: 13,
            keyCode: 13,
            code: 'Enter',
            shiftKey: null,
         });
      });

      expect(__handleSubmit).toBeCalledTimes(1);
      expect(textbox).toHaveDisplayValue('');
   });
   test('should not submit to handler on `Shift+Enter` keypress', () => {
      cleanup();
      const __handleSubmit = jest.fn();
      utils = render(<MessageCreator handleSubmit={__handleSubmit} />);
      const { getByTestId, getByText } = utils;
      const textbox = getByTestId('message-creator-textbox');

      act(() => {
         fireEvent.change(textbox, { target: { value: testText } });
         fireEvent.keyPress(getByText(testText), {
            key: 'Enter',
            charCode: 13,
            keyCode: 13,
            code: 'Enter',
            shiftKey: true,
         });
      });

      expect(__handleSubmit).toBeCalledTimes(0);
      expect(textbox).toHaveDisplayValue('');
   });

   test('should render correctly', () => {
      const { asFragment } = render(<MessageCreator />);
   
      expect(asFragment()).toMatchSnapshot();
   });
});

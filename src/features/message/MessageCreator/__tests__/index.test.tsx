import React from 'react';
import { render, RenderResult } from 'testing-utils';
import MessageCreator from '..';
import { fireEvent, act, cleanup } from '@testing-library/react';

describe('MessageCreator component', () => {

  const testText = 'This is a test message.'
  let utils: RenderResult;
  beforeEach(() => {
    utils = render(<MessageCreator />)
  })
  test('should display a button with the text `Send`', () => {
    const {getByText} = utils;
    
    expect(getByText(/Send/i)).toBeVisible();
  })
  test('should change value of textbox when typed', () => {
    const {getByTestId} = utils;
    const textbox = getByTestId("message-creator-textbox");


    fireEvent.change(textbox, {target: {value: testText}});

    expect(textbox).toBeVisible();
    expect(textbox).toHaveDisplayValue(testText);
  })
  
  test('should submit to handler on button click', () => {
    cleanup();
    const __handleSubmit = jest.fn();
    utils = render(<MessageCreator handleSubmit={__handleSubmit} />)
    const {getByTestId, getByText} = utils;
    const textbox = getByTestId("message-creator-textbox");

    const sendButton = getByText(/send/i);

    act(() => {
      fireEvent.change(textbox, {target: {value: testText}});
      fireEvent.click(sendButton);
    })

    expect(__handleSubmit).toBeCalledTimes(1);
    expect(textbox).toHaveDisplayValue('');
  })
  test('should submit to handler on form submit', () => {
    cleanup();
    const __handleSubmit = jest.fn();
    utils = render(<MessageCreator handleSubmit={__handleSubmit} />)
    const {getByTestId} = utils;
    const form = getByTestId("message-creator-form");
    const textbox = getByTestId("message-creator-textbox");

    act(() => {
      fireEvent.change(textbox, {target: {value: testText}});
      fireEvent.submit(form);
    })

    expect(__handleSubmit).toBeCalledTimes(1);
    expect(textbox).toHaveDisplayValue('');
  })
})


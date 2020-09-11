import React from 'react';
import { render, fireEvent, cleanup } from 'testing-utils';
import ButtonNavbarIcon from '..';

describe('ButtonNavbarIcon', () => {
  const testString = "Test";
  afterEach(() => {
    cleanup();
  })
  test('should display the given children as its value', () => {
    const {getByText} = render(<ButtonNavbarIcon>{testString}</ButtonNavbarIcon>);

    expect(getByText(/test/i)).toBeVisible();

  })

  test('should pass click event to handler', () => {
    const __handleClick = jest.fn()
    const {getByTestId} = render(<ButtonNavbarIcon handleClick={__handleClick}>{testString}</ButtonNavbarIcon>);
    const button = getByTestId('button-navbar-icon');

    fireEvent.click(button);

    expect(__handleClick).toBeCalledTimes(1);

  })
  
  test('should render correctly', () => {
    const { asFragment } = render(<ButtonNavbarIcon />);
 
    expect(asFragment()).toMatchSnapshot();
 });
 
})

import React from 'react';
import { render, fireEvent, RenderResult, cleanup } from 'testing-utils';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import LogoutButton from '..';



jest.mock('react-redux', () => ({
  ...jest.requireActual<any>('react-redux'),
  useDispatch: jest.fn(),
}));
jest.mock('js-cookie', () => ({
  remove: jest.fn(),
}));

describe('LogoutButton Feature Component', () => {
  let utils: RenderResult;
  beforeEach(() => {
    utils = render(<LogoutButton/>)
  })
  afterEach(() => cleanup());

  test('should dispatch logout on click', () => {
    const {getByTestId} = utils;
    const button = getByTestId('navigation-button-logout');

    fireEvent.click(button);

    expect(useDispatch).toBeCalledTimes(1);
  })

  test('should remove cookie on logout', () => {
    const {getByTestId} = utils;
    const button = getByTestId('navigation-button-logout');

    fireEvent.click(button);

    expect(Cookies.remove).toBeCalledTimes(1);
  })

  test('should render correctly', () => {
    const { asFragment } = render(<LogoutButton />);
 
    expect(asFragment()).toMatchSnapshot();
 });
  
})

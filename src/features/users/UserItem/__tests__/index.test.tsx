import React from 'react';
import { RenderResult, render } from 'testing-utils';
import UserItem from '..';
import { cleanup, fireEvent } from '@testing-library/react';

describe('UserItem Feature Component', () => {
  const __user = {id: 1, name: 'Wessel'}
  const __handleClick = jest.fn();
  let utils: RenderResult;
  beforeEach(() => 
    utils = render(<UserItem user={__user} handleClick={__handleClick}/>)
  )
  afterEach(() => {
    cleanup();
  })
  test('should display the user name from props', () => {
    const {getByText} = utils;

    expect(getByText(/Wessel/i)).toBeVisible();
  })

  test('should call click handler when item is clicked', () => {
    const { getByTestId } = utils;

    fireEvent.click(getByTestId('user-item'));

    expect(__handleClick).toBeCalledTimes(1);
  })
  
  
})

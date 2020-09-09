import React from 'react';
import { render } from 'testing-utils';
import ButtonNavbarIcon from '..';

describe('ButtonNavbarIcon', () => {
  beforeEach(() => {
  })
  test('should display the given children as its value', () => {
    const testString = "Test";
    const utils = render(<ButtonNavbarIcon>{testString}</ButtonNavbarIcon>)
    const {getByText} = utils;

    expect(getByText(/test/i)).toBeVisible();

  })
  
})

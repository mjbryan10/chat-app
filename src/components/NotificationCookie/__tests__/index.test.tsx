import React from 'react';
import { fireEvent, render } from 'testing-utils';
import NotificationCookie from '..';

describe('NotificationCookie Component', () => {
  const __handleClick = jest.fn();
  test('should call click handler on button click', () => {
    const {getByTestId} = render(<NotificationCookie handleClick={__handleClick} />)
    const button = getByTestId('cookie-accept-button');

    fireEvent.click(button);
    expect(__handleClick).toBeCalledTimes(1);
  })

  test('should render correctly', () => {
   const { asFragment } = render(<NotificationCookie handleClick={__handleClick} />);

   expect(asFragment()).toMatchSnapshot();
});
  
})

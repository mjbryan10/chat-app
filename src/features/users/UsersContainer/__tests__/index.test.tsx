import React from 'react';
import UsersContainer from '..';
import { render } from 'testing-utils';

jest.mock('axios');
describe('UsersContainer Feature Component', () => {
  test('should render correctly', () => {
    const { asFragment } = render(<UsersContainer />);
 
    expect(asFragment()).toMatchSnapshot();
 });
});

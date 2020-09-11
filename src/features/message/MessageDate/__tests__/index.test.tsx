import React from 'react';
import { render } from 'testing-utils';
import MessageDate from '..';

describe('MessageDate Feature Component', () => {
  const testText = "Today";
  test('should render the passed down property', () => {
    const utils = render(<MessageDate value={testText} />)

    const date = utils.getAllByText(/today/i);

    expect(date[0]).toBeVisible();
    expect(date.length).toBe(1);
  })

  test('should render correctly', () => {
    const { asFragment } = render(<MessageDate value={testText} />);
 
    expect(asFragment()).toMatchSnapshot();
 });
  
})

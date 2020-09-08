import React from 'react';
import { render } from 'testing-utils';
import MessageDate from '..';

describe('MessageDate Feature Component', () => {
  test('should render the passed down property', () => {
    const testText = "Today";
    const utils = render(<MessageDate value={testText} />)

    const date = utils.getAllByText(/today/i);

    expect(date[0]).toBeVisible();
    expect(date.length).toBe(1);
  })
  
})

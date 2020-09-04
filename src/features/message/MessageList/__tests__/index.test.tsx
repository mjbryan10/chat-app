import React from 'react';
import { render, RenderResult, cleanup } from 'testing-utils';
import MessageList from '..';

describe('MessageList Date Specific', () => {
  const testMessages = [{
    id: 1,
    senderId: 1,
    message: 'The first message',
    timestamp: '2020-09-04 08:15:00',
    conversationid: 2,
    status: 0,
 },
 {
  id: 2,
  senderId: 2,
  message: 'The first message',
  timestamp: '2020-09-03 08:15:00',
  conversationid: 2,
  status: 0,
},
 {
  id: 3,
  senderId: 3,
  message: 'The third message',
  timestamp: '2020-09-01 08:15:00',
  conversationid: 2,
  status: 0,
},];

let utils: RenderResult;
  beforeEach(() => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => 1599203820000); //2020-09-04
    utils = render(<MessageList messages={testMessages} />);
  });
  afterEach(() => {
     jest.resetAllMocks();
     cleanup();
  });

  test('should display today if a messages sent today', () => {
    const {getByText} = utils;

     expect(getByText(/today/i)).toBeVisible();
  });

  test('should display yesterday if a messages sent yesterday', () => {
    const {getByText} = utils;
    
     expect(getByText(/yesterday/i)).toBeVisible();
  });
  
  test('should display dates of message', () => {
    const { getByText } = utils;

    expect(getByText(/1 september 2020/i)).toBeVisible();
 });
});
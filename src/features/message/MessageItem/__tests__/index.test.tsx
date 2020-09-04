import React from 'react';
import { render, RenderResult } from 'testing-utils';
import MessageItem from '..';
import { cleanup } from '@testing-library/react';

jest.mock('moment');

describe('MessageItem Component', () => {
   const testMessage = {
      id: 1,
      senderId: 5,
      message: 'The first message',
      timestamp: '2020-09-04 08:15:00',
      conversationid: 2,
      status: 0,
   };
   describe('MessageItem standard implementation', () => {
      let utils: RenderResult;

      beforeEach(() => {
         utils = render(<MessageItem message={testMessage} />);
      });
      afterEach(() => {
         jest.resetAllMocks();
         cleanup();
      });

      test('should display message body', () => {
         const { getByText } = utils;

         expect(getByText(/The first message/i)).toBeVisible();
      });

      test('should display message sent time', () => {
         const { getByText } = utils;
         expect(getByText(/08:15/i)).toBeVisible();
      });

      test('should display user name', () => {
        const { getByText } = utils;

        expect(getByText(/'Wessel'/i)).toBeVisible();
      })
      
   });

   
});


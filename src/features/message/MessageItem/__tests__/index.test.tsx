import React from 'react';
import { render, RenderResult } from 'testing-utils';
import MessageItem from '..';
import { cleanup } from '@testing-library/react';

jest.mock('axios');

describe('MessageItem Component', () => {
   const testMessage = {
      id: 1,
      senderId: 5,
      message: 'The first message',
      timestamp: '2020-09-04 08:15:00',
      conversationid: 2,
      status: 0,
   };
   let utils: RenderResult;
   describe('MessageItem intial render', () => {
      beforeEach(() => {
         utils = render(
            <MessageItem
               messageText={testMessage.message}
               username="Wessel"
               color="owner"
               time="08:15"
            />
         );
      });
      afterEach(() => {
         jest.resetAllMocks();
         cleanup();
      });

      test('should display message body', () => {
         const { getByText } = utils;

         expect(getByText(/The first message/i)).toBeVisible();
      });

      test('should display message sent time (MM:SS format)', () => {
         const { getByText } = utils;

         expect(getByText(/08:15/i)).toBeVisible();
      });

      test('should display username', () => {
         const { getByText } = utils;

         expect(getByText(/'Wessel'/i)).toBeVisible();
      });
   });
});

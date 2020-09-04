import React from 'react';
import { render, RenderResult } from 'testing-utils';
import MessageItem from '..';
import { cleanup, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import { act } from 'react-dom/test-utils';

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

      test('should display message sent time (MM:SS format)', () => {
         const { getByText } = utils;
         expect(getByText(/08:15/i)).toBeVisible();
      });
   });
   describe('MessageItem after axios response', () => {
      test('should fetch and display username', async () => {
        //  let utils: RenderResult;
         (axios.get as jest.Mock).mockImplementationOnce(() => Promise.resolve('Wessel'));

         render(<MessageItem message={testMessage} />);
        //  await act(() => {
        // });

         await waitFor(() => expect(screen.getByText(/'Wessel'/i)));
         expect(axios.get).toHaveBeenCalledTimes(1);
         expect(screen.getByText(/'Wessel'/i)).toBeVisible();
      });
   });
});

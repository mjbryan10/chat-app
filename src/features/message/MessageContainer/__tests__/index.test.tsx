import React from 'react';
import axios from 'axios';
import { render } from '@testing-library/react';
import MessageContainer from '..';

jest.mock('axios');

describe('MessageContainer', () => {
   const testMessage = {
      id: 1,
      senderId: 5,
      message: 'The first message',
      timestamp: '2020-09-04 08:15:00',
      conversationid: 2,
      status: 0,
   };
   const testUser = {
      id: 1,
      name: 'Wessel',
   };
   test('should request the username from the server on mount', () => {
      (axios.get as jest.Mock)
         .mockImplementationOnce(() => Promise.resolve(testUser));
         render(<MessageContainer message={testMessage} />)
      expect(axios.get).toBeCalledTimes(1);
   });
});

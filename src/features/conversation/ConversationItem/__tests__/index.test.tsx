import React from 'react';
import { render, cleanup } from 'testing-utils';
import ConversationItem from '..';
import { Conversation } from 'shared/Api/types';

describe('ConversationItem component', () => {
   const __privateConversation: Conversation = {
      conversation: {
         id: 4010,
         conversationId: 4010,
         is_owner: 0,
         userid: 1,
         status: 1,
         lastseen: null,
         name: null,
         type: 1,
      },
      users: [
         {
            id: 10257,
            conversationId: 4010,
            is_owner: 0,
            userid: 1,
            status: null,
            lastseen: null,
         },
         {
            id: 10258,
            conversationId: 4010,
            is_owner: 0,
            userid: 2,
            status: null,
            lastseen: null,
         },
      ],
   };
   afterEach(() => cleanup());

   test('should render correctly', () => {
      const { asFragment } = render(
         <ConversationItem conversation={__privateConversation} color="red" />
      );

      expect(asFragment()).toMatchSnapshot();
   });
});

import React from 'react';
import { Conversation } from 'shared/Api/types';
import ConversationSelector from '..';
import { render } from 'testing-utils';

describe('ConversationSelector Feature Component', () => {
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
   const __groupConversation: Conversation = {
      conversation: {
         id: 4,
         conversationId: 4,
         is_owner: 0,
         userid: 1,
         status: 1,
         lastseen: '2019-11-05 10:10:50',
         name: 'Group Chaaat',
         type: 2,
      },
      users: [
         {
            id: 31,
            conversationId: 4,
            is_owner: 0,
            userid: 1,
            status: null,
            lastseen: '2019-11-05 10:10:50',
         },
         {
            id: 32,
            conversationId: 4,
            is_owner: 0,
            userid: 2,
            status: null,
            lastseen: '2019-01-25 11:49:01',
         },
         {
            id: 33,
            conversationId: 4,
            is_owner: 0,
            userid: 3,
            status: null,
            lastseen: null,
         },
         {
            id: 34,
            conversationId: 4,
            is_owner: 0,
            userid: 4,
            status: null,
            lastseen: null,
         },
      ],
   };
   const __conversations = [__privateConversation, __groupConversation];

   test('should render correctly if status === pending', () => {
      const { asFragment } = render(
         <ConversationSelector status="pending" conversations={__conversations} />
      );

      expect(asFragment()).toMatchSnapshot();
   });
   test('should render correctly if status !== pending', () => {
      const { asFragment } = render(
         <ConversationSelector status="fulfilled" conversations={__conversations} />
      );

      expect(asFragment()).toMatchSnapshot();
   });
});

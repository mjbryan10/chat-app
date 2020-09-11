import React from 'react';
import { render, cleanup, fireEvent } from 'testing-utils';
import ConversationItem from '..';
import { Conversation } from 'shared/Api/types';
import axios from 'axios';
import { Provider } from 'react-redux';
import { store } from 'app/store';
import { act } from 'react-dom/test-utils';

describe('AvatarWithLabelAndDelete component', () => {
   const privateConversation: Conversation = {
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
   const groupConversation: Conversation = {
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
   beforeEach(() => {
      cleanup();
      (axios.get as jest.Mock).mockClear();
   });
   // test('should fire clickHandler', () => {
   //    const clickHandler = jest.fn();
   //    const utils = render(
   //       <ConversationItem conversation={privateConversation} title="test title" handleClick={clickHandler} />
   //    );
   //    const button = utils.getByTestId('conversation-item-button');

   //    fireEvent.click(button);

   //    expect(clickHandler).toHaveBeenCalledTimes(1);
   // });
   // test('should render title text as avatar label', () => {
   //    const clickHandler = jest.fn();
   //    const testTitle = 'test title';
   //    const utils = render(
   //       <ConversationItem id={1} title={testTitle} handleClick={clickHandler} />
   //    );

   //    const innerContainer = utils.getByTestId('conversation-item-button');

   //    expect(innerContainer).toHaveTextContent(testTitle);
   // });

   // test('should fetch user name for title if no conversation name', async () => {
   //    (axios.get as jest.Mock).mockImplementationOnce(() =>
   //       Promise.resolve({
   //          id: '1',
   //          name: 'Wessel',
   //       })
   //    );
   //    const utils = render(
   //       <Provider store={store}>
   //          <ConversationItem conversation={privateConversation} color="blue" />
   //       </Provider>
   //    );
   //    const avatar = utils.getByTestId('avatar-inner-container');
   //    const label = utils.getByTestId('avatar-with-label-span');

   //    act(() => {
   //       setTimeout(() => {
   //       }, 1000);
   //    });
   //    expect(avatar).toHaveTextContent('W');
   //    expect(label).toHaveTextContent('Wessel');
   //    expect(axios.get).toBeCalledTimes(1);
   // });
});

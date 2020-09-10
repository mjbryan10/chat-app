import React, { FC } from 'react';
import { LoadingStatus } from 'app/store';
import { Conversation } from 'shared/Api/types';
import Spinner from 'components/Spinner';
import ConversationList from '../ConversationList';

interface Props {
   status: LoadingStatus;
   conversations: Conversation[];
}
const ConversationSelector: FC<Props> = ({ status, conversations }) => {
   return status === 'pending' ? (
      <Spinner />
   ) : (
      <ConversationList conversations={conversations} />
   );
};
export default ConversationSelector;

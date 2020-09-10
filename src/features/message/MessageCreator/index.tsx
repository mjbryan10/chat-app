import React, { FC, useState, SyntheticEvent, KeyboardEvent } from 'react';
import InputSubmitButton from 'components/InputSubmitButton';
import * as S from './styles';

interface Props {
   handleSubmit?: (value: string) => void;
   disabled?: boolean;
}

const MessageCreator: FC<Props> = ({ handleSubmit, disabled = false }) => {
   const [messageValue, setMessageValue] = useState('');
   const onSubmit = (event?: SyntheticEvent<HTMLFormElement>) => {
      if (event) event.preventDefault();
      if (!disabled && messageValue.length) {
         if (handleSubmit) handleSubmit(messageValue);
         setMessageValue('');
      }
   };
   const onChange = (event: SyntheticEvent<HTMLTextAreaElement>) => {
      event.preventDefault();
      const { value } = event.currentTarget;
      setMessageValue(value);
   };
   const onEnterPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.charCode === 13 && event.shiftKey === false) {
         event.preventDefault();
         onSubmit();
      }
   };
   return (
      <S.Form onSubmit={onSubmit} data-testid="message-creator-form">
         <S.TextArea
            value={messageValue}
            placeholder={
               disabled ? 'Select a conversation' : 'Type a message'
            }
            onChange={onChange}
            onKeyPress={onEnterPress}
            data-testid="message-creator-textbox"
            disabled={disabled}
         />
         <InputSubmitButton
            value="Send"
            data-testid="message-creator-button"
            disabled={(disabled && messageValue.length > 0)}
         />
      </S.Form>
   );
};

export default MessageCreator;

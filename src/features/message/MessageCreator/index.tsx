import React, { FC, useState, SyntheticEvent } from 'react';
import InputSubmitButton from 'components/InputSubmitButton';

interface Props {
   handleSubmit?: (value: string) => void;
   disabled?: boolean;
}

const MessageCreator: FC<Props> = ({ handleSubmit, disabled = false }) => {
   const [messageValue, setMessageValue] = useState('');
   const onSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
      if (!disabled) {
         event.preventDefault();
         if (handleSubmit) handleSubmit(messageValue);
         setMessageValue('');
      }
   };
   const onChange = (event: SyntheticEvent<HTMLTextAreaElement>) => {
      event.preventDefault();
      const { value } = event.currentTarget;
      setMessageValue(value);
   };
   return (
      <form onSubmit={onSubmit} data-testid="message-creator-form">
         <textarea
            value={messageValue}
            placeholder="Write your meessage here"
            onChange={onChange}
            data-testid="message-creator-textbox"
            disabled={disabled}
         />
         <InputSubmitButton
            value="Send"
            data-testid="message-creator-button"
            disabled={disabled}
         />
      </form>
   );
};

export default MessageCreator;

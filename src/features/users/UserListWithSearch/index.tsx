import React, { FC, useState } from 'react';
import { User } from 'shared/Api/types';
import UserList from '../UserList';
import InputTextFieldWithLabel from 'components/InputTextFieldWithLabel';
import * as S from './styles';

interface Props {
   users: User[];
   handleItemClick?: (id: number) => void;
}

const UserListWithSearch: FC<Props> = ({ users, handleItemClick }) => {
   const [searchString, setSearchString] = useState('');
   /**
    * Handler for the search input. Updates the search string state to the
    * user inputted value.
    *
    * @param value String value to set the searchString state with
    */
   const handleSearchChange = (value: string) => {
      setSearchString(value);
   };
   /**
    * @returns An array of users where the username matches the search string
    *
    * @returns Full users array if there is no search string.
    */
   const filteredUsers = () => {
      const usersArray = users;
      if (!searchString.length) return usersArray;
      return usersArray.filter((user) =>
         user.name.toLowerCase().includes(searchString.toLowerCase())
      );
   };
   return (
      <S.Container>
         <InputTextFieldWithLabel
            labelValue="Search"
            disabled={!users.length}
            handleChange={handleSearchChange}
            placeholder="Search for a user"
         />
         <UserList users={filteredUsers()} handleItemClick={handleItemClick} />
      </S.Container>
   );
};

export default UserListWithSearch;

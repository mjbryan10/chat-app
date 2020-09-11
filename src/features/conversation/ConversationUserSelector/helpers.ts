import { User } from "shared/Api/types";

/**
 * Sorts an array of users alphabetically by name.
 * @param users An array of users to sort by name
 */
export const sortUsers = (users: User[]) => {
   if (!users.length) return [];
   return users.slice().sort((a, b) => a.name.localeCompare(b.name));
};

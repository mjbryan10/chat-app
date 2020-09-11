import { sortUsers } from '../helpers';

describe('ConversationUserSelector Helpers', () => {
   describe('sortUsers', () => {
      const __users = [
         {
            id: 1,
            name: 'B',
         },
         {
            id: 2,
            name: 'C',
         },
         {
            id: 3,
            name: 'A',
         },
      ];

      test('should sort alphabetically', () => {
         const result = sortUsers(__users);

         expect(result[0].name).toBe('A');
         expect(result[1].name).toBe('B');
         expect(result[2].name).toBe('C');
      });
   });
});

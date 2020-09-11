import { stringToCaptialLetter } from '../helpers';

describe('stringToCaptialLetter', () => {
  test('should return the first letter captalised', () => {
     const testText = 'test';

     const result = stringToCaptialLetter(testText);

     expect(result).toEqual('T');
  });
});
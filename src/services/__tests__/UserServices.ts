import axios from 'axios';
import { fetchUserById, fetchAllUsers } from '../UserServices';
import Api from '../Api';

jest.mock('axios');

describe('UserServices', () => {

  beforeEach(() => {
    (axios.get as jest.Mock).mockClear();
  });

  const errorMessage = 'request rejected';

   describe('fetchUserById', () => {
      it('fetches successfully data from an API', async () => {
         //Arrange
         const data = {
            id: 1,
            name: 'Wessel',
         };

         (axios.get as jest.Mock).mockImplementationOnce(() => Promise.resolve(data));

         //Act
         const userInfo = await fetchUserById(1);
         //Assert
         expect(userInfo).toEqual({ id: 1, name: 'Wessel' });
         expect(axios.get).toHaveBeenCalledTimes(1);
         expect(axios.get).toHaveBeenCalledWith(`${Api.baseUrl}/user/1`);
      });

      it('handles if user id is not present in database', async () => {
         const data = false;

         (axios.get as jest.Mock).mockImplementationOnce(() => Promise.resolve(data));

         const userInfo = await fetchUserById(42);

         expect(userInfo).toEqual(data);
         expect(axios.get).toHaveBeenCalledTimes(1);
         expect(axios.get).toHaveBeenCalledWith(`${Api.baseUrl}/user/42`);
      });

      it('fetches erroneously data from an API', async () => {

         (axios.get as jest.Mock).mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));

         await expect(fetchUserById(42)).rejects.toThrow(errorMessage);
         expect(axios.get).toHaveBeenCalledTimes(1);
         expect(axios.get).toHaveBeenCalledWith(`${Api.baseUrl}/user/42`);
      });
   });

   describe('fetchAllUsers', () => {
      it('fetches successfully data from an API', async () => {
         const data = [
            {
               id: 1,
               name: 'Wessel',
            },
            {
               id: 2,
               name: 'Quint',
            },
            {
               id: 3,
               name: 'Mani',
            },
            {
               id: 4,
               name: 'Menno',
            },
            {
               id: 5,
               name: 'Patrick',
            },
         ];
         
         (axios.get as jest.Mock).mockImplementationOnce(() => Promise.resolve(data));
         
         const users = await fetchAllUsers();

         expect(users).toEqual(data);
         expect(axios.get).toHaveBeenCalledTimes(1);
         expect(axios.get).toHaveBeenCalledWith(`${Api.baseUrl}/users`);
      });

      it('fetches erroneously data from an API', async () => {
        
        (axios.get as jest.Mock).mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));
        console.log('errorMessage', errorMessage);
        
        await expect(fetchAllUsers()).rejects.toThrow(errorMessage);
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith(`${Api.baseUrl}/users`);

      });
   });
});

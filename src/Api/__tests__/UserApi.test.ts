import axios from 'axios';
import UserApi from '../UserApi';
import BaseApi from '../BaseApi';

jest.mock('axios');

describe('UserApi', () => {
   beforeEach(() => {
      (axios.get as jest.Mock).mockClear();
   });

   const errorMessage = 'request rejected';
   const userApi = new UserApi();
   const baseAPi = new BaseApi();

   describe('FetchById', () => {
      it('fetches successfully data from an API', async () => {
         const data = {
            id: 1,
            name: 'Wessel',
         };

         (axios.get as jest.Mock).mockImplementationOnce(() => Promise.resolve(data));

         const userInfo = await userApi.fetchById(1);

         expect(userInfo).toEqual({ id: 1, name: 'Wessel' });
         expect(axios.get).toHaveBeenCalledTimes(1);
         expect(axios.get).toHaveBeenCalledWith(`${baseAPi.baseUrl}/user/1`);
      });

      it('handles if user id is not present in database', async () => {
         (axios.get as jest.Mock).mockImplementationOnce(() => Promise.resolve(false));

         const userInfo = await userApi.fetchById(42);

         expect(userInfo).toEqual(false);
         expect(axios.get).toHaveBeenCalledTimes(1);
         expect(axios.get).toHaveBeenCalledWith(`${baseAPi.baseUrl}/user/42`);
      });

      it('fetches erroneously data from an API', async () => {
         (axios.get as jest.Mock).mockImplementationOnce(() =>
            Promise.reject(new Error(errorMessage))
         );

         await expect(userApi.fetchById(42)).rejects.toThrow(errorMessage);
         expect(axios.get).toHaveBeenCalledTimes(1);
         expect(axios.get).toHaveBeenCalledWith(`${baseAPi.baseUrl}/user/42`);
      });
   });

   describe('authenticateUserById', () => {
      it('finds user in database matching credentials given', async () => {
         //Arrange
         const data = {
            id: 1,
            name: 'Wessel',
         };

         const response = {
            data,
         };

         (axios.get as jest.Mock).mockImplementationOnce(() => Promise.resolve(response));

         //Act
         const apiResponse = await userApi.authenticateUser(1, 'Wessel');
         //Assert
         expect(apiResponse.isAuthenticated).toEqual(true);
         expect(axios.get).toHaveBeenCalledTimes(1);
         expect(axios.get).toHaveBeenCalledWith(`${baseAPi.baseUrl}/user/1`);
      });

      it('informs user is not authenticated if wrong details given', async () => {
         const data = {
            id: 1,
            name: 'Wessel',
         };

         const response = {
            data,
         };

         (axios.get as jest.Mock).mockImplementationOnce(() => Promise.resolve(response));

         const apiResponse = await userApi.authenticateUser(1, 'bob');

         expect(apiResponse.isAuthenticated).toEqual(false);
         expect(axios.get).toHaveBeenCalledTimes(1);
         expect(axios.get).toHaveBeenCalledWith(`${baseAPi.baseUrl}/user/1`);
      });

      it('fetches erroneously data from an API', async () => {
         (axios.get as jest.Mock).mockImplementationOnce(() =>
            Promise.reject(new Error(errorMessage))
         );

         await expect(userApi.authenticateUser(1, 'Wessel')).rejects.toThrow(errorMessage);
         expect(axios.get).toHaveBeenCalledTimes(1);
         expect(axios.get).toHaveBeenCalledWith(`${baseAPi.baseUrl}/user/1`);
      });
   });

   describe('FetchAll', () => {
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

         (axios.get as jest.Mock).mockImplementationOnce(() => Promise.resolve({data}));

         const users = await userApi.fetchAll();

         expect(users).toEqual(data);
         expect(axios.get).toHaveBeenCalledTimes(1);
         expect(axios.get).toHaveBeenCalledWith(`${userApi.baseUrl}/users`);
      });

      it('fetches erroneously data from an API', async () => {
         (axios.get as jest.Mock).mockImplementationOnce(() =>
            Promise.reject(new Error(errorMessage))
         );
         console.log('errorMessage', errorMessage);

         await expect(userApi.fetchAll()).rejects.toThrow(errorMessage);
         expect(axios.get).toHaveBeenCalledTimes(1);
         expect(axios.get).toHaveBeenCalledWith(`${userApi.baseUrl}/users`);
      });
   });
});

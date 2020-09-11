import React from 'react';
import Cookies from 'js-cookie';
import ThemeToggle from '..';
import { render, fireEvent, cleanup } from 'testing-utils';

jest.mock('js-cookie');
const setup = () => {
   const utils = render(<ThemeToggle />);
   const checkbox = utils.getByTestId('theme-toggle-checkbox');
   return { checkbox, ...utils };
};

describe('ThemeToggle', () => {
   beforeEach(cleanup);

   test('expect cookie to be consumed on render', () => {
      const getSpy = jest.spyOn(Cookies, 'get').mockReturnValue({ theme: 'dark' });
      setup();

      expect(getSpy).toBeCalledWith('theme');
      getSpy.mockRestore();
   });

   test('should change theme cookie on toggle dark->light', () => {
      const getSpy = jest
         .spyOn(Cookies, 'get')
         .mockReturnValueOnce({ theme: 'dark' })
         .mockReturnValueOnce({ theme: 'light' });
      const setSpy = jest.spyOn(Cookies, 'set');
      const { checkbox } = setup();

      fireEvent.click(checkbox);

      //get
      expect(getSpy).toBeCalledWith('theme');
      expect(getSpy).toBeCalledTimes(2);
      //set
      expect(setSpy).toBeCalledWith('theme', 'light', { expires: 7 });
      expect(setSpy).toBeCalledTimes(1);

      getSpy.mockRestore();
      setSpy.mockRestore();
   });

   test('should change theme cookie on toggle light->dark', () => {
      const getSpy = jest
         .spyOn(Cookies, 'get')
         .mockReturnValueOnce({ theme: 'light' })
         .mockReturnValueOnce({ theme: 'dark' });
      const setSpy = jest.spyOn(Cookies, 'set');
      const { checkbox } = setup();

      fireEvent.click(checkbox);

      //get
      expect(getSpy).toBeCalledWith('theme');
      expect(getSpy).toBeCalledTimes(2);
      //set
      expect(setSpy).toBeCalledWith('theme', 'dark', { expires: 7 });
      expect(setSpy).toBeCalledTimes(1);

      getSpy.mockRestore();
      setSpy.mockRestore();
   });

   test('should be set to dark if no cookie found', () => {
      const getSpy = jest.spyOn(Cookies, 'get').mockReturnValue(undefined as any);
      //any to force undefined as accepted response
      const setSpy = jest.spyOn(Cookies, 'set');
      setup();

      //get
      expect(getSpy).toBeCalledWith('theme');
      expect(getSpy).toBeCalledTimes(1);
      //set
      expect(setSpy).toBeCalledWith('theme', 'dark', { expires: 7 });
      expect(setSpy).toBeCalledTimes(1);

      getSpy.mockRestore();
      setSpy.mockRestore();
   });

   test('should render correctly', () => {
      const { asFragment } = setup();

      expect(asFragment()).toMatchSnapshot();
   });
});

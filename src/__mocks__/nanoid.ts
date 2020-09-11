export default {
   nanoid: jest.fn(() => 'nanoid' + Math.floor(Math.random() * 10)),
};

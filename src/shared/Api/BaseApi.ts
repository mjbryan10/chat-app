const API = process.env.REACT_APP_API;
let baseApi = '/api/'
if(API) baseApi = API;

export default class BaseApi {
  private readonly _baseUrl = `${baseApi}`
    
  get baseUrl() {
    return this._baseUrl;
  }
}
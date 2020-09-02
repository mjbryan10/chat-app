export default class BaseApi {
  private readonly _baseUrl = 'http://assignment.bunq.com/'

  get baseUrl() {
    return this._baseUrl
  }
}
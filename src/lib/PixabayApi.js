export default class PixabayApi {
  constructor() {
    this.URL = "https://pixabay.com/api/";
    this.KEY = "22470526-412f3aeb0ddde7d412a24acdb";
    this.request = null;
  }

  createRequestUrl() {
    const { URL, KEY } = this;
    this.request = `${URL}?key=${KEY}`;
    return this;
  }

  addGetParameter(name, value) {
    const { request } = this;
    this.request = `${request}&${name}=${value}`;
    return this;
  }

  getRequestUrl() {
    return this.request;
  }
}

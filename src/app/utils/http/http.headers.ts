import {ACCESS_TOKEN_SECRET_KEY} from '../../app.properties';

export default function httpHeaders() {
  return {
    authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN_SECRET_KEY) || '',
    'Content-Type': 'application/json',
    Accept: 'application/json'
  };
}

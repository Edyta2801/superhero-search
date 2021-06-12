import axios from 'axios';

const baseUrl='https://superheroapi.com/api';
const accessToken='931794854341970';


function request(method, endpoint, data = null) {
  return axios({
    method,
    // url: `${baseUrl}/${accessToken}/${endpoint}`,
    url: `${baseUrl}/${accessToken}/${endpoint}`,

    data,
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
  });
}

function get(endpoint) {
  return request('GET', endpoint);
}

function post(endpoint, data) {
  return request('POST', endpoint, data);
}

function patch(endpoint, data) {
  return request('PATCH', endpoint, data);
}

function _delete(endpoint) {
  return request('DELETE', endpoint);
}


// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get,
  post,
  patch,
  delete: _delete,
};

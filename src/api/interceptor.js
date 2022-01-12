// import axios from 'axios';
// import _ from 'lodash';
// import configEnv from 'configEnv';
import {callApi} from '../routes/main-routes';

// let gateway = configEnv.gateway;

// const HEADERS = {
//   Accept: 'application/json',
//   'Content-Type': 'application/json',
//   'x-client-app-version': configEnv.appVersion,
//   'x-client-app-code': 'oxbridge',
//   'x-client-locale': 'vi',
// };
// const {token} = AuthContext;

// function callApi(
//   _method,
//   {endpoint: url, body, headers: _headers, params, options},
// ) {
//   const endpoint = gateway + url;
//   const method = (_method || '').toUpperCase();
//   const headers = {
//     Authorization:
//       'Bearer Y2t4eXd2aWUzMDAwOTBobXljNGI4MTYwcg.SoruD1W6AzYJtWHX7pqRl22H089xqlINo47y3HRuU50vRac_B45ak2X0DnE1',
//     ...HEADERS,
//     ...(_headers || {}),
//   };

//   const optionsAxios = {
//     url: endpoint,
//     method,
//     data: body,
//     params,
//     headers,
//     ...(options || {}),
//   };
//   return axios(optionsAxios)
//     .then(response => {
//       if (response.status >= 200 && response.status < 300) {
//         return Promise.resolve(response);
//       }
//       return Promise.reject(response.data);
//     })
//     .catch(err => {
//       const statusError = _.get(err, 'response.status');
//       if (statusError === 403) {
//       }
//       if (statusError === 401) {
//       }
//       return Promise.reject(_.get(err, 'response.data'));
//     });
// }

const postMethod = (endpoint, body, headers, options) =>
  callApi('POST', {endpoint, body, headers, options});

const putMethod = (endpoint, body, headers, options) =>
  callApi('PUT', {endpoint, body, headers, options});

const deleteMethod = (endpoint, body, headers, options) =>
  callApi('DELETE', {endpoint, body, headers, options});

const patchMethod = (endpoint, body, headers, options) =>
  callApi('PATCH', {endpoint, body, headers, options});

const getMethod = (endpoint, params, headers, options) =>
  callApi('GET', {
    endpoint,
    headers,
    params,
    options,
  });

export default {
  get: getMethod,
  post: postMethod,
  put: putMethod,
  delete: deleteMethod,
  patch: patchMethod,
};

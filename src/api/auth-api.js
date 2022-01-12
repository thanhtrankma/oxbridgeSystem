import _ from 'lodash';
// import jwtDecode from 'jwt-decode';
// import {auth} from 'utils';
import interceptor from './interceptor';
import {DeviceEventEmitter} from 'react-native';

async function authLogin(body) {
  try {
    const url = 'login';
    const urlMe = 'api/v1/auth/me';
    const res = await interceptor.post(url, body);
    const token = _.get(res, 'data.token');
    const accessToken = `Bearer ${token}`;
    const _headers = {
      Authorization: accessToken,
    };
    const me = await interceptor.get(urlMe, '', _headers);
    DeviceEventEmitter.emit('refreshToken');
    const userInfo = me.data;
    const role = 'TECHER';
    return Promise.resolve({
      accessToken,
      userInfo,
      role,
    });
  } catch (e) {
    return Promise.reject(e);
  }
}

export default {
  authLogin,
};

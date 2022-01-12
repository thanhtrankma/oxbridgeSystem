import _ from 'lodash';
import queryString from 'query-string';
import interceptor from './interceptor';

async function getDetail() {
  const url = 'api/v1/teacher/27';
  const res = await interceptor.get(url);
  const {teacher} = _.get(res, 'data');
  return Promise.resolve(teacher);
}
async function getListTeacher(params, query = '') {
  const url = `api/v1/teacher?${queryString.stringify(params)}&${query}`;
  const res = await interceptor.get(url);
  const data = _.get(res, 'data');
  return Promise.resolve(data);
}
async function createTeacher(body) {
  const url = 'api/v1/teacher';
  const res = await interceptor.post(url, body);
  const data = _.get(res, 'data');
  return Promise.resolve(data);
}

export default {getDetail, getListTeacher, createTeacher};

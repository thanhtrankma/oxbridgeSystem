import _ from 'lodash';
import queryString from 'query-string';
import interceptor from './interceptor';

async function getDetail() {
  const url = 'api/v1/teacher/27';
  const res = await interceptor.get(url);
  const {teacher} = _.get(res, 'data');
  return Promise.resolve(teacher);
}
async function getListStudent(params, query = '') {
  const url = 'api/v1/students';
  const res = await interceptor.get(url);
  const data = _.get(res, 'data');
  return Promise.resolve(data.data);
}
async function createStudent(body) {
  const url = 'api/v1/student';
  const res = await interceptor.post(url, body);
  const data = _.get(res, 'data');
  return Promise.resolve(data.data);
}

export default {getDetail, getListStudent, createStudent};

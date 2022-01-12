import _ from 'lodash';
import interceptor from './interceptor';

async function query(keyword = '', page = 0, size = 20) {
  const url = `project-service/api/v1/projects/agent/search?page=${page}&size=${size}&keyword=${keyword}`;
  const res = await interceptor.get(url);
  const {content} = _.get(res, 'data');
  return Promise.resolve(content);
}
async function querySuggest(keyword, page = 0, size = 20) {
  const url = `project-service/api/v1/projects/agent/suggest?keyword=${keyword}`;
  const res = await interceptor.get(url);
  const content = _.get(res, 'data');
  return Promise.resolve(content);
}
async function createProject(body) {
  const url = 'project-service/api/v1/projects/agent/suggestion';
  const res = await interceptor.post(url, body);
  const content = _.get(res, 'data');
  return Promise.resolve(content);
}
async function getMatrix() {
  const url = 'property-service/public/api/v1/listings/matrix';
  const res = await interceptor.get(url);
  const properties = _.get(res, 'data');
  return Promise.resolve(properties);
}

export default {query, querySuggest, createProject, getMatrix};

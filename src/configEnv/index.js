//local
const localGateway = 'http://112.78.3.91:3333/';
// const defaultGateway = 'http://10.40.24.140:8080/';

//UAT
// const defaultGateway = 'http://10.26.53.24:8080/';
const defaultGateway = 'http://112.78.3.91:3333/';

const gateway = defaultGateway;
const GOOGLE_MAP_KEY = 'AIzaSyCyMkkfVjoxRUsZWIbz1Xm5A8VBSd1PhTw';
const appVersion = '99.99.99';
const buildNumber = '101010';
const isProduction = 'NOT_PROD';

export {GOOGLE_MAP_KEY};
export default {
  gateway,
  localGateway,
  defaultGateway,
  appVersion,
  buildNumber,
  isProduction,
};

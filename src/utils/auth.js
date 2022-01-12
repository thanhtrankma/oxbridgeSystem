import _ from 'lodash';
// import messaging from '@react-native-firebase/messaging';

const ROLE_AGENT = 'ROLE_dhomes-agent/authorization';

function checkIsAgent(authorities) {
  return _.includes(authorities, ROLE_AGENT);
}

// async function requestUserPermission() {
//   const authStatus = await messaging().hasPermission();
//   if (authStatus !== messaging.AuthorizationStatus.AUTHORIZED)
//     await messaging().requestPermission();
// }

export default {
  // requestUserPermission,
  checkIsAgent,
};

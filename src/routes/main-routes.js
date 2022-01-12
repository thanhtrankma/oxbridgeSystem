import _ from 'lodash';
import React, {useCallback, useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Menu from '../screen/menu';
import Login from '../screen/login';
import Teacher from '../screen/teacher';
import TeacherAdd from '../screen/teacher/add';
import TeacherFilter from '../screen/teacher/filter';
import TeacherFilterResults from '../screen/teacher/filter-results';
import TeacherDetail from '../screen/teacher/detail';
import Student from '../screen/student';
import StudentFilter from '../screen/student/filter';
import StudentFilterResults from '../screen/student/filter-results';
import StudentAdd from '../screen/student/add';
import StudentDetail from '../screen/student/detail';
import Parent from '../screen/parent';
import ParentFilter from '../screen/parent/filter';
import ParentFilterResults from '../screen/parent/filter-results';
import ParentAdd from '../screen/parent/add';
import ParentDetail from '../screen/parent/detail';
import Classes from '../screen/classEdu';
import ListStudent from '../screen/teacher/listStudent';
import Evaluation from '../screen/teacher/evaluation';
import EvaluationAdd from '../screen/teacher/evaluationAdd';
import ExamTeacherAdd from '../screen/exam/add';
import ModalScreen from '../screen/modal/modal-screen';
import BottomTabNavigator from './bottom-tab-navigator';
import {AuthContext} from 'components';
import axios from 'axios';
import configEnv from 'configEnv';
const loginOption = {
  headerShown: false,
  gestureEnabled: false,
  header: () => null,
};

const Stack = createStackNavigator();
let mainToken = '';

const MainRoute = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [role, setRole] = useState(null);

  const authContext = React.useMemo(
    () => ({
      signIn: async res => {
        setUserToken(res.accessToken);
        mainToken = res.accessToken;
        setUserInfo(res.userInfo);
        setRole(res.role);
        setIsLoading(false);
      },
      signOut: async () => {
        setUserToken(null);
        mainToken = '';
        setIsLoading(false);
      },
      userToken,
      userInfo,
      role,
    }),
    [role, userInfo, userToken],
  );

  // useEffect(() => {
  //   const refreshToken = () => {
  //     // setTimeout(() => {
  //     storage
  //       .load({
  //         key: 'loginState',
  //         autoSync: true,
  //         syncInBackground: true,
  //         syncParams: {
  //           extraFetchOptions: {
  //             // blahblah
  //           },
  //           someFlag: true,
  //         },
  //       })
  //       .then(ret => {
  //         console.log(ret.token);
  //         setToken(ret.token);
  //       })
  //       .catch(err => {
  //         console.warn(err.message);
  //         switch (err.name) {
  //           case 'NotFoundError':
  //             // TODO;
  //             setToken(null);
  //             break;
  //           case 'ExpiredError':
  //             // TODO
  //             setToken(null);
  //             break;
  //         }
  //       });
  //     // }, 10);
  //   };
  //   const listener = DeviceEventEmitter.addListener(
  //     'refreshToken',
  //     refreshToken,
  //   );
  //   refreshToken();
  //   return () => listener.remove();
  // }, []);
  return (
    <>
      <AuthContext.Provider value={authContext}>
        {!userToken ? (
          <Stack.Navigator screenOptions={loginOption}>
            <Stack.Screen name="Login" component={Login} />
            {/* <Stack.Screen name="RegisterScreen" component={RegisterScreen} /> */}
          </Stack.Navigator>
        ) : (
          <Stack.Navigator screenOptions={loginOption}>
            <Stack.Screen
              name="HomeTabNavigator"
              component={BottomTabNavigator}
            />

            <Stack.Screen name="DetailListing" component={Menu} />
            <Stack.Screen name="Teacher" component={Teacher} />
            <Stack.Screen name="TeacherFilter" component={TeacherFilter} />
            <Stack.Screen
              name="TeacherFilterResults"
              component={TeacherFilterResults}
            />
            <Stack.Screen name="StudentFilter" component={StudentFilter} />
            <Stack.Screen
              name="StudentFilterResults"
              component={StudentFilterResults}
            />
            <Stack.Screen name="ParentFilter" component={ParentFilter} />
            <Stack.Screen
              name="ParentFilterResults"
              component={ParentFilterResults}
            />
            <Stack.Screen name="TeacherDetail" component={TeacherDetail} />
            <Stack.Screen name="TeacherAdd" component={TeacherAdd} />
            <Stack.Screen name="Student" component={Student} />
            <Stack.Screen name="StudentDetail" component={StudentDetail} />
            <Stack.Screen name="StudentAdd" component={StudentAdd} />
            <Stack.Screen name="Parent" component={Parent} />
            <Stack.Screen name="ParentDetail" component={ParentDetail} />
            <Stack.Screen name="ParentAdd" component={ParentAdd} />
            <Stack.Screen name="Classes" component={Classes} />
            <Stack.Screen name="ModalScreen" component={ModalScreen} />
            <Stack.Screen name="ListStudent" component={ListStudent} />
            <Stack.Screen name="Evaluation" component={Evaluation} />
            <Stack.Screen name="EvaluationAdd" component={EvaluationAdd} />
            <Stack.Screen name="ExamTeacherAdd" component={ExamTeacherAdd} />
          </Stack.Navigator>
        )}
      </AuthContext.Provider>
    </>
  );
};
let gateway = configEnv.gateway;

const HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'x-client-app-version': configEnv.appVersion,
  'x-client-app-code': 'oxbridge',
  'x-client-locale': 'vi',
};
function callApi(
  _method,
  {endpoint: url, body, headers: _headers, params, options},
) {
  const endpoint = gateway + url;
  const method = (_method || '').toUpperCase();
  const headers = {
    Authorization: mainToken,
    ...HEADERS,
    ...(_headers || {}),
  };

  const optionsAxios = {
    url: endpoint,
    method,
    data: body,
    params,
    headers,
    ...(options || {}),
  };
  return axios(optionsAxios)
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
      }
      return Promise.reject(response.data);
    })
    .catch(err => {
      const statusError = _.get(err, 'response.status');
      if (statusError === 403) {
      }
      if (statusError === 401) {
      }
      return Promise.reject(_.get(err, 'response.data'));
    });
}
export {callApi};
export default MainRoute;

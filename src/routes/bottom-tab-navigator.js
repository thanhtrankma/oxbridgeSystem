import React, {useEffect, useState, memo, useCallback} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Menu from '../screen/menu';
import Home from '../screen/home';
import HomeTeacher from '../screen/home/teacher';
import ScheduleTeacher from '../screen/schedule/teacher';
import Profile from '../screen/profile';
import Edu from '../screen/edu';
import EduTeacher from '../screen/edu/teacher';
import ExamTeacher from '../screen/exam/teacher';
import {StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import {DeviceEventEmitter} from 'react-native';
import {storage} from 'utils';

const TabBottom = createBottomTabNavigator();
const MenuStack = createStackNavigator();

const MenuStackNavigator = ({navigation, route}) => {
  return (
    <MenuStack.Navigator>
      <MenuStack.Screen
        name="Menu"
        component={Menu}
        options={{headerShown: false, header: () => null}}
      />
      <MenuStack.Screen
        name="CustomerScreen"
        component={Menu}
        options={{headerShown: false, header: () => null}}
      />
    </MenuStack.Navigator>
  );
};

const BottomTabNavigator = () => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState('TEACHER');
  useEffect(() => {
    const refreshToken = () => {
      // setTimeout(() => {
      storage
        .load({
          key: 'loginState',
          autoSync: true,
          syncInBackground: true,
          syncParams: {
            extraFetchOptions: {
              // blahblah
            },
            someFlag: true,
          },
        })
        .then(ret => {
          console.log(ret.token);
          setToken(ret.token);
        })
        .catch(err => {
          console.warn(err.message);
          switch (err.name) {
            case 'NotFoundError':
              // TODO;
              setToken(null);
              break;
            case 'ExpiredError':
              // TODO
              setToken(null);
              break;
          }
        });
      // }, 10);
    };
    const listener = DeviceEventEmitter.addListener(
      'refreshToken',
      refreshToken,
    );
    refreshToken();
    return () => listener.remove();
  }, []);
  return (
    <>
      {role === 'ADMIN' && (
        <TabBottom.Navigator
          initialRouteName="Home"
          tabBarOptions={{
            activeTintColor: 'red',
            showLabel: false,
            tabStyle: {
              justifyContent: 'center',
              height: 50,
            },
            style: {
              alignItems: 'center',
              justifyContent: 'center',
            },
          }}>
          <TabBottom.Screen
            name="Home"
            component={Home}
            options={{
              tabBarIcon: ({color}) => (
                <Icon type="feather" name="home" color={color} size={25} />
              ),
            }}
          />
          <TabBottom.Screen
            name="Edu"
            component={Edu}
            options={{
              tabBarIcon: ({color}) => (
                <Icon
                  type="material"
                  name="cast-for-education"
                  color={color}
                  size={25}
                />
              ),
            }}
          />
          <TabBottom.Screen
            name="Menu"
            component={MenuStackNavigator}
            options={{
              tabBarIcon: ({color}) => (
                <Icon
                  type="font-awesome"
                  name="calendar-check-o"
                  color={color}
                  size={25}
                />
              ),
            }}
          />
          <TabBottom.Screen
            name="Notification"
            component={MenuStackNavigator}
            options={{
              tabBarIcon: ({color}) => (
                <Icon
                  type="ionicon"
                  name="notifications-outline"
                  color={color}
                  size={27}
                />
              ),
              tabBarBadge: 10,
            }}
          />

          <TabBottom.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarIcon: ({color}) => (
                <Icon
                  type="ionicon"
                  name="person-circle-outline"
                  color={color}
                  size={30}
                />
              ),
            }}
          />
        </TabBottom.Navigator>
      )}
      {role === 'TEACHER' && (
        <TabBottom.Navigator
          initialRouteName="Home"
          tabBarOptions={{
            activeTintColor: 'red',
            showLabel: false,
            tabStyle: {
              justifyContent: 'center',
              height: 50,
            },
            style: {
              alignItems: 'center',
              justifyContent: 'center',
            },
          }}>
          <TabBottom.Screen
            name="HomeTeacher"
            component={HomeTeacher}
            options={{
              tabBarIcon: ({color}) => (
                <Icon type="feather" name="home" color={color} size={25} />
              ),
            }}
          />
          <TabBottom.Screen
            name="ExamTeacher"
            component={ExamTeacher}
            options={{
              tabBarIcon: ({color}) => (
                <Icon
                  type="font-awesome"
                  name="calendar-check-o"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
          <TabBottom.Screen
            name="ScheduleTeacher"
            component={ScheduleTeacher}
            options={{
              tabBarIcon: ({color}) => (
                <Icon
                  type="material"
                  name="cast-for-education"
                  color={color}
                  size={25}
                />
              ),
            }}
          />
          <TabBottom.Screen
            name="Notification"
            component={MenuStackNavigator}
            options={{
              tabBarIcon: ({color}) => (
                <Icon
                  type="ionicon"
                  name="notifications-outline"
                  color={color}
                  size={27}
                />
              ),
              tabBarBadge: 10,
            }}
          />

          <TabBottom.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarIcon: ({color}) => (
                <Icon
                  type="ionicon"
                  name="person-circle-outline"
                  color={color}
                  size={30}
                />
              ),
            }}
          />
        </TabBottom.Navigator>
      )}
    </>
  );
};

const styles = StyleSheet.create({});

export default memo(BottomTabNavigator);

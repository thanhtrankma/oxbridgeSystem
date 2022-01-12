import React, {memo, useState, useCallback, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {HeaderTop2, BtnActionHome} from 'components';
import {Colors} from 'assets';
import {Icon} from 'react-native-elements';
import {useTranslation} from 'utils';
import API from 'api';

const Home = ({navigation}) => {
  const {teacher, student, parent, home, edu} = useTranslation();
  const onPressTeacher = () => {
    navigation.navigate('Teacher');
  };
  const onPressStudent = () => {
    navigation.navigate('Student');
  };
  const onPressParent = () => {
    navigation.navigate('Parent');
  };
  const onPressEdu = () => {
    navigation.navigate('Edu');
  };
  useEffect(() => {
    API.project
      .getMatrix()
      .then(res => {
        console.log('res', res);
      })
      .catch(e => {
        console.log('e', e);
      });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <HeaderTop2 titleHeader={home} />

      <ScrollView
        contentContainerStyle={styles.modalScrollView}
        scrollEventThrottle={16}>
        <View style={styles.containerContent}>
          <BtnActionHome
            titleHeader={teacher}
            iconType="fontisto"
            iconName="persons"
            iconSize={50}
            iconColor={Colors.white}
            iconBg={Colors.leafyGreen}
            onClick={onPressTeacher}
          />
          <BtnActionHome
            titleHeader={student}
            iconType="entypo"
            iconName="users"
            iconSize={50}
            iconColor={Colors.white}
            iconBg={Colors.lavender}
            onClick={onPressStudent}
          />
          <BtnActionHome
            titleHeader={parent}
            iconType="font-awesome"
            iconName="users"
            iconSize={50}
            iconColor={Colors.white}
            iconBg={Colors.tangerine}
            onClick={onPressParent}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  containerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  modalScrollView: {
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 15,
  },
  boxLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
    paddingLeft: 15,
    paddingVertical: 10,
  },
  boxRight: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 15,
    paddingVertical: 10,
  },
  textHeaderLeft: {
    fontSize: 15,
    color: Colors.uglyBlue,
  },
  textHeaderRight: {
    fontSize: 15,
    color: Colors.tangerine,
  },
});
export default memo(Home);

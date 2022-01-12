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
import {Agenda} from 'react-native-calendars';
import API from 'api';
import {Card, Avatar} from 'react-native-paper';

const Home = ({navigation}) => {
  const {teacher, student, parent, home, yourSchedule, seeMore} = useTranslation();
  const onPressTeacher = () => {
    navigation.navigate('Teacher');
  };
  const onPressStudent = () => {
    navigation.navigate('Student');
  };
  const onPressParent = () => {
    navigation.navigate('Parent');
  };
  const onPressSchedulePage = () => {
    navigation.navigate('ScheduleTeacher');
  };
  useEffect(() => {
    // API.project
    //   .getMatrix()
    //   .then(res => {
    //     console.log('res', res);
    //   })
    //   .catch(e => {
    //     console.log('e', e);
    //   });
  }, []);
  const renderItem = item => {
    return (
      <TouchableOpacity style={{marginRight: 10, marginTop: 17}}>
        <Card>
          <Card.Content>
            <View style={styles.itemWrapper}>
              <Text>{item.name}</Text>
              <Avatar.Text label="AT" />
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <HeaderTop2 titleHeader={home + ' T'} />

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
      <View style={styles.labelTextWrapper}>
        <Text style={styles.labelTextLeft}>{`${yourSchedule}:`}</Text>
        <TouchableOpacity
          style={{marginRight: 10}}
          onPress={onPressSchedulePage}>
          <Text style={styles.labelTextRight}>{`${seeMore} >`}</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1}}>
        <Agenda
          items={{
            '2021-12-06': [{name: 'item 1 - any js object'}],
            '2021-12-07': [{name: 'item 2 - any js object', height: 80}],
            '2021-12-08': [],
            '2021-12-09': [
              {name: 'item 3 - any js object'},
              {name: 'any js object'},
            ],
            '2021-12-10': [{name: 'item 3 - any js object'}],
            '2021-12-13': [{name: 'item 3 - any js object'}],
          }}
          selected={'2021-12-09'}
          minDate={'2021-12-06'}
          maxDate={'2021-12-12'}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  labelTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelTextLeft: {fontSize: 22, marginLeft: 10, color: Colors.darkGrey},
  labelTextRight: {fontSize: 16, color: Colors.niceBlue},
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  containerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 40,
    marginTop: 20,
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
  itemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
export default memo(Home);

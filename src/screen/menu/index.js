import React, {memo, useState, useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {HeaderTop2} from 'components';
import {Colors} from 'assets';
import {Icon} from 'react-native-elements';

const Demand = ({navigation}) => {
  const actionBtnLeft = () => {
    navigation.goBack();
  };
  const actionBtnRight = () => {
    console.log('thanh');
  };
  const componentBtnLeft = () => {
    return (
      <TouchableOpacity onPress={actionBtnLeft} style={styles.boxLeft}>
        <Icon
          type="feather"
          name="chevron-left"
          size={25}
          color={Colors.slateGrey}
        />
      </TouchableOpacity>
    );
  };
  const componentBtnRight = () => {
    return (
      <TouchableOpacity onPress={actionBtnRight} style={styles.boxRight}>
        <Text style={styles.textHeaderRight}>Bỏ lọc</Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <HeaderTop2 titleHeader="Menu" />

      <ScrollView
        contentContainerStyle={styles.modalScrollView}
        scrollEventThrottle={16}>
        <View style={styles.boxSearchMain}>
          <Text>Thanh Tran</Text>
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
  boxSearchMain: {
    flexDirection: 'row',
    alignItems: 'center',
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
export default memo(Demand);

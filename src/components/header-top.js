import React from 'react';
import {Text, View, StyleSheet, SafeAreaView} from 'react-native';
import {Colors} from 'assets';

const HeaderTop = ({
  titleHeader,
  btnLeft,
  btnRight,
  componentBtnLeft,
  componentBtnRight,
}) => {
  return (
    <SafeAreaView style={{backgroundColor: Colors.whiteThree}}>
      <View style={styles.container}>
        {btnLeft ? componentBtnLeft() : <View style={styles.rightEmpty} />}

        <View style={styles.boxCenter}>
          <Text numberOfLines={1} style={styles.styleFontBoxCenter}>
            {titleHeader}
          </Text>
        </View>
        {btnRight ? componentBtnRight() : <View style={styles.rightEmpty} />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.whiteThree,
    zIndex: 10,
    height: 50,
    borderBottomWidth: 0.5,
    borderColor: Colors.cloudyBlue,
  },
  boxCenter: {
    flex: 5,
  },
  rightEmpty: {
    flex: 1,
  },
  styleFontBoxCenter: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.slateGrey,
  },
});

export default HeaderTop;

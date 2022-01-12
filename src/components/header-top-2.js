import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {Colors} from 'assets';

const HeaderTop2 = ({
  titleHeader,
  btnGoBack,
  btnRight,
  btnRightOptions,
  goBack,
}) => {
  return (
    <SafeAreaView style={{backgroundColor: Colors.whiteThree}}>
      <View style={styles.container}>
        {btnGoBack ? (
          <TouchableOpacity style={styles.boxLeft} onPress={goBack}>
            <Icon
              type="feather"
              name="chevron-left"
              size={25}
              color={Colors.slateGrey}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.space} />
        )}

        <View style={styles.boxCenter}>
          <Text numberOfLines={1} style={styles.styleFontBoxCenter}>
            {titleHeader}
          </Text>
        </View>
        {btnRight ? (
          <TouchableOpacity
            onPress={btnRightOptions.onClickBtnRight}
            style={styles.boxRight}>
            <Icon
              name={btnRightOptions.iconName}
              size={btnRightOptions.size}
              color={btnRightOptions.colorIcon}
              type={btnRightOptions.typeIcon}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.space} />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  space: {
    flex: 1,
    paddingLeft: 15,
  },
  buttonWrapper: {
    display: 'flex',
  },
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
  boxLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
    paddingLeft: 15,
    paddingVertical: 10,
  },
  styleFontBoxLeft: {
    fontSize: 17,
    marginLeft: 5,
    fontWeight: 'normal',
    color: Colors.slateGrey,
  },
  boxCenter: {
    flex: 5,
  },
  styleFontBoxCenter: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.slateGrey,
  },
  boxRight: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 15,
    paddingVertical: 10,
  },
  customBoxColLeftIcon: {
    borderWidth: 0,
  },
  customBoxColRightIcon: {
    borderWidth: 0,
  },
  customBoxColCenterIcon: {
    borderWidth: 0,
    marginBottom: 0,
  },
  customStyleMainBlockinp: {
    backgroundColor: Colors.whiteThree,
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 5,
    borderWidth: 0.5,
    borderRadius: 2,
    borderColor: Colors.cloudyBlue,
  },
  inputStyle: {
    margin: 15,
    borderWidth: 0.5,
    borderColor: Colors.cloudyBlue,
    height: 35,
    borderRadius: 5,
  },
  borderStyle: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 15,
  },
});

export default HeaderTop2;

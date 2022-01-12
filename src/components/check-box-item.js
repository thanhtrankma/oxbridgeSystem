import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {Icon} from 'react-native-elements';
import {Colors} from 'assets';

const CheckBoxItem = ({isSelected, separator, icon, title, ...restProps}) => {
  return (
    <View style={styles.container}>
      {icon && (
        <Icon
          style={styles.iconLeft}
          name={icon}
          type="material"
          size={25}
          color={Colors.coolGreyTwo}
        />
      )}
      <TouchableOpacity
        style={[styles.buttonStyle, separator && styles.separator]}
        {...restProps}>
        <Text style={styles.titleStyle}>{title}</Text>
        {isSelected ? (
          <Icon
            containerStyle={styles.iconNextButton}
            name="check"
            type="material"
            size={18}
            color={Colors.slateGrey}
          />
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    width: '100%',
  },
  buttonStyle: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  separator: {borderBottomWidth: 0.5, borderBottomColor: Colors.cloudyBlue},
  titleStyle: {color: Colors.darkGrey, fontSize: 15},
  iconNextButton: {marginLeft: 0},
});

export default CheckBoxItem;

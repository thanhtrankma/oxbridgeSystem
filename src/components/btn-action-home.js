import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from 'assets';
import {Icon} from 'react-native-elements';

const BtnAction = ({
  titleHeader,
  iconType,
  iconName,
  iconSize,
  iconColor,
  iconBg,
  onClick,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onClick}>
      <View style={[styles.containerIcon, {backgroundColor: iconBg}]}>
        <Icon
          type={iconType}
          name={iconName}
          size={iconSize}
          color={iconColor}
        />
      </View>
      <Text numberOfLines={1} style={styles.styleFontBoxCenter}>
        {titleHeader}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  containerIcon: {
    borderRadius: 15,
    padding: 10,
    marginBottom: 5,
  },
  styleFontBoxCenter: {
    textAlign: 'center',
    fontSize: 15,
    color: Colors.slateGrey,
  },
});

export default BtnAction;

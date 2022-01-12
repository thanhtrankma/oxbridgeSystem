import _ from 'lodash';
import React from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import {Colors} from 'assets';

const Input = ({
  notBoldTitle,
  label,
  errors,
  maxLength,
  subLabel,
  placeholder,
  required,
  styleContainer,
  value,
  onChangeInput,
  onTouchStart,
  onBlur,
  inputStyleProp,
  disable,
  unLimited,
  ...restProps
}) => {
  const count = (maxLength || 0) - (_.size(value) || 0);

  return (
    <View style={[styles.containerStyle, styleContainer || {}]}>
      <View style={styles.labelStyle}>
        <Text style={[styles.label, notBoldTitle ? styles.labelNotBold : {}]}>
          {label + ' '}
          {required && (
            <Text style={[styles.requiredIcon, styles.marginLeft4]}>*</Text>
          )}
        </Text>
      </View>

      <TextInput
        maxLength={maxLength}
        placeholder={placeholder}
        placeholderTextColor="#b8bbc8"
        style={[
          styles.inputStyle,
          inputStyleProp || {},
          errors ? styles.inputStyleError : {},
          disable ? styles.inputStyleDisable : {},
        ]}
        editable={!disable}
        value={value}
        onChangeText={onChangeInput}
        onTouchStart={onTouchStart}
        onBlur={onBlur}
        {...restProps}
      />
      {!unLimited && (
        <View style={styles.countWrapper}>
          <Text style={[styles.count, !count && styles.requiredIcon]}>
            {count}
          </Text>
        </View>
      )}
      {errors &&
        _.map(errors, error => <Text style={styles.errorText}>{error}</Text>)}
    </View>
  );
};

const styles = StyleSheet.create({
  inputStyleError: {
    borderColor: Colors.paleRed,
  },
  inputStyleDisable: {
    borderColor: Colors.cloudyBlue,
    backgroundColor: Colors.cloudyBlue,
  },
  countWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 5,
  },
  count: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    fontSize: 13,
    color: Colors.darkGrey,
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.darkGrey,
  },
  labelNotBold: {
    fontWeight: 'normal',
  },
  subLabel: {
    color: Colors.slateGrey,
    fontSize: 13,
    marginBottom: 10,
    fontStyle: 'italic',
  },
  containerStyle: {paddingHorizontal: 0, paddingVertical: 0},
  inputStyle: {
    color: Colors.darkGrey,
    marginBottom: 1,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingTop: 8,
    paddingBottom: 15,
    display: 'flex',
    textAlignVertical: 'top',
    borderColor: Colors.cloudyBlue,
    borderRadius: 2,
    height: 100,
    fontSize: 15,
  },
  requiredIcon: {
    color: 'red',
  },
  marginLeft4: {
    marginLeft: 4,
  },

  errorText: {
    color: Colors.paleRed,
    fontSize: 13,
    fontWeight: 'normal',
    marginTop: -2,
  },
  labelRejectActive: {
    paddingVertical: 3,
    backgroundColor: Colors.lavender,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2.8,
    elevation: 3,
    marginBottom: 6,
    marginTop: 10,
  },
  labelRejectNonActive: {
    backgroundColor: Colors.veryLightPurple,
    marginBottom: 6,
    marginTop: 10,
  },
  labelWrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  labelStyle: {
    marginBottom: 6,
    marginTop: 10,
  },
});

export default Input;

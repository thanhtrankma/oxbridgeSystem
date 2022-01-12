import _ from 'lodash';
import React, {useCallback} from 'react';
import {StyleSheet, Platform, Text, View} from 'react-native';
import {Input as RNInput, Tooltip, Icon} from 'react-native-elements';
import {Colors} from 'assets';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Input = ({
  label,
  errors,
  subLabel,
  placeholder,
  required,
  isCount,
  value,
  disable,
  valueCount,
  renderRight,
  maxCharactor,
  tooltip,
  isBackgroundTitleReject,
  acitiveFeildReject,
  showModalRejectNote,
  feildReject,
  rejectNoteToApi,
  ...restProps
}) => {
  const count = (maxCharactor || 0) - (valueCount || 0);
  const onShowModalRejectNote = useCallback(() => {
    setTimeout(() => {
      showModalRejectNote(feildReject, rejectNoteToApi);
    }, 500);
  }, [feildReject, rejectNoteToApi, showModalRejectNote]);

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        {isBackgroundTitleReject ? (
          <TouchableOpacity
            onPress={() => {
              onShowModalRejectNote();
            }}>
            <View style={styles.labelWrapper}>
              <Text
                style={[
                  styles.label,
                  acitiveFeildReject
                    ? styles.labelActiveFeildReact
                    : styles.labelFeildReact,
                ]}>
                {label}
                {required ? <Text style={styles.requiredIcon}> *</Text> : ''}
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <Text style={styles.label}>
            {label} {required ? <Text style={styles.requiredIcon}>*</Text> : ''}
          </Text>
        )}

        {tooltip && (
          <Tooltip
            height={80}
            popover={<Text style={styles.tooltipText}>{tooltip}</Text>}>
            <Icon
              name="info"
              type="feather"
              size={15}
              color={Colors.uglyBlue}
            />
          </Tooltip>
        )}
      </View>
      {subLabel && <Text style={styles.subLabel}>{subLabel}</Text>}
      <View>
        <RNInput
          placeholder={placeholder}
          placeholderTextColor={Colors.coolGrey}
          inputContainerStyle={[
            styles.inputContainerStyle,
            disable ? styles.disabledInputStyle : {},
          ]}
          errorStyle={styles.errorStyle}
          inputStyle={[styles.inputStyle, errors ? styles.inputStyleError : {}]}
          maxLength={maxCharactor || 1000}
          containerStyle={styles.containerStyle}
          disabledInputStyle={styles.disabledInputStyle}
          value={value}
          disabled={disable}
          {...restProps}
        />
        <View style={styles.renderRight}>{renderRight}</View>
        {errors && errors.fromApi ? (
          <Text style={styles.errorText}>{errors.fromApi}</Text>
        ) : (
          _.map(errors, error => <Text style={styles.errorText}>{error}</Text>)
        )}
        {isCount && (
          <Text
            style={[
              styles.counter,
              {color: !count ? Colors.paleRed : Colors.slateGrey},
            ]}>
            {count}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tooltipText: {
    color: Colors.white,
  },
  container: {flex: 1},
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {color: Colors.darkGrey, fontSize: 15, marginVertical: 8},
  subLabel: {
    color: Colors.slateGrey,
    fontSize: 13,
    marginBottom: 5,
    fontStyle: 'italic',
  },
  containerStyle: {paddingHorizontal: 0, paddingVertical: 0},
  inputContainerStyle: {
    borderBottomWidth: 0,
  },
  errorStyle: {margin: 2},
  inputStyle: {
    color: Colors.darkGrey,
    marginVertical: 0,
    padding: 10,
    fontSize: 15,
    borderWidth: 1,
    borderColor: Colors.cloudyBlue,
    borderRadius: 2,
    height: 41,
  },
  inputStyleError: {
    borderColor: Colors.paleRed,
  },
  errorText: {
    color: Colors.paleRed,
    fontSize: 11,
    fontWeight: 'normal',
    bottom: 1,
    left: 0,
    position: 'absolute',
  },
  renderRight: {
    position: 'absolute',
    right: 10,
    top: 12,
  },
  requiredIcon: {
    color: Colors.paleRed,
  },
  counter: {bottom: -1, right: 0, position: 'absolute'},
  disabledInputStyle: {
    opacity: 1,
    color: Colors.slateGrey,
    backgroundColor: Colors.cloudyBlue,
  },
  labelActiveFeildReact: {
    backgroundColor: '#db9aec',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2.8,

    elevation: 3,
  },
  labelFeildReact: {backgroundColor: '#f3e0f8'},
  labelWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Input;

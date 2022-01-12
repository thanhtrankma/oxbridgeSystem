import _ from 'lodash';
import React, {useCallback, useRef} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {Colors} from 'assets';
import {useScrollToTop} from '@react-navigation/native';

const Select = (
  {
    onClick,
    label,
    value,
    disable,
    subLabel,
    errors,
    buttonTitle,
    required,
    selectTitleStyle,
    hideIcon,
    boldTitle,
    isBackgroundTitleReject,
    acitiveFeildReject,
    showModalRejectNote,
    feildReject,
    rejectNoteToApi,
    ...restProps
  },
  ref,
) => {
  let refSelectInp = useRef(null);
  useScrollToTop(refSelectInp);
  const onShowModalRejectNote = useCallback(() => {
    setTimeout(() => {
      showModalRejectNote(feildReject, rejectNoteToApi, refSelectInp);
    }, 500);
  }, [feildReject, rejectNoteToApi, showModalRejectNote, refSelectInp]);

  return (
    <View style={styles.container}>
      {isBackgroundTitleReject ? (
        <View style={styles.labelWrapper} ref={refSelectInp}>
          <View style={styles.labelContent}>
            <TouchableOpacity
              onPress={() => {
                onShowModalRejectNote();
              }}>
              <View style={styles.labelInner}>
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
          </View>
        </View>
      ) : (
        <Text style={[styles.label, boldTitle ? styles.labelBold : '']}>
          {label} {required ? <Text style={styles.requiredIcon}>*</Text> : ''}
        </Text>
      )}
      {subLabel && <Text style={styles.subLabel}>{subLabel}</Text>}
      <TouchableOpacity
        onPress={disable ? null : onClick}
        style={[
          styles.buttonStyle,
          errors ? styles.buttonStyleError : {},
          disable ? styles.disabledInputStyle : {},
        ]}
        {...restProps}>
        <Text
          style={[
            styles.titleStyle,
            selectTitleStyle,
            disable ? styles.disabledValueStyle : {},
          ]}>
          {buttonTitle}
        </Text>
        {!hideIcon ? (
          <Icon
            name="angle-down"
            type="font-awesome"
            size={20}
            color={Colors.slateGrey}
          />
        ) : null}
      </TouchableOpacity>
      {errors && errors.fromApi ? (
        <Text style={styles.errorText}>{errors.fromApi}</Text>
      ) : (
        _.map(errors, error => <Text style={styles.errorText}>{error}</Text>)
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {color: Colors.darkGrey, fontSize: 15, marginVertical: 8},
  labelWrapper: {flex: 5, flexWrap: 'wrap'},
  labelContent: {flex: 1, width: 'auto'},
  labelInner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelBold: {fontWeight: 'bold'},
  subLabel: {
    color: Colors.slateGrey,
    fontSize: 13,
    marginBottom: 5,
    fontStyle: 'italic',
  },
  buttonStyle: {
    height: 41,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: Colors.cloudyBlue,
    backgroundColor: 'transparent',
    marginBottom: 18,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  buttonStyleError: {
    borderColor: Colors.paleRed,
  },
  titleStyle: {
    color: Colors.coolGrey,
    fontSize: 15,
    fontWeight: 'normal',
    flex: 1,
  },
  requiredIcon: {
    color: 'red',
  },
  errorText: {
    color: Colors.paleRed,
    fontSize: 11,
    fontWeight: 'normal',
    marginTop: -15,
  },
  disabledInputStyle: {
    backgroundColor: Colors.cloudyBlue,
  },
  disabledValueStyle: {
    color: Colors.slateGrey,
  },
  labelActiveFeildReact: {
    backgroundColor: '#db9aec',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2.8,

    elevation: 3,
  },
  labelFeildReact: {backgroundColor: '#f3e0f8'},
});

export default Select;

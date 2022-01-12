import React, {memo, useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {Colors} from 'assets';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {useTranslation} from 'utils';
// import API from 'api';
// import {useDispatch} from 'react-redux';
// import {actions} from 'app-redux';
import {showToastError} from 'utils';
// import uuid from 'react-native-uuid';
// import messaging from '@react-native-firebase/messaging';
import {getDeviceName, getDevice} from 'react-native-device-info';

const COUNT_DOWN_OTP = 120;
const OTP = ({
  navigation,
  actionModalRight,
  onCloseDialog,
  infoValidated,
  ...resProps
}) => {
  const {pleaseReadMessage, second, wrongOtp, verify, resendCode} =
    useTranslation();
  const [reverseCount, setReverseCount] = useState(COUNT_DOWN_OTP);
  const [code, setCode] = useState('');
  const [err, setErr] = useState(false);
  // const dispatch = useDispatch();

  const btnRight = useCallback(() => {
    if (!code) {
      return;
    }
    actionModalRight();
    const body = {...infoValidated, otp: code};
    console.log(body);
    setErr(true);
    setTimeout(() => {
      setErr(false);
    }, 1000);
  }, [actionModalRight, code, infoValidated]);
  const onCodeFilled = useCallback(value => {
    setCode(value);
  }, []);
  useEffect(() => {
    const myInterval = setInterval(() => {
      reverseCount > 0
        ? setReverseCount(reverseCount - 1)
        : clearInterval(myInterval);
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  const resendOtp = useCallback(() => {
    //call resend
    console.log(infoValidated);
    // API.agent.sendOtp(infoValidated).then(() => {
    setReverseCount(COUNT_DOWN_OTP);
    // });
  }, [infoValidated]);

  return (
    <>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={[styles.container]}>
          <View style={styles.modal}>
            <View style={styles.imageWrapper}>
              <Icon
                type="feather"
                name="mail"
                size={46}
                color={Colors.tangerine}
              />
            </View>
            <TouchableOpacity style={styles.iconClose} onPress={onCloseDialog}>
              <Icon
                type="ionicon"
                name="close"
                size={20}
                color={Colors.coolGrey}
              />
            </TouchableOpacity>
            <View style={styles.row}>
              <Text style={styles.contentHeader} numberOfLines={4}>
                {pleaseReadMessage}
                {reverseCount}
                {second}
              </Text>
            </View>
            <View style={styles.wrapperErr}>
              {err ? (
                <Text style={styles.textErr}>{wrongOtp}</Text>
              ) : (
                <View style={styles.errEmpty} />
              )}
            </View>
            <View style={styles.otpWrapper}>
              <OTPInputView
                style={styles.styleOtpInput}
                pinCount={6}
                // code="123456"
                autoFocusOnLoad
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled={value => onCodeFilled(value)}
              />
            </View>
            <View style={styles.boxBtnSubmit}>
              <TouchableOpacity style={styles.btnConfirm} onPress={btnRight}>
                <TouchableOpacity
                  onPress={btnRight}
                  style={styles.styleBtnAction}>
                  <Text style={styles.textBtnRight}>{verify}</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
            <View style={styles.boxResend}>
              <TouchableOpacity onPress={resendOtp} style={styles.btnResend}>
                <Text style={styles.textResend}>{resendCode}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};
const styles = StyleSheet.create({
  wrapperErr: {alignItems: 'center', paddingTop: 10},
  errEmpty: {height: 16},
  textErr: {
    fontSize: 13,
    color: Colors.paleRed,
  },
  imageWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  otpWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  row: {
    paddingTop: 25,
    paddingBottom: 10,
    paddingHorizontal: 33,
  },
  titleTop: {
    fontSize: 15,
    color: Colors.darkGrey,
    lineHeight: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contentHeader: {
    fontSize: 15,
    lineHeight: 25,
    color: Colors.charcoalGrey,
    textAlign: 'center',
  },
  boxBtnSubmit: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  boxResend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
    marginTop: 10,
  },
  btnConfirm: {
    width: '90%',
    backgroundColor: Colors.tangerine,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 2,
  },
  btnResend: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textResend: {
    color: Colors.coolGreyTwo,
    textDecorationLine: 'underline',
    fontSize: 15,
  },
  textBtnRight: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 15,
  },
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
  inputContainerStyle: {
    borderBottomWidth: 0,
  },
  inputWrapper: {
    marginHorizontal: 10,
  },
  errorText: {
    color: Colors.paleRed,
    fontSize: 11,
    fontWeight: 'normal',
    bottom: 5,
    left: 0,
    position: 'absolute',
    marginLeft: 10,
  },

  underlineStyleBase: {
    width: 30,
    height: 25,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: Colors.charcoalGrey,
    color: Colors.charcoalGrey,
  },

  underlineStyleHighLighted: {
    borderColor: Colors.tangerine,
  },
  styleOtpInput: {
    height: 100,
    width: '80%',
  },
  iconClose: {position: 'absolute', top: 15, right: 15},
});
export default memo(OTP);

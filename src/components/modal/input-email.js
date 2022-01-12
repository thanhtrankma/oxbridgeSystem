import React, {memo, useState, useCallback, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {Colors} from 'assets';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
import {Input} from 'components';
import {useTranslation} from 'utils';

const InputEmail = ({
  titleTop,
  textBtnLeft,
  textBtnRight,
  actionModalLeft,
  actionModalRight,
}) => {
  const {wrongValidEmail, labelEmail, placeholderEmail} = useTranslation();
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState(null);
  const validateEmail = text => {
    if (text.length === 0) {
      return true;
    }
    var re = /^[a-z0-9][a-z0-9_\\.]{5,}@[a-z0-9]{2,}(.[a-z0-9]{2,4}){1,2}$/;
    return re.test(String(text).toLowerCase());
  };

  useEffect(() => {
    const interval = setInterval(() => {
      validateEmail(email)
        ? setErrorEmail(null)
        : setErrorEmail([wrongValidEmail]);
    }, 1000);
    return () => clearInterval(interval);
  }, [email, wrongValidEmail]);
  const changeEmail = text => {
    setEmail(text);
  };
  const onDone = useCallback(() => {
    if (email === '') {
      validateEmail(email);
      return;
    }
    if (errorEmail) {
      return;
    }
    const body = {
      email: email || null,
    };
    actionModalRight();
    console.log('body', body);
  }, [actionModalRight, email, errorEmail]);
  return (
    <>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={[styles.container]}>
          <View style={styles.modal}>
            <View style={styles.row}>
              {titleTop && <Text style={styles.titleTop}>{titleTop}</Text>}
              <View style={{marginTop: 40}}>
                <Input
                  errors={errorEmail}
                  label={labelEmail}
                  placeholder={placeholderEmail}
                  keyboardType="email-address"
                  onChangeText={changeEmail}
                  value={email}
                />
              </View>
            </View>
            <View style={styles.boxBtnSubmit}>
              <TouchableOpacity
                style={styles.btnClose}
                onPress={actionModalLeft}>
                <TouchableOpacity
                  onPress={actionModalLeft}
                  style={styles.styleBtnAction}>
                  <Text style={styles.textBtnLeft}>{textBtnLeft}</Text>
                </TouchableOpacity>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnConfirm}
                onPress={actionModalRight}>
                <TouchableOpacity
                  onPress={onDone}
                  style={styles.styleBtnAction}>
                  <Text style={styles.textBtnRight}>{textBtnRight}</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    backgroundColor: '#24242699',
  },
  modal: {
    width: '75%',
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
    paddingVertical: 25,
    paddingHorizontal: 10,
  },
  titleTop: {
    fontSize: 15,
    color: Colors.darkGrey,
    lineHeight: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contentHeader: {
    fontSize: 13,
    lineHeight: 20,
    marginTop: 10,
    color: Colors.darkGrey,
    textAlign: 'center',
  },
  boxBtnSubmit: {
    flexDirection: 'row',
    height: 46,
    justifyContent: 'space-between',
    borderTopWidth: 0.5,
    borderColor: Colors.cloudyBlue,
  },
  btnClose: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 0.5,
    borderColor: Colors.cloudyBlue,
  },
  btnConfirm: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.cloudyBlue,
  },
  textBtnRight: {
    color: Colors.tangerine,
    fontSize: 15,
    fontWeight: 'bold',
  },
  textBtnLeft: {
    color: Colors.slateGrey,
    fontSize: 15,
  },
});
export default memo(InputEmail);

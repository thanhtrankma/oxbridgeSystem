import React, {useCallback, useState} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Linking,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  DeviceEventEmitter,
} from 'react-native';
import {Images, Colors} from 'assets';
import {ActivityIndicator} from 'react-native';
import {showToastSuccess} from 'utils';
import {useTranslation} from '../context/LanguageContext';
import {InputEmailDialog, ModalOtp} from 'components';
import RNModal from 'react-native-modal';
import {storage} from 'utils';
import API from 'api';
import {AuthContext} from 'components';
const {auth, interceptor} = API;

const contactMail = 'thanhtran.kma@gmail.com';
const Login = ({navigation}) => {
  const {
    login,
    wrongLogin,
    username,
    usernameEmpty,
    password,
    passwordEmpty,
    questionRegister,
    register,
    contactHelp,
    noInformation,
    version,
  } = useTranslation();
  const [valueUserName, onChangeUserName] = useState('test01@gmail.com');
  const [valuePassword, onChangePassword] = useState('123456');
  const [isVeryfiUsername, setVeryfiUserName] = useState(false);
  const [isVeryfiPassword, setVeryfiPassword] = useState(false);
  const [isVeryfiUsAndPw, setVeryfiUsAndPw] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [inputEmailDialog, setInputEmailDialog] = useState(false);
  const {signIn} = React.useContext(AuthContext);
  const onCloseDialogOtp = () => {
    setIsVisibleModal(false);
  };
  const onCloseEmailDialog = () => {
    setInputEmailDialog(false);
  };

  const onHighLightAction = useCallback(() => {
    Linking.openURL(`mailto:${contactMail}`);
  }, []);

  const onSubmitLogin = useCallback(() => {
    setLoading(true);
    if (valueUserName.length === 0) {
      setVeryfiUserName(true);
      setVeryfiUsAndPw(false);
    }
    if (valuePassword.length === 0) {
      setVeryfiPassword(true);
      setVeryfiUsAndPw(false);
    }
    if (valuePassword) {
      setVeryfiPassword(false);
      setVeryfiUsAndPw(false);
    }
    if (valueUserName) {
      setVeryfiUserName(false);
      setVeryfiUsAndPw(false);
    } else {
      if (!valuePassword && !valueUserName) {
        setVeryfiPassword(true);
        setVeryfiUserName(true);
        setVeryfiUsAndPw(false);
      }
    }
    const bodyAuth = {
      email: valueUserName,
      password: valuePassword,
    };
    auth
      .authLogin(bodyAuth)
      .then(res => {
        setLoading(false);
        signIn(res);
      })
      .catch(e => {
        setLoading(false);
        console.log('e', e);
        if (valuePassword && valueUserName) {
          setVeryfiUsAndPw(true);
        }
      })
      .finally(() => {
        // setLoading(false);
      });
    // setTimeout(() => {
    //   setLoading(false);
    // }, 1000);
  }, [valuePassword, valueUserName, signIn]);

  const goToRegisterScreen = () => {
    setInputEmailDialog(false);
    setIsVisibleModal(true);
  };
  const openEmailDialog = () => {
    setInputEmailDialog(true);
  };
  const handleOnPressOtp = useCallback(user => {
    console.log('callback');
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback
        style={{flex: 1}}
        onPress={() => Keyboard.dismiss()}
        accessible={false}>
        <View style={styles.boxMain}>
          <View style={styles.boxMainTop}>
            <TouchableOpacity style={styles.boxLogo}>
              <Image source={Images.oxAvt} style={styles.boxLogo} />
            </TouchableOpacity>

            <View style={styles.boxMainInp}>
              <View style={styles.boxErr}>
                {isVeryfiUsAndPw && (
                  <Text style={[styles.textErr, {position: 'relative'}]}>
                    {wrongLogin}
                  </Text>
                )}
              </View>
              <View style={styles.boxInp}>
                <TextInput
                  placeholder={username}
                  placeholderTextColor={Colors.cloudyBlue}
                  style={
                    isVeryfiUsername ? styles.styleInpWarning : styles.styleInp
                  }
                  blurOnSubmit={false}
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={valueUserName}
                  onChangeText={text => {
                    onChangeUserName(text);
                    setVeryfiUserName(false);
                    setVeryfiUsAndPw(false);
                  }}
                />
                {isVeryfiUsername && (
                  <Text style={styles.textErr}>{usernameEmpty}</Text>
                )}
              </View>
              <View style={styles.boxInp}>
                <TextInput
                  placeholder={password}
                  placeholderTextColor={Colors.cloudyBlue}
                  style={[
                    isVeryfiPassword ? styles.styleInpWarning : styles.styleInp,
                    {marginTop: 25},
                  ]}
                  secureTextEntry={true}
                  autoCapitalize="none"
                  multiline={false}
                  value={valuePassword}
                  onChangeText={text => {
                    onChangePassword(text);
                    setVeryfiPassword(false);
                    setVeryfiUsAndPw(false);
                  }}
                />
                {isVeryfiPassword && (
                  <Text style={styles.textErr}>{passwordEmpty}</Text>
                )}
              </View>
              <TouchableOpacity
                style={styles.styleBtn}
                onPress={() => {
                  Keyboard.dismiss();
                  onSubmitLogin();
                }}>
                <Text style={styles.titleBtn}>{login}</Text>
                {isLoading && (
                  <View style={styles.loadingWrapper}>
                    <View style={styles.loading}>
                      <ActivityIndicator color="#fff" />
                    </View>
                  </View>
                )}
              </TouchableOpacity>
              <View style={styles.registerNoteWrapper}>
                <TouchableOpacity onPress={openEmailDialog}>
                  <Text style={styles.registerNoteRight}>
                    {questionRegister}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View>
            <View style={styles.boxService}>
              <Text style={styles.textServiceLeft}>{contactHelp}</Text>
              <Text onPress={onHighLightAction} style={styles.textServiceRight}>
                {contactMail}
              </Text>
            </View>
            <Text style={styles.textVersion}>{version}1.0.0</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <RNModal
        isVisible={isVisibleModal || inputEmailDialog}
        animationIn="fadeIn"
        animationOut="fadeOut">
        {isVisibleModal && (
          <ModalOtp
            actionModalRight={handleOnPressOtp}
            onCloseDialog={onCloseDialogOtp}
            infoValidated={{name: 'Thanh Tran', email: 'thanhtran.kma'}}
            navigation={navigation}
          />
        )}
        {inputEmailDialog && (
          <InputEmailDialog
            titleTop={'Nhập email'}
            navigation={navigation}
            textBtnLeft={'Hủy'}
            textBtnRight={'Xác nhận'}
            actionModalLeft={onCloseEmailDialog}
            actionModalRight={goToRegisterScreen}
          />
        )}
      </RNModal>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  boxErrNotAgent: {
    height: 70,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  boxErrNotAgentInner: {
    alignItems: 'center',
  },
  lineErr1: {
    marginBottom: 5,
    color: Colors.paleRed,
    fontSize: 13,
  },
  lineErr2: {
    color: Colors.paleRed,
    fontSize: 13,
  },
  lineErr3: {
    color: Colors.tangerine,
    fontSize: 13,
    textDecorationLine: 'underline',
  },
  line2Wrp: {
    flexDirection: 'row',
  },
  loadingWrapper: {
    width: '38%',
    height: '100%',
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    position: 'absolute',
    left: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  boxMain: {
    marginTop: 60,
    alignItems: 'center',
    marginHorizontal: 30,
    flex: 1,
    justifyContent: 'space-between',
  },
  boxMainTop: {
    alignItems: 'center',
  },
  boxLogo: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
  },
  titleScreen: {
    color: '#61657e',
    fontSize: 15,
    lineHeight: 30,
    fontWeight: 'bold',
  },
  boxMainInp: {
    marginTop: 50,
    position: 'relative',
  },
  styleInp: {
    borderWidth: 1,
    height: 40,
    minWidth: '100%',
    borderColor: Colors.cloudyBlue,
    borderRadius: 2,
    // lineHeight: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 15,
  },
  styleInpWarning: {
    borderWidth: 1,
    height: 40,
    minWidth: '100%',
    borderColor: Colors.paleRed,
    borderRadius: 2,
    // lineHeight: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 15,
  },
  styleBtn: {
    alignItems: 'center',
    height: 40,
    backgroundColor: Colors.tangerine,
    marginTop: 40,
    justifyContent: 'center',
    borderRadius: 2,
    flexDirection: 'row',
    position: 'relative',
  },
  titleBtn: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#fff',
    lineHeight: 30,
  },
  boxService: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  textServiceLeft: {
    fontSize: 12,
    color: Colors.slateGrey,
  },
  textServiceRight: {
    fontSize: 12,
    color: Colors.uglyBlue,
  },
  boxInp: {
    position: 'relative',
  },
  textErr: {
    fontSize: 13,
    color: Colors.paleRed,
    position: 'absolute',
    bottom: -17,
    left: 0,
  },
  boxErr: {
    position: 'absolute',
    top: -55,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  textVersion: {
    fontSize: 13,
    lineHeight: 20,
    color: Colors.coolGreyTwo,
    textAlign: 'center',
  },
  registerNoteWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerNoteLeft: {
    fontSize: 13,
    color: Colors.slateGrey,
  },
  registerNoteRight: {
    fontSize: 13,
    color: Colors.uglyBlue,
    fontWeight: '500',
  },
  titleWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
});
export default Login;

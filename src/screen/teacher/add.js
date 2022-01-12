import _, {isEmpty} from 'lodash';
import React, {memo, useState, useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  Modal,
  DeviceEventEmitter,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {HeaderTop, Input, NoticationDialog, Select} from 'components';
import {CheckBox} from 'react-native-elements';
import {Colors, StaticData} from 'assets';
// import types from '../../type';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import api from 'api';
import moment from 'moment';
import {
  autoFormatDate,
  useTranslation,
  showToastSuccess,
  showToastError,
} from 'utils';
import {OneSelect, MultipleSelect} from '../modal';
import API from 'api';

const CustomerAddScreen = ({navigation}) => {
  const {
    man,
    female,
    addNewTeacher,
    save,
    cancel,
    done,
    editInformation,
    wrongValidPhone,
    wrongValidEmail,
    wrongValidIdentity,
    wrongValidDob,
    emptyFullname,
    placeholderFullname,
    labelFullname,
    placeholderPhone,
    labelPhone,
    labelEmail,
    placeholderEmail,
    education,
    labelDob,
    labelIdentity,
    placeholderIdentity,
    labelAddress,
    placeholderAddress,
    cancelEdit,
    cancelCreate,
    back,
    qizCancelEdit,
    qizCancelCreate,
    pickOne,
    contractType,
    nationality,
    position,
    notEmpty,
    password,
    pleaseInput,
    success,
  } = useTranslation();
  const route = useRoute();
  const action = route?.params?.action || 'ADD';
  const optionsNavigate = route?.params;
  const titleHeader = action === 'EDIT' ? editInformation : addNewTeacher;
  const customerDetail = route?.params?.customerDetail || {};
  const [dialogVisible, setDialogVisible] = useState(false);
  const [gender, setGender] = useState(customerDetail?.sex || null);
  const [fullname, setFullname] = useState(customerDetail?.fullName || '');
  const [phone, setPhone] = useState(customerDetail?.phone || '');
  const [email, setEmail] = useState(customerDetail?.email || '');
  const [passwordText, setPasswordText] = useState('');
  const [typeAction, setTypeAction] = useState('CUSTOMER');
  const [dob, setDob] = useState(
    customerDetail?.birthday
      ? moment(customerDetail.birthday).format('DD / MM / YYYY')
      : '',
  );
  const [identity, setIdentity] = useState(customerDetail?.identity || '');
  const [address, setAddress] = useState(customerDetail?.address || '');
  const [educationText, setEducationText] = useState('');

  const [errorFullname, setErrorFullname] = useState(null);
  const [errorPhone, setErrorPhone] = useState(null);
  const [errorPasswordText, setErrorPasswordText] = useState(null);
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorIdentity, setErrorIdentity] = useState(null);
  const [errorDob, setErrorDob] = useState(null);
  const customerTemp = {
    fullName: customerDetail?.fullName || '',
    phone: customerDetail?.phone || '',
  };
  const [customerFromContacts, setCustomerFromContacts] =
    useState(customerTemp);

  const validatePhone = text => {
    if (text.length === 0) {
      return true;
    }
    var re = /^(84|\\+84|0)([35789]|2[48])[0-9]{8}$/;
    return re.test(String(text));
  };

  useEffect(() => {
    setTypeAction(optionsNavigate?.type);
  }, [optionsNavigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      validatePhone(phone)
        ? setErrorPhone(null)
        : setErrorPhone([wrongValidPhone]);
    }, 1000);
    return () => clearInterval(interval);
  }, [phone, wrongValidPhone]);
  useEffect(() => {
    const interval = setInterval(() => {
      validateEmail(email)
        ? setErrorEmail(null)
        : setErrorEmail([wrongValidEmail]);
    }, 1000);
    return () => clearInterval(interval);
  }, [email, wrongValidEmail]);
  useEffect(() => {
    const interval = setInterval(() => {
      validateIdentity(identity)
        ? setErrorIdentity(null)
        : setErrorIdentity([wrongValidIdentity]);
    }, 1000);
    return () => clearInterval(interval);
  }, [identity, wrongValidIdentity]);
  const onChangeFullName = useCallback(
    text => {
      setFullname(text);
      setCustomerFromContacts({...customerFromContacts, fullname: text});
    },
    [customerFromContacts],
  );
  const changePhone = useCallback(
    text => {
      if (text.length > 10) {
        return;
      }
      setPhone(text);
      setCustomerFromContacts({...customerFromContacts, phone: text});
    },
    [customerFromContacts],
  );
  const validateEmail = text => {
    if (text.length === 0) {
      return true;
    }
    var re = /^[a-z0-9][a-z0-9_\\.]{5,}@[a-z0-9]{2,}(.[a-z0-9]{2,4}){1,2}$/;
    return re.test(String(text).toLowerCase());
  };
  const validateIdentity = text => {
    if (text === '') {
      return true;
    }
    return text.length >= 9;
  };
  const changeEmail = text => {
    setEmail(text);
  };
  const changeDob = text => {
    setErrorDob(null);
    setDob(autoFormatDate(text));
  };
  const changeIdentity = text => {
    if (text.length > 12) {
      return;
    }
    setIdentity(text);
  };
  const changeAddress = text => {
    setAddress(text);
  };
  const changePasswordText = text => {
    setPasswordText(text);
  };
  const changeEducationText = text => {
    setEducationText(text);
  };

  const goBack = () => {
    navigation.goBack();
  };
  const actionModalLeft = () => {
    setDialogVisible(false);
  };
  const actionModalRight = () => {
    setDialogVisible(false);
    goBack();
  };
  const onCancel = () => {
    if (
      isEmpty(address) &&
      isEmpty(email) &&
      isEmpty(address) &&
      isEmpty(fullname) &&
      isEmpty(phone) &&
      isEmpty(gender) &&
      isEmpty(dob) &&
      isEmpty(identity)
    ) {
      goBack();
      return;
    }
    setDialogVisible(true);
  };
  const catchErrors = errors => {
    console.log('errors', errors);
    if (typeof errors === 'object') {
      setErrors(errors.errorField, errors.errorMessage);
      showToastError(errors.errorMessage);
    } else {
      errors.forEach(element => {
        setErrors(element.errorField, element.errorMessage);
        showToastError(element.errorMessage);
      });
    }
  };
  const setErrors = (field, message) => {
    switch (field) {
      case 'phone':
        setErrorPhone([message]);
        break;
      case 'email':
        setErrorEmail([message]);
        break;
      case 'identity':
        setErrorIdentity([message]);
        break;
      case 'fullName':
        setErrorFullname([message]);
        break;
      default:
        break;
    }
  };
  const onDone = () => {
    const convertDob = dob ? moment(dob, 'DD / MM / YYYY').format('x') : '';
    if (fullname === '') {
      setErrorFullname([emptyFullname]);
      return;
    }
    if (phone === '') {
      setErrorPhone([notEmpty]);
      return;
    }
    if (email === '') {
      setErrorEmail([notEmpty]);
      return;
    }
    if (identity === '') {
      setErrorIdentity([notEmpty]);
      return;
    }
    if (passwordText === '') {
      setErrorPasswordText([notEmpty]);
      return;
    }
    if (convertDob === 'Invalid date') {
      setErrorDob([wrongValidDob]);
      return;
    }
    if (errorEmail) {
      return;
    }
    const body = {
      address: address,
      email: email || null,
      password: passwordText || null,
      name: fullname,
      phone: phone || null,
      dob: convertDob,
      identity: identity || null,
      contractType: selectedContractType.code || null,
      nationality: selectedNationality.code || null,
      position: selectedPosition.code || null,
      education: educationText,
    };
    action === 'EDIT' ? onEdit(body) : onCreate(body);
  };

  const onCreate = body => {
    API.teacher
      .createTeacher(body)
      .then(res => {
        showToastSuccess(success);
        DeviceEventEmitter.emit('refreshListTeacher');
        goBack();
      })
      .catch(e => {
        console.log(e);
        showToastError(e);
      });
  };
  const onEdit = body => {
    console.log('body', body);
  };
  const componentBtnLeftHeader = () => {
    return (
      <TouchableOpacity onPress={onCancel} style={styles.boxLeft}>
        <Text style={styles.textHeaderLeft}>{cancel}</Text>
      </TouchableOpacity>
    );
  };
  const componentBtnRightHeader = () => {
    return (
      <TouchableOpacity onPress={onDone} style={styles.boxRight}>
        <Text style={styles.textHeaderRight}>{done}</Text>
      </TouchableOpacity>
    );
  };
  //contractType
  const [selectedContractType, setSelectedContractType] = useState({});
  const [errContractType, setErrContractType] = useState(null);
  const onModalSelectContractType = selectedItem => {
    setSelectedContractType(selectedItem);
  };
  const onSelectContractType = useCallback(() => {
    navigation.navigate('ModalScreen', {
      Screen: screenProps => <OneSelect {...screenProps} />,
      ScreenProps: {
        // handleSearchData: api.property.getAll,
        data: StaticData.ContractType.options,
        handleSelect: onModalSelectContractType,
        listSelected: selectedContractType,
        selectedId: selectedContractType.code,
        separator: true,
        modalTitle: pickOne,
      },
    });
  }, [selectedContractType, navigation, pickOne]);
  // nationality
  const [selectedNationality, setSelectedNationality] = useState({});
  const [errNationality, setErrNationality] = useState(null);
  const onModalSelectNationality = selectedItem => {
    setSelectedNationality(selectedItem);
  };
  const onSelectNationality = useCallback(() => {
    navigation.navigate('ModalScreen', {
      Screen: screenProps => <OneSelect {...screenProps} />,
      ScreenProps: {
        // handleSearchData: api.property.getAll,
        data: StaticData.Nationality.options,
        handleSelect: onModalSelectNationality,
        listSelected: selectedNationality,
        selectedId: selectedNationality.code,
        separator: true,
        modalTitle: pickOne,
      },
    });
  }, [selectedNationality, navigation, pickOne]);
  // position
  const [selectedPosition, setSelectedPosition] = useState({});
  const [errPosition, setErrPosition] = useState(null);
  const onModalSelectPosition = selectedItem => {
    setSelectedPosition(selectedItem);
  };
  const onSelectPosition = useCallback(() => {
    navigation.navigate('ModalScreen', {
      Screen: screenProps => <OneSelect {...screenProps} />,
      ScreenProps: {
        // handleSearchData: api.property.getAll,
        data: StaticData.Position.options,
        handleSelect: onModalSelectPosition,
        listSelected: selectedPosition,
        selectedId: selectedPosition.code,
        separator: true,
        modalTitle: pickOne,
      },
    });
  }, [selectedPosition, navigation, pickOne]);
  return (
    <SafeAreaView style={styles.containerWrapper}>
      <HeaderTop
        navigation={navigation}
        titleHeader={titleHeader}
        btnLeft
        btnRight
        componentBtnLeft={componentBtnLeftHeader}
        componentBtnRight={componentBtnRightHeader}
      />
      <KeyboardAwareScrollView
        scrollEnabled={true}
        enableAutomaticScroll={true}
        extraHeight={Platform.OS === 'ios' ? 140 : 40}
        enableOnAndroid={true}
        style={styles.container}>
        <Input
          errors={errorFullname}
          label={labelFullname}
          placeholder={fullname || placeholderFullname}
          keyboardType="number-pad"
          onChangeText={onChangeFullName}
          value={fullname}
          required
        />
        <Input
          errors={errorPhone}
          label={labelPhone}
          placeholder={placeholderPhone}
          keyboardType="number-pad"
          onChangeText={changePhone}
          value={phone}
          required
        />
        <Input
          errors={errorEmail}
          label={labelEmail}
          placeholder={placeholderEmail}
          keyboardType="email-address"
          onChangeText={changeEmail}
          value={email}
          required
        />
        <Input
          errors={errorPasswordText}
          label={password}
          keyboardType="number-pad"
          placeholder={pleaseInput}
          onChangeText={changePasswordText}
          value={passwordText}
          required
        />
        <Input
          errors={errorDob}
          label={labelDob}
          placeholder="01 / 01 / 1990"
          keyboardType="number-pad"
          onChangeText={changeDob}
          value={dob}
          required
        />
        <Input
          errors={errorIdentity}
          label={labelIdentity}
          keyboardType="number-pad"
          placeholder={placeholderIdentity}
          onChangeText={changeIdentity}
          value={identity}
          required
        />
        <Select
          label={position}
          buttonTitle={selectedPosition.text || pickOne}
          selectTitleStyle={
            !isEmpty(selectedPosition) ? styles.selectedTitleColor : null
          }
          errors={errPosition}
          onPress={onSelectPosition}
          required
        />
        <Select
          label={contractType}
          buttonTitle={selectedContractType.text || pickOne}
          selectTitleStyle={
            !isEmpty(selectedContractType) ? styles.selectedTitleColor : null
          }
          errors={errContractType}
          onPress={onSelectContractType}
        />
        <Select
          label={nationality}
          buttonTitle={selectedNationality.text || pickOne}
          selectTitleStyle={
            !isEmpty(selectedNationality) ? styles.selectedTitleColor : null
          }
          errors={errNationality}
          onPress={onSelectNationality}
        />

        <Input
          label={labelAddress}
          placeholder={placeholderAddress}
          onChangeText={changeAddress}
          value={address}
        />
        <Input
          label={education}
          placeholder={education}
          onChangeText={changeEducationText}
          value={educationText}
        />
      </KeyboardAwareScrollView>
      <Modal animationType="fade" transparent={true} visible={dialogVisible}>
        <NoticationDialog
          titleTop={action === 'EDIT' ? cancelEdit : cancelCreate}
          contentModal={action === 'EDIT' ? qizCancelEdit : qizCancelCreate}
          navigation={navigation}
          textBtnLeft={back}
          textBtnRight={action === 'EDIT' ? cancelEdit : cancelCreate}
          actionModalLeft={actionModalLeft}
          actionModalRight={actionModalRight}
        />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerWrapper: {
    backgroundColor: '#fff',
    flex: 10,
  },
  container: {
    backgroundColor: '#fff',
    flex: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  label: {color: Colors.darkGrey, fontSize: 15, marginVertical: 8},
  labelWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  checkboxAll: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    paddingBottom: 5,
  },
  textStyleCheckBox: {
    fontWeight: '500',
    fontSize: 15,
  },
  genderWrapper: {
    flexDirection: 'row',
  },
  boxLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
    paddingLeft: 15,
    paddingVertical: 10,
  },
  boxRight: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 15,
    paddingVertical: 10,
  },
  textHeaderLeft: {
    fontSize: 15,
    color: Colors.uglyBlue,
  },
  textHeaderRight: {
    fontSize: 15,
    color: Colors.tangerine,
  },
  selectedTitleColor: {
    color: Colors.darkGrey,
  },
});
export default memo(CustomerAddScreen);

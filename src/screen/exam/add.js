import React, {useState, useCallback} from 'react';
import {map, isEmpty, get, identity, find} from 'lodash';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Colors} from 'assets';
import {HeaderTop, Select, Input, ModalScheduleTime} from 'components';
import Modal from 'react-native-modal';
import {OneSelect} from '../modal';
import {useTranslation, getNumberOnly, formatAmount} from 'utils';
import moment from 'moment';
const Add = props => {
  const {
    cancel,
    pickOne,
    confirm,
    addExam,
    start,
    chooseStartDate,
    end,
    chooseEndDate,
    nameExam,
    pleaseInput,
    chooseClass,
    numberStudents,
  } = useTranslation();
  const [listStudent, setData] = useState([
    {code: 1, text: 'Lớp 10A1'},
    {code: 2, text: 'Lớp 10A2'},
    {code: 3, text: 'Lớp 10A3'},
    {code: 4, text: 'Lớp 10A4'},
    {code: 5, text: 'Lớp 10A5'},
    {code: 6, text: 'Lớp 10A6'},
    {code: 7, text: 'Lớp 10A7'},
  ]);
  const {navigation, route} = props;
  const [selectedStudent, setSelectedStudent] = useState({});
  const [errStudent, setErrStudent] = useState(null);
  const [errNote, setErrNote] = useState(null);
  const [errProportion, setErrProportion] = useState(null);
  const [showDatePickerStart, setShowDatePicker] = useState(false);
  const [showDatePickerEnd, setShowDatePickerEnd] = useState(false);
  const dateTimeCurrent = new Date(new Date().setHours(new Date().getHours()));
  const [dataForm, setDataForm] = useState({});

  const actionBtnLeft = () => {
    navigation.goBack();
  };
  const componentBtnLeft = () => {
    return (
      <TouchableOpacity onPress={actionBtnLeft} style={styles.boxLeft}>
        <Text style={styles.textHeaderLeft}>{cancel}</Text>
      </TouchableOpacity>
    );
  };
  const onModalSelectStudent = useCallback(
    selectedItem => {
      setSelectedStudent(selectedItem);
      const dataFormNew = {...dataForm, slotId: selectedItem.code};
      setDataForm(dataFormNew);
    },
    [dataForm],
  );
  const onSelectStudent = useCallback(() => {
    navigation.navigate('ModalScreen', {
      Screen: screenProps => <OneSelect {...screenProps} />,
      ScreenProps: {
        // handleSearchData: api.property.getAll,
        data: listStudent,
        handleSelect: onModalSelectStudent,
        listSelected: selectedStudent,
        selectedId: selectedStudent.code,
        separator: true,
        modalTitle: pickOne,
      },
    });
  }, [navigation, listStudent, onModalSelectStudent, selectedStudent, pickOne]);
  const onCloseScheduleStart = () => {
    setShowDatePicker(false);
  };
  const onOpenScheduleStart = useCallback(() => {
    setShowDatePicker(true);
  }, []);
  const onCloseScheduleEnd = () => {
    setShowDatePickerEnd(false);
  };
  const onOpenScheduleEnd = useCallback(() => {
    setShowDatePickerEnd(true);
  }, []);
  //Change
  const callBackSetStartDate = value => {
    const dataFormNew = {...dataForm, from: value};
    setDataForm(dataFormNew);
  };
  const callBackSetEndDate = value => {
    const dataFormNew = {...dataForm, to: value};
    setDataForm(dataFormNew);
  };
  const onProportionChange = useCallback(
    value => {
      const proportion = getNumberOnly(value);
      const dataFormNew = {...dataForm, proportion};
      setDataForm(dataFormNew);
    },
    [dataForm],
  );
  const onNameChange = useCallback(
    value => {
      const dataFormNew = {...dataForm, name: value};
      setDataForm(dataFormNew);
    },
    [dataForm],
  );
  const onConfirm = useCallback(() => {
    console.log('formDataConfirm', dataForm);
    // if (isEmpty(selectedStudent)) {
    //   setErrStudent(['Not be empty']);
    //   return;
    // } else {
    //   setErrStudent(null);
    // }
    // if (isEmpty(agentNote)) {
    //   setErrNote(['Not be empty']);
    //   return;
    // } else {
    //   setErrNote(null);
    // }
    // const body = {
    //   selectedStudent,
    //   note: agentNote,
    // };
    // navigation.goBack();
  }, [dataForm]);

  return (
    <SafeAreaView style={styles.wrapperModal}>
      <HeaderTop
        navigation={navigation}
        titleHeader={addExam}
        btnLeft
        componentBtnLeft={componentBtnLeft}
      />
      <KeyboardAwareScrollView
        scrollEnabled={true}
        enableAutomaticScroll={true}
        extraHeight={Platform.OS === 'ios' ? 180 : 40}
        enableOnAndroid={true}
        contentContainerStyle={styles.modalScrollView}
        scrollEventThrottle={16}>
        <Input
          label={nameExam}
          placeholder={pleaseInput}
          onChangeText={onNameChange}
          // renderRight={<Text style={styles.fontSize14}>m</Text>}
          required
          errors={errProportion}
        />
        <Select
          label={chooseClass}
          buttonTitle={selectedStudent.text || chooseClass}
          selectTitleStyle={
            !isEmpty(selectedStudent) ? styles.selectedTitleColor : null
          }
          required
          errors={errStudent}
          onPress={onSelectStudent}
        />
        <Input
          label={numberStudents}
          placeholder={pleaseInput}
          keyboardType="numeric"
          value={formatAmount(get(dataForm, 'proportion'))}
          as
          onChangeText={onProportionChange}
          // renderRight={<Text style={styles.fontSize14}>m</Text>}
          required
          errors={errProportion}
        />
        <Select
          label={start}
          buttonTitle={
            get(dataForm, 'from')
              ? moment(parseInt(get(dataForm, 'from'))).format(
                  'HH:mm, ddd DD/MM/YYYY',
                )
              : chooseStartDate
          }
          selectTitleStyle={
            get(dataForm, 'from') ? styles.selectedTitleColor : null
          }
          hideIcon
          required
          errors={errStudent}
          onPress={onOpenScheduleStart}
        />
        <Select
          label={end}
          buttonTitle={
            get(dataForm, 'to')
              ? moment(parseInt(get(dataForm, 'to'))).format(
                  'HH:mm, ddd DD/MM/YYYY',
                )
              : chooseStartDate
          }
          selectTitleStyle={
            get(dataForm, 'to') ? styles.selectedTitleColor : null
          }
          hideIcon
          required
          errors={errStudent}
          onPress={onOpenScheduleEnd}
        />
        {/* <TextInputArea
          required
          errors={errNote}
          multiline
          numberOfLines={2}
          notBoldTitle
          value={agentNote}
          onChangeInput={text => setAgentNote(text)}
          label={note}
          placeholder={noteReviewStudent}
          maxLength={500}
        /> */}
      </KeyboardAwareScrollView>
      <Modal
        isVisible={showDatePickerStart}
        onBackdropPress={onCloseScheduleStart}
        style={styles.bottomModal}>
        <ModalScheduleTime
          onCloseBottomModal={onCloseScheduleStart}
          callBack={callBackSetStartDate}
          dateTimeCurrent={new Date(new Date().setHours(new Date().getHours()))}
          modalTitle={chooseStartDate}
        />
      </Modal>
      <Modal
        isVisible={showDatePickerEnd}
        onBackdropPress={onCloseScheduleEnd}
        style={styles.bottomModal}>
        <ModalScheduleTime
          onCloseBottomModal={onCloseScheduleEnd}
          callBack={callBackSetEndDate}
          dateTimeCurrent={new Date(new Date().setHours(new Date().getHours()))}
          modalTitle={chooseEndDate}
        />
      </Modal>
      <TouchableOpacity style={styles.buttonBottom} onPress={onConfirm}>
        <Text style={styles.buttonBottomText}>{confirm}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    color: Colors.coolGrey,
    fontSize: 15,
    fontWeight: 'normal',
    flex: 1,
  },
  selectedTitleColor: {
    color: Colors.darkGrey,
  },
  titleStyleSelected: {
    color: Colors.darkGrey,
    fontSize: 15,
    fontWeight: 'normal',
    flex: 1,
  },
  buttonStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: Colors.cloudyBlue,
    backgroundColor: 'transparent',
    marginBottom: 20,
    padding: 10,
  },
  labelSelect: {
    color: Colors.darkGrey,
    fontSize: 15,
    marginVertical: 8,
  },
  labelSelectWrapper: {
    // flexDirection: 'row',
  },
  wrapperModal: {
    height: '100%',
    backgroundColor: 'white',
  },
  modalScrollView: {
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 15,
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
    // flex: 1,
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
  buttonBottom: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.tangerine,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonBottomText: {
    color: Colors.white,
    fontSize: 16,
  },
  fontSize14: {
    fontSize: 14,
  },
  buttonGroupContainer: {
    height: 40,
    width: '50%',
    marginHorizontal: 0,
    backgroundColor: 'white',
    borderRadius: 4,
  },
  buttonGroupSelectedButton: {
    backgroundColor: Colors.tangerine,
    borderWidth: 1,
    borderColor: Colors.tangerine,
  },
  labelWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  label: {color: Colors.darkGrey, fontSize: 15, marginVertical: 8},
  wrapperElement: {
    marginTop: 10,
  },
  checkboxQuantity: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    paddingBottom: 5,
    width: '40%',
  },
  checkboxQuantityWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  textStyleCheckBox: {
    fontWeight: '500',
    fontSize: 15,
  },
  marginBottom20: {
    marginBottom: 20,
  },
});

export default Add;

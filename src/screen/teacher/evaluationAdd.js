import React, {useState, useCallback} from 'react';
import {map, isEmpty, pickBy, identity, find} from 'lodash';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Colors} from 'assets';
import {HeaderTop, TextInputArea, Select} from 'components';
import {OneSelect} from '../modal';
import {useTranslation} from 'utils';
const Add = props => {
  const {
    cancel,
    pickOne,
    pickOneStudent,
    honorPlaceholder,
    note,
    noteReviewStudent,
    confirm,
  } = useTranslation();
  const [listStudent, setData] = useState([
    {code: 1, text: 'Trần Văn Trường'},
    {code: 2, text: 'Tô Tất Tưởi'},
    {code: 3, text: 'Đinh Như Đạo'},
    {code: 4, text: 'Khá Quá Đáng'},
    {code: 5, text: 'Hay Như Hát'},
    {code: 6, text: 'Cao Như Thế'},
    {code: 7, text: 'Bùi Văn Bui'},
  ]);
  const {navigation, route} = props;
  const type = route?.params?.type;
  const title = route?.params?.title;
  const [selectedStudent, setSelectedStudent] = useState({});
  const [agentNote, setAgentNote] = useState('');
  const [errStudent, setErrStudent] = useState(null);
  const [errNote, setErrNote] = useState(null);

  const onConfirm = useCallback(() => {
    if (isEmpty(selectedStudent)) {
      setErrStudent(['Not be empty']);
      return;
    } else {
      setErrStudent(null);
    }
    if (isEmpty(agentNote)) {
      setErrNote(['Not be empty']);
      return;
    } else {
      setErrNote(null);
    }
    const body = {
      selectedStudent,
      note: agentNote,
    };
    if (type === 'GOOD') {
      DeviceEventEmitter.emit('ADD_EVALUATION_GOOD', body);
    } else {
      DeviceEventEmitter.emit('ADD_EVALUATION_BAD', body);
    }
    navigation.goBack();
  }, [selectedStudent, agentNote, type, navigation]);

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
  const onModalSelectStudent = selectedItem => {
    setSelectedStudent(selectedItem);
  };
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
  }, [selectedStudent, navigation, listStudent, pickOne]);

  return (
    <SafeAreaView style={styles.wrapperModal}>
      <HeaderTop
        navigation={navigation}
        titleHeader={title}
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
        <Select
          label={pickOneStudent}
          buttonTitle={selectedStudent.text || honorPlaceholder}
          selectTitleStyle={
            !isEmpty(selectedStudent) ? styles.selectedTitleColor : null
          }
          required
          errors={errStudent}
          onPress={onSelectStudent}
        />
        <TextInputArea
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
        />
      </KeyboardAwareScrollView>
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

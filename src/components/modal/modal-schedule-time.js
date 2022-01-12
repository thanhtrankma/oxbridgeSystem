import React, {memo, useCallback, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import {useTranslation} from 'utils';
import {Colors} from 'assets';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {DateTimePickerComponent} from 'components';
import {Icon} from 'react-native-elements';
import moment from 'moment/min/moment-with-locales';

const ModalScheduleTime = ({
  onCloseBottomModal,
  callBack,
  dateTimeCurrent,
  modalTitle,
}) => {
  const {confirm} = useTranslation();
  const [dateTimePicked, setDateTimePicked] = useState(dateTimeCurrent);
  const onHandleClickConfirm = useCallback(() => {
    const bookTime = moment(dateTimePicked).format('x');
    callBack(bookTime);
    onCloseBottomModal();
  }, [callBack, dateTimePicked, onCloseBottomModal]);

  const onChangeDate = useCallback(val => {
    setDateTimePicked(val);
  }, []);
  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.boxHeader}>
        <KeyboardAwareScrollView
          enableAutomaticScroll={true}
          extraHeight={Platform.OS === 'ios' ? 420 : 280}
          enableOnAndroid={true}>
          <View style={styles.boxHeaderLeft}>
            <View style={styles.flex1}>
              <Text style={styles.boxHeaderTitleTop}>{modalTitle}</Text>
            </View>
            <TouchableOpacity onPress={onCloseBottomModal}>
              <Icon
                type="material-community"
                name="close"
                size={21}
                color={Colors.coolGrey}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.boxBodyModal}>
            <DateTimePickerComponent
              dateTime={dateTimePicked}
              onChangeDate={onChangeDate}
            />
          </View>
          <View style={styles.boxFooter}>
            <View style={styles.btnOrangeWrapper}>
              <TouchableOpacity
                style={styles.btnConfirm}
                onPress={onHandleClickConfirm}>
                <Text style={styles.btnOrangeText}>{confirm}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  flex1: {flex: 1},
  boxHeader: {
    width: '100%',
    borderRadius: 8,
    backgroundColor: Colors.white,
    paddingHorizontal: 15,
  },
  boxHeaderTitleTop: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.darkGrey,
  },
  boxHeaderLeft: {
    paddingTop: 20,
    paddingBottom: 10,
    flexDirection: 'row',
  },
  boxTextInput: {
    width: '100%',
  },
  boxBodyModal: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  boxFooter: {
    paddingTop: 20,
    paddingBottom: 30,
  },
  btnOrangeText: {
    color: Colors.tangerine,
    fontSize: 15,
  },
  btnConfirm: {
    width: '100%',
    borderWidth: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 5,
    borderColor: Colors.tangerine,
  },
  btnOrangeWrapper: {
    alignItems: 'center',
  },
  suggestionsWrapper: {
    flexDirection: 'row',
    marginTop: 15,
  },
  suggestionsItemActive: {
    borderWidth: 0.5,
    borderColor: Colors.uglyBlue,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginRight: 10,
  },
  suggestionsItem: {
    borderWidth: 0.5,
    borderColor: Colors.cloudyBlue,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginRight: 10,
  },
  suggestionsText: {
    color: Colors.coolGreyTwo,
  },
  suggestionsTextActive: {
    color: Colors.uglyBlue,
  },
});

export default memo(ModalScheduleTime);

import React, {useState, useCallback, useEffect} from 'react';
import {map, remove, includes, pickBy, identity, isEmpty} from 'lodash';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  View,
  DeviceEventEmitter,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Colors} from 'assets';
import {HeaderTop} from 'components';
import {Icon} from 'react-native-elements';
import {useTranslation} from 'utils';
const Filter = props => {
  const {
    cancel,
    evaluation,
    honor,
    addHonor,
    honorPlaceholder,
    criticize,
    addCriticize,
  } = useTranslation();
  const {navigation, route} = props;
  const [listGood, setListGood] = useState([]);
  const [listBad, setListBad] = useState([]);

  const addGood = useCallback(
    item => {
      const newData = [...[item], ...listGood];
      setListGood(newData);
    },
    [listGood],
  );
  const addBad = useCallback(
    item => {
      const newData = [...[item], ...listGood];
      setListBad(newData);
    },
    [listGood],
  );
  useEffect(() => {
    const listener = DeviceEventEmitter.addListener(
      'ADD_EVALUATION_GOOD',
      addGood,
    );
    return () => listener.remove();
  }, [addGood]);
  useEffect(() => {
    const listener = DeviceEventEmitter.addListener(
      'ADD_EVALUATION_BAD',
      addBad,
    );
    return () => listener.remove();
  }, [addBad]);

  const onConfirm = useCallback(() => {
    const honors = listGood.map(user => {
      return {
        note: user.note,
        studentId: user.selectedStudent.code,
      };
    });
    const criticize = listBad.map(user => {
      return {
        note: user.note,
        studentId: user.selectedStudent.code,
      };
    });
    const body = {
      honors,
      criticize,
    };
    console.log('body', body);
  }, [listBad, listGood]);

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

  return (
    <SafeAreaView style={styles.wrapperModal}>
      <HeaderTop
        navigation={navigation}
        titleHeader={evaluation}
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
        <View style={styles.wrapper}>
          <View style={styles.labelSelectWrapper}>
            <Text style={[styles.labelSelect]}>{honor}</Text>
          </View>
          <TouchableOpacity
            style={styles.boxRight}
            onPress={() =>
              navigation.navigate('EvaluationAdd', {
                type: 'GOOD',
                title: addHonor,
              })
            }>
            <Icon
              type="feather"
              name="plus"
              size={25}
              color={Colors.tangerine}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.buttonStyle, styles.selectedItemWrapper]}>
          {!isEmpty(listGood) ? (
            listGood.map(({note, selectedStudent}) => (
              <View key={Math.random()} style={styles.itemSelectd}>
                <Text style={[]}>{selectedStudent.text}</Text>
                <Text style={styles.noteSelectd} numberOfLines={1}>
                  {note}
                </Text>
              </View>
            ))
          ) : (
            <Text style={[styles.titleStyle]}>{honorPlaceholder}</Text>
          )}
        </View>
        {/* HTna */}
        <View style={styles.wrapper}>
          <View style={styles.labelSelectWrapper}>
            <Text style={[styles.labelSelect]}>{criticize}</Text>
          </View>
          <TouchableOpacity
            style={styles.boxRight}
            onPress={() =>
              navigation.navigate('EvaluationAdd', {
                type: 'BAD',
                title: {addCriticize},
              })
            }>
            <Icon
              type="feather"
              name="plus"
              size={25}
              color={Colors.tangerine}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.buttonStyle, styles.selectedItemWrapper]}>
          {!isEmpty(listBad) ? (
            listBad.map(({note, selectedStudent}) => (
              <View key={Math.random()} style={styles.itemSelectd}>
                <Text style={[]}>{selectedStudent.text}</Text>
                <Text style={styles.noteSelectd} numberOfLines={1}>
                  {note}
                </Text>
              </View>
            ))
          ) : (
            <Text style={[styles.titleStyle]}>{honorPlaceholder}</Text>
          )}
        </View>
      </KeyboardAwareScrollView>
      <TouchableOpacity style={styles.buttonBottom} onPress={onConfirm}>
        <Text style={styles.buttonBottomText}>{evaluation}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemSelectd: {
    flexDirection: 'column',
    marginVertical: 5,
  },
  noteSelectd: {
    flexDirection: 'column',
    fontSize: 12,
    color: Colors.coolGreyTwo,
  },
  selectedItemWrapper: {
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  titleStyle: {
    color: Colors.coolGrey,
    fontSize: 15,
    fontWeight: 'normal',
  },
  buttonStyle: {
    flexDirection: 'row',
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

export default Filter;

import React, {useState, useCallback} from 'react';
import {map, remove, pickBy, identity} from 'lodash';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Colors} from 'assets';
import {HeaderTop, InputMultipleTag} from 'components';
import {genarateQueryString} from 'utils';
import {MultipleSelect} from '../modal';
import {useTranslation} from 'utils';
const Filter = props => {
  const {
    tuitionPaymentStatus,
    filter,
    cancel,
    placeholderSelectCommon,
    unfiltered,
    viewResult,
  } = useTranslation();
  const {navigation} = props;
  const [listSelectedProperty, setListSelectedProperty] = useState([]);
  const [listSelectedSbj, setListSelectedSbj] = useState([]);
  const [listSelectedWorkplace, setListSelectedWorkplace] = useState([]);

  const onConfirm = useCallback(() => {
    const body = {
      tuitionPaymentStatus:
        listSelectedProperty.length > 0
          ? map(listSelectedProperty, 'code')
          : null,
      objs: listSelectedSbj.length > 0 ? map(listSelectedSbj, 'code') : null,
      workplace:
        listSelectedWorkplace.length > 0
          ? map(listSelectedWorkplace, 'code')
          : null,
    };
    const dataNotNull = pickBy(body, identity);
    const qs = genarateQueryString(dataNotNull);
    navigation.navigate('TeacherFilterResults', {
      qs,
    });
  }, [
    listSelectedProperty,
    listSelectedSbj,
    listSelectedWorkplace,
    navigation,
  ]);

  const actionBtnLeft = () => {
    navigation.goBack();
  };
  const actionBtnRight = () => {
    setListSelectedProperty([]);
    setListSelectedSbj([]);
    setListSelectedWorkplace([]);
  };
  const componentBtnLeft = () => {
    return (
      <TouchableOpacity onPress={actionBtnLeft} style={styles.boxLeft}>
        <Text style={styles.textHeaderLeft}>{cancel}</Text>
      </TouchableOpacity>
    );
  };
  const componentBtnRight = () => {
    return (
      <TouchableOpacity onPress={actionBtnRight} style={styles.boxRight}>
        <Text style={styles.textHeaderRight}>{unfiltered}</Text>
      </TouchableOpacity>
    );
  };
  //property
  const onModalSelectProperty = selectedItem => {
    setListSelectedProperty(selectedItem);
  };
  const onSelectNational = useCallback(() => {
    navigation.navigate('ModalScreen', {
      Screen: screenProps => <MultipleSelect {...screenProps} />,
      ScreenProps: {
        // handleSearchData: api.property.getAll,
        handleSelect: onModalSelectProperty,
        listSelected: listSelectedProperty,
        separator: true,
        modalTitle: tuitionPaymentStatus,
      },
    });
  }, [listSelectedProperty, tuitionPaymentStatus, navigation]);
  const onDeletePropertyItem = useCallback(
    item => {
      const listSelectedPropertyTemp = [...listSelectedProperty];
      remove(listSelectedPropertyTemp, el => {
        return el.code === item.code;
      });
      setListSelectedProperty(listSelectedPropertyTemp);
    },
    [listSelectedProperty],
  );

  return (
    <SafeAreaView style={styles.wrapperModal}>
      <HeaderTop
        navigation={navigation}
        titleHeader={filter}
        btnLeft
        btnRight
        componentBtnLeft={componentBtnLeft}
        componentBtnRight={componentBtnRight}
      />
      <KeyboardAwareScrollView
        scrollEnabled={true}
        enableAutomaticScroll={true}
        extraHeight={Platform.OS === 'ios' ? 180 : 40}
        enableOnAndroid={true}
        contentContainerStyle={styles.modalScrollView}
        scrollEventThrottle={16}>
        <InputMultipleTag
          label={tuitionPaymentStatus}
          placeholder={placeholderSelectCommon}
          onSelectItems={onSelectNational}
          onDeleteItem={onDeletePropertyItem}
          listItems={listSelectedProperty}
        />
      </KeyboardAwareScrollView>
      <TouchableOpacity style={styles.buttonBottom} onPress={onConfirm}>
        <Text style={styles.buttonBottomText}>{viewResult}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  labelSelect: {
    color: Colors.darkGrey,
    fontSize: 15,
    marginVertical: 8,
  },
  marginBottom20: {
    marginBottom: 20,
  },
});

export default Filter;

import React, {useEffect, useState, useCallback} from 'react';
import {map, isUndefined} from 'lodash';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useTranslation} from 'utils';
import {Icon} from 'react-native-elements';
import {Colors} from 'assets';
import {CheckBoxItem, HeaderTop} from 'components';

const MultipleSelect = props => {
  // Modal Params
  const {
    // handleSearchData,
    handleSelect,
    listSelected,
    separator,
    modalTitle,
    navigation,
    data,
  } = props;
  // useEffect(() => {
  //   getDataAll();
  // }, []);
  const {deleteText, confirm} = useTranslation();
  const list = [
    {code: '0', text: 'Thanh'},
    {code: '1', text: 'Thanh 1'},
    {code: '2', text: 'Thanh 2'},
  ];
  const [listData, setListData] = useState(data || list);
  const [modalSelectedIds, setModalSelectedIds] = useState([]);
  const [modalListSelected, setModalListSelected] = useState(listSelected);

  useEffect(() => {
    setModalSelectedIds(map(modalListSelected, 'code'));
  }, [modalListSelected]);
  const getDataAll = () => {
    // handleSearchData().then(results => {
    //   setListData(results);
    //   const isCodeTemp = !isUndefined(results[0]?.code);
    //   setIsCode(isCodeTemp);
    // });
  };

  const onSelectedItem = useCallback(
    selectedItem => {
      let tempSelected = [...modalListSelected];
      const index = modalSelectedIds.indexOf(selectedItem.code);
      index > -1
        ? tempSelected.splice(index, 1)
        : tempSelected.push(selectedItem);
      setModalListSelected(tempSelected);
    },
    [modalListSelected, modalSelectedIds],
  );
  const onConfirm = useCallback(() => {
    handleSelect(modalListSelected);
    navigation.goBack();
  }, [handleSelect, modalListSelected, navigation]);

  const actionBtnLeft = () => {
    navigation.goBack();
  };
  const actionBtnRight = () => {
    setModalListSelected([]);
  };
  const componentBtnLeft = () => {
    return (
      <TouchableOpacity onPress={actionBtnLeft} style={styles.boxLeft}>
        <Icon
          type="feather"
          name="chevron-left"
          size={25}
          color={Colors.slateGrey}
        />
      </TouchableOpacity>
    );
  };
  const componentBtnRight = () => {
    return (
      <TouchableOpacity onPress={actionBtnRight} style={styles.boxRight}>
        <Text style={styles.textHeaderRight}>{deleteText}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.wrapperModal}>
      <HeaderTop
        navigation={navigation}
        titleHeader={modalTitle}
        btnLeft
        btnRight
        componentBtnLeft={componentBtnLeft}
        componentBtnRight={componentBtnRight}
      />
      {listData.length === 0 && <ActivityIndicator style={{marginTop: 20}} />}
      <ScrollView
        contentContainerStyle={styles.modalScrollView}
        scrollEventThrottle={16}>
        {listData.map(({code, text}) => (
          <CheckBoxItem
            key={code}
            title={text}
            isSelected={
              modalSelectedIds.length > 0 && modalSelectedIds.includes(code)
            }
            onPress={() => onSelectedItem({code, text})}
            separator={separator}
          />
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.buttonBottom} onPress={onConfirm}>
        <Text style={styles.buttonBottomText}>{confirm}</Text>
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
    color: Colors.slateGrey,
  },
  textHeaderRight: {
    fontSize: 15,
    color: Colors.slateGrey,
  },
  buttonBottom: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.paleGrey,
    width: '100%',
  },
  buttonBottomText: {
    color: Colors.uglyBlue,
    fontSize: 15,
  },
});

export default MultipleSelect;

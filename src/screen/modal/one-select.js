/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {Colors} from 'assets';
import {CheckBoxItem} from 'components';
import {Button} from 'react-native-elements';

const PropertyModal = props => {
  // Modal Params
  const {
    handleSearchData,
    handleSelect,
    selectedId,
    separator,
    modalTitle,
    navigation,
    data,
  } = props;
  // Modal States
  const list = [
    {code: '0', text: 'Thanh'},
    {code: '1', text: 'Thanh 1'},
    {code: '2', text: 'Thanh 2'},
  ];
  const [listData, setListData] = useState(data || list);
  const [modalSelectedId, setModalSelectedId] = useState(selectedId);
  const [isLoadingButtonClassify, setLoadingButtonClassify] = useState(false);
  const [isShowErr, setShowErr] = useState(false);

  function onSelectedItem(selectedItem) {
    setModalSelectedId(selectedItem.code);
    handleSelect(selectedItem.code !== 'UNKNOW' ? selectedItem : null);
    navigation.goBack();
  }

  const onCloseModal = text => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.wrapperModal}>
      <View style={styles.headerWrapper}>
        {modalTitle && (
          <>
            <Text style={styles.modalStyle}>{modalTitle}</Text>
            <Icon
              onPress={onCloseModal}
              containerStyle={styles.closeModal}
              name="close"
              type="antdesign"
              size={25}
              color="black"
            />
          </>
        )}
      </View>
      {listData.length === 0 && <ActivityIndicator style={{marginTop: 20}} />}
      <ScrollView
        contentContainerStyle={
          !isShowErr
            ? styles.modalScrollView
            : {flex: 1, justifyContent: 'center'}
        }
        scrollEventThrottle={16}>
        {!isShowErr ? (
          listData.map(({code, text, id, name}) => (
            <CheckBoxItem
              key={code || id}
              title={text || name}
              isSelected={
                modalSelectedId &&
                (code === modalSelectedId || id === modalSelectedId)
              }
              onPress={() =>
                onSelectedItem(code ? {code, text} : {code: id, text: name})
              }
              separator={separator}
            />
          ))
        ) : (
          <View style={styles.wrapperReload}>
            <View style={styles.innerReload}>
              <Text style={styles.textReload}>
                Có lỗi xảy ra. Vui lòng thử lại
              </Text>
              <Button
                color={Colors.tangerine}
                title="Thử lại"
                loading={isLoadingButtonClassify}
                buttonStyle={styles.btnReload}
                onPress={() => {
                  setLoadingButtonClassify(true);
                  setTimeout(() => {
                    console.log();
                  }, 1000);
                  setTimeout(() => {
                    setLoadingButtonClassify(false);
                  }, 5000);
                }}
              />
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapperReload: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  innerReload: {justifyContent: 'center', alignItems: 'center', flex: 1},
  textReload: {textAlign: 'center', marginBottom: 30, fontSize: 15},
  btnReload: {backgroundColor: Colors.tangerine, width: 100},
  wrapperModal: {
    height: '100%',
    backgroundColor: 'white',
  },
  headerWrapper: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  modalScrollView: {
    backgroundColor: 'white',
    // flex: 1,
    justifyContent: 'center',
  },
  swiperWrapper: {
    width: '100%',
    height: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  shortLine: {width: '10%', height: 2, backgroundColor: 'white'},
  longLine: {width: '15%', height: 2, backgroundColor: 'white'},
  backgroundColorWhite: {backgroundColor: 'white'},
  searchContainer: {
    backgroundColor: 'white',
    flex: 1,
    borderWidth: 1,
    marginRight: 40,
    marginLeft: 10,
    marginTop: 10,
    paddingBottom: 1,
    borderRadius: 4,
    borderColor: Colors.cloudyBlue,
    borderTopColor: Colors.cloudyBlue,
    borderBottomColor: Colors.cloudyBlue,
    padding: 0,
  },
  modalStyle: {
    flex: 1,
    textAlign: 'left',
    fontSize: 15,
    color: Colors.slateGrey,
    backgroundColor: Colors.paleGrey,
    paddingVertical: 10,
    paddingLeft: 20,
  },
  closeSearchModal: {position: 'absolute', right: 10, top: 20},
  closeModal: {position: 'absolute', right: 10},
});

export default PropertyModal;

import React, {useCallback, useEffect, useState} from 'react';
import {View, SafeAreaView, Text, StyleSheet, ScrollView} from 'react-native';
import {Icon, SearchBar} from 'react-native-elements';
import {Colors} from 'assets';

const ProjectModal = props => {
  // Modal Params
  const {modalTitle, navigation} = props;
  // Modal States

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
      <ScrollView
        contentContainerStyle={styles.modalScrollView}
        scrollEventThrottle={16}>
        <Text>Thanh</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  backgroundColorWhite: {backgroundColor: 'white', color: Colors.darkGrey},
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

export default ProjectModal;

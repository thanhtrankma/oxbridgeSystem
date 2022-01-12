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
    classText,
    parent,
    ages,
    filter,
    cancel,
    placeholderAges,
    placeholderClass,
    placeholderParents,
    unfiltered,
    viewResult,
  } = useTranslation();
  const {navigation} = props;
  const [listSelectedAge, setListSelectedAge] = useState([]);
  const [listSelectedClass, setListSelectedClass] = useState([]);
  const [listSelectedParent, setListSelectedParent] = useState([]);

  const onConfirm = useCallback(() => {
    const body = {
      ages: listSelectedAge.length > 0 ? map(listSelectedAge, 'code') : null,
      objs:
        listSelectedClass.length > 0 ? map(listSelectedClass, 'code') : null,
      parent:
        listSelectedParent.length > 0 ? map(listSelectedParent, 'code') : null,
    };
    const dataNotNull = pickBy(body, identity);
    const qs = genarateQueryString(dataNotNull);
    navigation.navigate('StudentFilterResults', {
      qs,
    });
  }, [listSelectedAge, listSelectedClass, listSelectedParent, navigation]);

  const actionBtnLeft = () => {
    navigation.goBack();
  };
  const actionBtnRight = () => {
    setListSelectedAge([]);
    setListSelectedClass([]);
    setListSelectedParent([]);
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
  const onModalSelectAge = selectedItem => {
    setListSelectedAge(selectedItem);
  };
  const onSelectNational = useCallback(() => {
    navigation.navigate('ModalScreen', {
      Screen: screenProps => <MultipleSelect {...screenProps} />,
      ScreenProps: {
        // handleSearchData: api.property.getAll,
        handleSelect: onModalSelectAge,
        listSelected: listSelectedAge,
        separator: true,
        modalTitle: ages,
      },
    });
  }, [listSelectedAge, ages, navigation]);
  const onDeleteAgeItem = useCallback(
    item => {
      const listSelectedAgeTemp = [...listSelectedAge];
      remove(listSelectedAgeTemp, el => {
        return el.code === item.code;
      });
      setListSelectedAge(listSelectedAgeTemp);
    },
    [listSelectedAge],
  );
  //sbj
  const onModalSelectClass = selectedItem => {
    setListSelectedClass(selectedItem);
  };
  const onSelectClass = useCallback(() => {
    navigation.navigate('ModalScreen', {
      Screen: screenProps => <MultipleSelect {...screenProps} />,
      ScreenProps: {
        // handleSearchData: api.property.getAll,
        handleSelect: onModalSelectClass,
        listSelected: listSelectedClass,
        separator: true,
        modalTitle: classText,
      },
    });
  }, [listSelectedClass, navigation, classText]);
  const onDeleteClassItem = useCallback(
    item => {
      const listSelectedClassTemp = [...listSelectedClass];
      remove(listSelectedClassTemp, el => {
        return el.code === item.code;
      });
      setListSelectedClass(listSelectedClassTemp);
    },
    [listSelectedClass],
  );
  //parent
  const onModalSelectParent = selectedItem => {
    setListSelectedParent(selectedItem);
  };
  const onSelectParent = useCallback(() => {
    navigation.navigate('ModalScreen', {
      Screen: screenProps => <MultipleSelect {...screenProps} />,
      ScreenProps: {
        // handleSearchData: api.property.getAll,
        handleSelect: onModalSelectParent,
        listSelected: listSelectedParent,
        separator: true,
        modalTitle: parent,
      },
    });
  }, [listSelectedParent, navigation, parent]);
  const onDeleteParentItem = useCallback(
    item => {
      const listSelectedParentTemp = [...listSelectedParent];
      remove(listSelectedParentTemp, el => {
        return el.code === item.code;
      });
      setListSelectedParent(listSelectedParentTemp);
    },
    [listSelectedParent],
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
          label={ages}
          placeholder={placeholderAges}
          onSelectItems={onSelectNational}
          onDeleteItem={onDeleteAgeItem}
          listItems={listSelectedAge}
        />
        <InputMultipleTag
          label={classText}
          placeholder={placeholderClass}
          onSelectItems={onSelectClass}
          onDeleteItem={onDeleteClassItem}
          listItems={listSelectedClass}
        />
        <InputMultipleTag
          label={parent}
          placeholder={placeholderParents}
          onSelectItems={onSelectParent}
          onDeleteItem={onDeleteParentItem}
          listItems={listSelectedParent}
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

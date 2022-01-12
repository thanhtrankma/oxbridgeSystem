import React, {memo, useState, useCallback, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  DeviceEventEmitter,
} from 'react-native';
import {HeaderTop} from 'components';
import {Colors} from 'assets';
import {SearchBar, Icon} from 'react-native-elements';
import {AlphabetList} from 'react-native-section-alphabet-list';
import {useTranslation, convertArrayStudent} from 'utils';
import {FloatingAction} from 'react-native-floating-action';
import API from 'api';

const Parent = ({navigation, route}) => {
  const {
    parent,
    noInformation,
    placeholderSearchTeacher,
    cancel,
    filter,
    addNew,
  } = useTranslation();
  const actions = [
    {
      text: filter,
      icon: (
        <Icon type="feather" name="sliders" size={25} color={Colors.white} />
      ),
      name: 'bt_filter',
      position: 2,
    },
    {
      text: addNew,
      icon: <Icon type="feather" name="plus" size={25} color={Colors.white} />,
      name: 'bt_addnew',
      position: 2,
    },
  ];
  const data = [
    {value: 'Lillie-Mai Allen', key: 'lCUTs2'},
    {value: 'Emmanuel Goldstein', key: 'TXdL0c'},
    {value: 'Winston Smith', key: 'zqsiEw'},
    {value: 'William Blazkowicz', key: 'psg2PM'},
    {value: 'Gordon Comstock', key: '1K6I18'},
    {value: 'Philip Ravelston', key: 'NVHSkA'},
    {value: 'Rosemary Waterlow', key: 'SaHqyG'},
    {value: 'Julia Comstock', key: 'iaT1Ex'},
    {value: 'Mihai Maldonado', key: 'OvMd5e'},
    {value: 'Murtaza Molina', key: '25zqAO'},
    {value: 'Peter Petigrew', key: '8cWuu3'},
  ];
  const [keyword, setKeyword] = useState('');
  const [listCustomer, setListCustomer] = useState([]);
  const [isShowCancel, setIsShowCancel] = useState(false);
  const [isShowClearIcon, setIsShowClearIcon] = useState(true);
  const [isShowLoading, setIsShowLoading] = useState(false);
  const [listData, setListData] = useState([]);
  const inputRef = useRef(null);
  useEffect(() => {
    onRefresh();
  }, [onRefresh]);
  const onRefresh = useCallback(() => {
    const parmas = {
      page: 1,
      pageSize: 100,
    };
    API.parent.getListParents(parmas).then(res => {
      setListData(convertArrayStudent(res));
    });
  }, []);
  useEffect(() => {
    const listener = DeviceEventEmitter.addListener(
      'refreshListParent',
      onRefresh,
    );
    return () => {
      listener.remove();
    };
  }, [onRefresh]);

  const actionBtnLeft = () => {
    navigation.goBack();
  };

  const actionBtnParent = item => {
    navigation.navigate('ParentDetail', {item: item.account});
  };
  const actionBtnRight = () => {
    navigation.navigate('ParentAdd');
  };
  const onSelectProperty = useCallback(() => {
    navigation.navigate('ParentFilter');
  }, [navigation]);
  const actionBtnFloat = name => {
    switch (name) {
      case 'bt_filter':
        onSelectProperty();
        break;
      case 'bt_addnew':
        actionBtnRight();
        break;

      default:
        break;
    }
  };
  const onChangeSearch = text => {
    setKeyword(text);
  };
  useEffect(() => {
    setIsShowLoading(true);
    const parmas = {
      page: 1,
      pageSize: 20,
      name: keyword,
    };
    API.parent.getListParents(parmas).then(res => {
      setListData(convertArrayStudent(res));
      setIsShowLoading(false);
    });
  }, [keyword]);
  const onFocusSearch = () => {
    setIsShowCancel(true);
  };
  const onBlurSearch = () => {
    // setIsShowCancel(false);
    if (keyword === '') {
      setIsShowCancel(false);
    }
    Keyboard.dismiss();
  };
  const onClickCancelSearch = text => {
    setIsShowCancel(false);
    setKeyword('');
    Keyboard.dismiss();
  };
  const onClearSearch = text => {
    setKeyword('');
    inputRef?.current?.focus();
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
        <Icon type="feather" name="plus" size={25} color={Colors.tangerine} />
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <HeaderTop
        navigation={navigation}
        titleHeader={parent}
        btnLeft
        btnRight
        componentBtnLeft={componentBtnLeft}
        componentBtnRight={componentBtnRight}
      />
      <View style={styles.searchBarWrapper}>
        <SearchBar
          placeholder={placeholderSearchTeacher}
          onChangeText={onChangeSearch}
          inputContainerStyle={[styles.backgroundColorWhite, {height: 40}]}
          inputStyle={[styles.backgroundColorWhite, {fontSize: 15}]}
          containerStyle={styles.searchContainer}
          onFocus={onFocusSearch}
          onBlur={onBlurSearch}
          onClear={onClearSearch}
          showLoading={isShowLoading}
          ref={inputRef}
          value={keyword}
          clearIcon={isShowClearIcon}
          searchIcon={{
            type: 'font-awesome',
            color: Colors.cloudyBlue,
            name: 'search',
            size: 16,
          }}
          placeholderTextColor={Colors.cloudyBlue}
        />
        {isShowCancel && (
          <TouchableOpacity
            onPress={onClickCancelSearch}
            style={styles.btnCancelWrapper}>
            <Text style={styles.btnCancel}>{cancel}</Text>
          </TouchableOpacity>
        )}
      </View>
      {listData.length > 0 && (
        <AlphabetList
          data={listData}
          indexLetterStyle={styles.sectionHeaderLabel}
          indexLetterColor={Colors.uglyBlue}
          style={styles.containerList}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          renderCustomItem={item => (
            <TouchableOpacity
              style={styles.listItemContainer}
              onPress={() => actionBtnParent(item)}>
              <View>
                <Text style={styles.listItemLabel}>{item.value}</Text>
                <Text style={styles.listItemPhone}>
                  {item.key ? item.value : noInformation}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          renderCustomSectionHeader={section => (
            <View style={styles.sectionHeaderContainer}>
              <Text style={styles.sectionHeaderLabel}>{section.title}</Text>
            </View>
          )}
        />
      )}
      <FloatingAction
        actions={actions}
        showBackground={false}
        onPressItem={name => actionBtnFloat(name)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  btnCancel: {
    color: Colors.uglyBlue,
    fontSize: 15,
  },
  btnCancelWrapper: {
    marginLeft: 10,
  },
  searchContainer: {
    backgroundColor: 'white',
    flex: 1,
    borderWidth: 0.5,
    marginVertical: 15,
    paddingBottom: 1,
    borderRadius: 4,
    borderColor: Colors.cloudyBlue,
    borderTopColor: Colors.cloudyBlue,
    borderBottomColor: Colors.cloudyBlue,
    padding: 0,
  },
  backgroundColorWhite: {backgroundColor: 'white', color: Colors.darkGrey},
  searchBarWrapper: {
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  containerList: {
    marginBottom: 125,
  },
  boxSearchMain: {
    flexDirection: 'row',
    alignItems: 'center',
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
  listItemContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: Colors.cloudyBlue,
    borderBottomWidth: 0.5,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  listItemLabel: {
    color: Colors.darkGrey,
    fontSize: 15,
    paddingVertical: 5,
  },
  listItemPhone: {
    color: Colors.coolGreyTwo,
    fontSize: 13,
    paddingTop: 5,
  },

  sectionHeaderContainer: {
    height: 40,
    backgroundColor: Colors.paleGrey,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },

  sectionHeaderLabel: {
    color: Colors.niceBlue,
    fontSize: 11,
  },
});
export default memo(Parent);

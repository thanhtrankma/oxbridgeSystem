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
import {SearchBar, Icon, Divider} from 'react-native-elements';
import {AlphabetList} from 'react-native-section-alphabet-list';
import {useTranslation, convertArrayAlpha} from 'utils';
import {FloatingAction} from 'react-native-floating-action';
import API from 'api';

const Teacher = ({navigation, route}) => {
  const {
    teacher,
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
  const [keyword, setKeyword] = useState('');
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
    API.teacher.getListTeacher(parmas).then(res => {
      setListData(convertArrayAlpha(res));
    });
  }, []);
  useEffect(() => {
    const listener = DeviceEventEmitter.addListener(
      'refreshListTeacher',
      onRefresh,
    );
    return () => {
      listener.remove();
    };
  }, [onRefresh]);

  const actionBtnLeft = () => {
    navigation.goBack();
  };

  const actionBtnTeacher = item => {
    navigation.navigate('TeacherDetail', {item});
  };
  const actionBtnRight = () => {
    navigation.navigate('TeacherAdd');
  };
  const onSelectProperty = useCallback(() => {
    navigation.navigate('TeacherFilter');
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
      email: keyword,
      phone: keyword,
    };
    API.teacher.getListTeacher(parmas).then(res => {
      setListData(convertArrayAlpha(res));
      setIsShowLoading(false);
    });
  }, [keyword]);
  const onFocusSearch = () => {
    setIsShowCancel(true);
  };
  const onBlurSearch = () => {
    setIsShowCancel(false);
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
        titleHeader={teacher}
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
              onPress={() => actionBtnTeacher(item)}>
              <View style={styles.listItemWrapper}>
                <View>
                  <Text style={styles.listItemLabel}>{item.value}</Text>
                  <Text style={styles.listItemPhone}>
                    {item.phone ? item.phone : noInformation}
                  </Text>
                </View>
                <View>
                  <Text style={styles.listItemLabel}>
                    {item?.education || ''}
                  </Text>
                  <Text style={styles.listItemAge}>
                    {item.email ? item.email : noInformation}
                  </Text>
                </View>
              </View>
              <Divider
                orientation="horizontal"
                style={styles.divider}
                color={Colors.cloudyBlue}
              />
              <View>
                <Text style={styles.listItemLabel}>{item.national}</Text>
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
  listItemAge: {
    color: Colors.coolGreyTwo,
    fontSize: 13,
    paddingTop: 5,
    alignSelf: 'flex-end',
  },
  listItemWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: Colors.cloudyBlue,
    alignItems: 'center',
  },
  divider: {
    marginVertical: 10,
  },
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
    borderBottomColor: Colors.cloudyBlue,
    borderBottomWidth: 0.5,
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
export default memo(Teacher);

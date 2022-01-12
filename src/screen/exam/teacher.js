import React, {memo, useCallback, useEffect, useState, useRef} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  DeviceEventEmitter,
  Platform,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {Colors} from 'assets';
import {ItemEdu, HeaderTop} from 'components';
import {useTranslation} from 'utils';
import API from 'api';
import DropDownPicker from 'react-native-dropdown-picker';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';

const renderHeigthItem = () => {
  if (Platform.OS === 'ios') {
    return 181;
  }
  const heightWindow = Dimensions.get('window').height;
  if (heightWindow > 700) {
    return 190;
  }
  return 186;
};
const itemHeight = renderHeigthItem();
const Exam = ({navigation}) => {
  const {examManagement, nodata} = useTranslation();
  const [loading, setLoading] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState([
    {id: 1, name: 'K12 Tech', statusText: 'Active'},
    {id: 2, name: 'K13 Adobe', statusText: 'Active'},
    {id: 3, name: 'K13 Power', statusText: 'Active'},
    {id: 4, name: 'K14 Enegy', statusText: 'Active'},
    {id: 5, name: 'K15 KingSton', statusText: 'Active'},
  ]);
  const dataTest = [
    {label: 'Item 1', value: '1'},
    {label: 'Item 2', value: '2'},
    {label: 'Item 3', value: '3'},
    {label: 'Item 4', value: '4'},
    {label: 'Item 5', value: '5'},
    {label: 'Item 6', value: '6'},
    {label: 'Item 7', value: '7'},
    {label: 'Item 8', value: '8'},
  ];
  const [isEmptyPage, setSetIsEmptyPage] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const totalPages = useRef(0);
  const [openSelectCourse, setOpenSelectCourse] = useState(false);
  const [valueSelectCourse, setValueSelectCourse] = useState(null);
  const [itemsSelectCourse, setItemsSelectCourse] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
    {label: 'Apple1', value: 'apple1'},
    {label: 'Banana2', value: 'banana2'},
    {label: 'Apple3', value: 'apple3'},
    {label: 'Banana4', value: 'banan4a'},
    {label: 'Apple5', value: 'apple5'},
    {label: 'Banana6', value: 'banana6'},
  ]);
  const [openSelectClass, setOpenSelectClass] = useState(false);
  const [valueSelectClass, setValueSelectClass] = useState(null);
  const [itemsSelectClass, setItemsSelectClass] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
  ]);

  // useEffect(() => {
  //   const listener = DeviceEventEmitter.addListener(
  //     'updateProductDeman',
  //     onRefresh,
  //   );
  //   return () => {
  //     listener.remove();
  //   };
  // }, []);
  useEffect(() => {
    API.teacher.getDetail().then(res => {
      console.log('resa ', res);
    });
  }, []);

  const handerLoadMore = useCallback(() => {
    if (loading) {
      return;
    }
    if (pageCount >= totalPages.current) {
      return;
    }
    setLoading(true);
    if (pageCount === 0) {
      return;
    }
    // getData(route.key !== 'ALL' ? route.key : '', queryString || '');
  }, [loading, pageCount]);

  const renderFooter = useCallback(() => {
    return loading ? (
      <View>
        <ActivityIndicator color={Colors.darkGrey} size="small" />
      </View>
    ) : null;
  }, [loading]);
  const onRefresh = useCallback(() => {
    setIsRefresh(true);
    setPageCount(0);
    setTimeout(() => {
      setIsRefresh(false);
    }, 1000);
  }, []);
  const keyExtractor = item => {
    return item.id.toString();
  };
  const renderItem = item => {
    return <ItemEdu item={item} navigation={navigation} />;
  };
  const renderEmptyPage = () => {
    return (
      <View style={styles.textEmptyWrapper}>
        <View style={styles.textEmptyWrapper}>
          <Text style={styles.textEmpty}>{nodata}</Text>
        </View>
      </View>
    );
  };
  const getItemLayout = (data, index) => ({
    length: itemHeight,
    offset: itemHeight * index,
    index,
  });

  const actionBtnRight = () => {
    navigation.navigate('ExamTeacherAdd');
  };
  const componentBtnRight = () => {
    return (
      <TouchableOpacity onPress={actionBtnRight} style={styles.boxRight}>
        <Icon type="feather" name="plus" size={25} color={Colors.tangerine} />
      </TouchableOpacity>
    );
  };
  return (
    <>
      <SafeAreaView style={{backgroundColor: Colors.white}}>
        <HeaderTop
          navigation={navigation}
          titleHeader={examManagement}
          btnRight
          componentBtnRight={componentBtnRight}
        />
        <View style={styles.wrapperSelect}>
          <View style={{width: '47%'}}>
            <MultiSelect
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              data={itemsSelectCourse}
              labelField="label"
              valueField="value"
              placeholder="Chọn khóa học"
              value={selected}
              onChange={item => {
                setSelected(item);
              }}
              renderLeftIcon={() => (
                <Icon
                  type="antdesign"
                  name="indent-left"
                  size={18}
                  color={Colors.tangerine}
                  style={{marginRight: 5}}
                />
              )}
              selectedStyle={styles.selectedStyle}
            />
          </View>
          <View style={{width: '47%'}}>
            <MultiSelect
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={itemsSelectCourse}
              labelField="label"
              valueField="value"
              placeholder="Chọn lớp học"
              value={selected}
              onChange={item => {
                setSelected(item);
              }}
              renderLeftIcon={() => (
                <Icon
                  type="antdesign"
                  name="menu-fold"
                  size={18}
                  color={Colors.tangerine}
                  style={{marginRight: 5}}
                />
              )}
              selectedStyle={styles.selectedStyle}
            />
          </View>
        </View>
        <View>
          <FlatList
            style={styles.flatList}
            data={data}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            onEndReached={handerLoadMore}
            // extraData={isFresh}
            ListFooterComponent={renderFooter}
            onEndReachedThreshold={1}
            onRefresh={onRefresh}
            refreshing={isRefresh}
            maxToRenderPerBatch={6}
            windowSize={11}
            removeClippedSubviews
            getItemLayout={getItemLayout}
          />
        </View>
        {isEmptyPage && renderEmptyPage()}
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  // container: {padding: 16},
  wrapperSelect: {
    paddingHorizontal: 10,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropdown: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedStyle: {
    display: 'none',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: 'white',
    shadowColor: '#000',
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
  },
  //
  containerDrStyle: {
    width: '95%',
    borderColor: Colors.tangerine,
    marginVertical: 5,
    alignSelf: 'center',
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
  textEmptyWrapper: {
    alignItems: 'center',
    marginTop: 50,
  },
  textEmpty: {
    color: Colors.slateGrey,
    lineHeight: 25,
    fontSize: 15,
  },
  modalOption: {
    backgroundColor: 'white',
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 25,
    borderBottomColor: Colors.cloudyBlue,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  modalText: {
    fontSize: 15,
    color: Colors.darkGrey,
    fontWeight: 'normal',
    marginLeft: 10,
  },
  flatList: {
    width: '100%',
    borderTopColor: 'white',
    borderTopWidth: 0,
    elevation: 0,
    backgroundColor: 'white',
    marginBottom: 100,
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  imageIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginLeft: 3,
  },
});
export default memo(Exam);

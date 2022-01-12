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
const ContentTab = ({navigation}) => {
  const {edu, nodata} = useTranslation();
  const [loading, setLoading] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [data, setData] = useState([
    {id: 1, name: 'K12 Tech', statusText: 'Active'},
    {id: 2, name: 'K13 Adobe', statusText: 'Active'},
    {id: 3, name: 'K13 Power', statusText: 'Active'},
    {id: 4, name: 'K14 Enegy', statusText: 'Active'},
    {id: 5, name: 'K15 KingSton', statusText: 'Active'},
  ]);
  const [isEmptyPage, setSetIsEmptyPage] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const totalPages = useRef(0);

  useEffect(() => {
    const listener = DeviceEventEmitter.addListener(
      'updateProductDeman',
      onRefresh,
    );
    return () => {
      listener.remove();
    };
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
        <Text style={styles.textEmpty}>{nodata}</Text>
      </View>
    );
  };
  const getItemLayout = (data, index) => ({
    length: itemHeight,
    offset: itemHeight * index,
    index,
  });
  const actionBtnLeft = () => {
    navigation.goBack();
  };

  const actionBtnRight = () => {
    // navigation.navigate('StudentAdd');
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
    <>
      <SafeAreaView>
        <HeaderTop
          navigation={navigation}
          titleHeader={edu}
          // btnLeft
          btnRight
          // componentBtnLeft={componentBtnLeft}
          componentBtnRight={componentBtnRight}
        />
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
export default memo(ContentTab);

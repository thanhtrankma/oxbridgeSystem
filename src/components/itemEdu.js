import React, {memo, useCallback} from 'react';
import {isEmpty, isNull} from 'lodash';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Platform,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Colors} from 'assets';
import vi from 'moment/src/locale/vi';
import moment from 'moment/min/moment-with-locales';
import {Icon, Divider} from 'react-native-elements';
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

const IteamDemand = ({item, onOpenBottomModal, navigation}) => {
  const {noInformation} = useTranslation();
  const itemDetail = item.item;
  const customerName = itemDetail?.name;
  const isEmptyClassify = isEmpty(itemDetail?.classify);
  const isEmptyProperty = isEmpty(itemDetail?.propertyTypes);
  const isEmptyArea = isEmpty(itemDetail?.address);
  const isEmptyPrice = !itemDetail?.minPrice && !itemDetail?.maxPrice;
  const topAppointment = itemDetail?.topAppointment || null;

  const renderClassifyText = () => {
    if (isEmptyClassify) {
      return noInformation;
    }
    return itemDetail?.classify?.code === 'BUY' ? 'Mua' : 'Thuê';
  };
  const renderPropertyText = () => {
    if (isEmptyProperty) {
      return noInformation;
    }
    const text = itemDetail.propertyTypes[0].text;
    if (itemDetail.propertyTypes.length === 1) {
      return text;
    }
    const count = itemDetail.propertyTypes.length - 1;
    return `${text} (+${count})`;
  };
  const renderAreaText = () => {
    if (isEmptyArea) {
      return noInformation;
    }
    const text = itemDetail.address[0]?.path || '';
    if (itemDetail.address.length === 1) {
      return text;
    }
    const count = itemDetail.address.length - 1;
    return `${text} (+${count})`;
  };
  const renderAvatar = () => {
    const fullname = itemDetail?.name;
    const word1 = fullname[0];
    const word2 = fullname.split(' ')[1] || '';
    return (word1[0] + (word2[0] || '')).toUpperCase();
  };
  const renderPriceRange = () => {
    return noInformation;
  };
  const renderScheduleText = () => {
    if (isNull(topAppointment)) {
      return (
        <Text style={styles.itemPriceEmpty} numberOfLines={1}>
          {noInformation}
        </Text>
      );
    }

    return (
      <View style={styles.scheduleTextContent}>
        {!isNull(topAppointment.bookTime) ? (
          <Text style={styles.scheduleText}>
            {`${convertTime(topAppointment.bookTime)} - `}
          </Text>
        ) : (
          <Text style={styles.itemPriceEmpty}>{noInformation}</Text>
        )}
        {!isNull(topAppointment.agentNote) ? (
          <Text style={styles.scheduleText} numberOfLines={1}>
            {topAppointment.agentNote.length > 35
              ? topAppointment.agentNote.substring(0, 35 - 3) + '...'
              : topAppointment.agentNote}
          </Text>
        ) : (
          <Text style={styles.itemPriceEmpty}>{noInformation}</Text>
        )}
      </View>
    );
  };
  const convertTime = time => {
    return moment(time).locale('vi', vi).format('HH:mm, ddd DD/MM/YYYY');
  };
  const onClickIconMore = () => {
    onOpenBottomModal(item);
  };
  const onNavigateToDetail = useCallback(() => {
    navigation.navigate('Classes', {
      itemDetail,
    });
  }, [itemDetail, navigation]);

  return (
    <View style={styles.itemWrapper}>
      <TouchableOpacity onPress={onNavigateToDetail} style={styles.itemHeader}>
        <View style={styles.itemNameWrapper}>
          <View style={styles.itemAvt}>
            <Text style={styles.itemAvtText}>{renderAvatar()}</Text>
          </View>
          <View style={styles.customerName}>
            <Text style={styles.itemName} numberOfLines={1}>
              {customerName}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <ScrollView
        style={styles.optionsWrapper}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        <View style={styles.itemClassify}>
          <Text
            style={
              isEmptyClassify
                ? styles.itemClassifyEmpty
                : styles.itemClassifyText
            }>
            {renderClassifyText()}
          </Text>
        </View>
        <View style={styles.itemProperty}>
          <Text
            style={
              isEmptyProperty
                ? styles.itemPropertyEmpty
                : styles.itemPropertyText
            }>
            {renderPropertyText()}
          </Text>
        </View>
        <View style={styles.itemArea}>
          <Text
            style={isEmptyArea ? styles.itemAreaEmpty : styles.itemAreaText}>
            {renderAreaText()}
          </Text>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={onNavigateToDetail}
        style={styles.itemFooterWrapper}>
        <View style={styles.itemPriceWrapper}>
          <Icon
            name="tag-outline"
            type="material-community"
            color={Colors.coolGreyTwo}
            size={15}
          />
          <View style={styles.itemTextPrice}>
            <Text
              style={isEmptyPrice ? styles.itemPriceEmpty : styles.itemPrice}>
              {renderPriceRange()}
            </Text>
          </View>
        </View>
        <View style={styles.itemStatus}>
          <Text style={styles.itemStatusText}>{itemDetail?.statusText}</Text>
        </View>
      </TouchableOpacity>
      <Divider
        orientation="horizontal"
        style={styles.divider}
        color={Colors.cloudyBlue}
      />
      <View style={styles.scheduleWrapper}>
        <Icon
          name="clock-outline"
          type="material-community"
          color={Colors.coolGreyTwo}
          size={15}
        />
        <View style={styles.scheduleTextWrapper}>{renderScheduleText()}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scheduleWrapper: {
    flexDirection: 'row',
  },
  scheduleTextWrapper: {
    paddingLeft: 10,
    width: '96%',
  },
  scheduleText: {
    fontSize: 12,
    color: Colors.darkGrey,
  },
  divider: {
    marginVertical: 10,
  },
  customerName: {
    width: '79%',
  },
  itemAvt: {
    backgroundColor: Colors.uglyBlue,
    borderRadius: 25,
    width: 35,
    height: 35,
    marginRight: 15,
    alignItems: 'center',
    paddingTop: 9,
  },
  itemNameWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconMore: {
    width: 50,
    height: 30,
    marginRight: -20,
    paddingVertical: 5,
  },
  itemWrapper: {
    height: itemHeight,
    padding: 15,
    borderBottomWidth: 5,
    borderBottomColor: Colors.cloudyBlue30,
    justifyContent: 'space-between',
  },
  itemAvtText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  itemName: {
    color: Colors.darkGrey,
    fontSize: 15,
  },
  optionsWrapper: {
    flexDirection: 'row',
    marginBottom: 15,
    zIndex: 1000,
  },
  itemClassify: {
    borderWidth: 0.5,
    borderColor: Colors.tangerine,
    borderRadius: 2,
    paddingHorizontal: 5,
    paddingVertical: 2.5,
    marginRight: 10,
  },
  itemClassifyText: {
    color: Colors.tangerine,
    fontSize: 12,
  },
  itemClassifyEmpty: {
    color: Colors.lightPeach,
    fontStyle: 'italic',
    fontSize: 12,
  },
  itemProperty: {
    borderWidth: 0.5,
    borderColor: Colors.cloudyBlue,
    borderRadius: 2,
    paddingHorizontal: 5,
    paddingVertical: 2.5,
    marginRight: 10,
    fontSize: 12,
  },
  itemPropertyText: {
    color: Colors.darkGrey,
    fontSize: 12,
  },
  itemPropertyEmpty: {
    color: Colors.cloudyBlue,
    fontStyle: 'italic',
    fontSize: 12,
  },
  itemArea: {
    borderWidth: 0.5,
    borderColor: Colors.cloudyBlue,
    borderRadius: 2,
    paddingHorizontal: 5,
    paddingVertical: 2.5,
  },
  itemAreaText: {
    color: Colors.darkGrey,
    fontSize: 12,
  },
  itemAreaEmpty: {
    color: Colors.cloudyBlue,
    fontStyle: 'italic',
    fontSize: 12,
  },
  itemFooterWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemPriceWrapper: {
    flexDirection: 'row',
  },
  itemTextPrice: {
    marginLeft: 10,
  },
  itemPrice: {
    color: Colors.darkGrey,
    flexShrink: 1,
    fontSize: 12,
  },
  itemPriceEmpty: {
    color: Colors.cloudyBlue,
    fontStyle: 'italic',
    fontSize: 12,
  },
  itemStatus: {
    padding: 5,
    backgroundColor: Colors.paleGrey,
  },
  itemStatusText: {
    color: Colors.leafyGreen,
    fontSize: 12,
  },
  scheduleTextContent: {
    flexDirection: 'row',
  },
});

export default memo(IteamDemand);

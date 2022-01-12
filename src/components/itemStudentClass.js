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
    return 121;
  }
  const heightWindow = Dimensions.get('window').height;
  if (heightWindow > 700) {
    return 130;
  }
  return 126;
};
const itemHeight = renderHeigthItem();

const Item = ({item, onOpenBottomModal, navigation}) => {
  const {noInformation} = useTranslation();
  const itemDetail = item.item;
  const customerName = itemDetail?.name;
  const isEmptyPrice = !itemDetail?.minPrice && !itemDetail?.maxPrice;
  const topAppointment = itemDetail?.topAppointment || null;

  const renderAvatar = () => {
    const fullname = itemDetail?.name;
    const word1 = fullname[0];
    const word2 = fullname.split(' ')[1] || '';
    return (word1[0] + (word2[0] || '')).toUpperCase();
  };
  const renderPriceRange = () => {
    return noInformation;
  };
  const onClickIconMore = () => {
    onOpenBottomModal(item);
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

  return (
    <View style={styles.itemWrapper}>
      <TouchableOpacity style={styles.itemHeader}>
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
        <TouchableOpacity style={styles.iconMore} onPress={onClickIconMore}>
          <Icon
            name="ellipsis-v"
            type="font-awesome-5"
            color={Colors.coolGreyTwo}
            size={13}
          />
        </TouchableOpacity>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.itemFooterWrapper}>
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
      </TouchableOpacity> */}
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

export default memo(Item);

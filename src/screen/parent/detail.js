import _ from 'lodash';
import React, {memo, useState, useEffect, useRef, useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  ScrollView,
} from 'react-native';
import {HeaderTop2} from 'components';
import {Colors} from 'assets';
import Modal from 'react-native-modal';
import {Icon} from 'react-native-elements';
// import CustomerApi from 'api/customer-api';
import {useTranslation} from 'utils';
import moment from 'moment';

const CustomerDetail = ({route, navigation}) => {
  const {
    basicInfo,
    workingInformation,
    identityCard,
    literacy,
    roles,
    subjects,
    contractType,
    workplace,
    nationality,
    noInformation,
    edit,
    inactive,
  } = useTranslation();
  const customerDetailRoute = route?.params?.item;
  console.log(customerDetailRoute);
  const [customerDetail, setCustomerDetail] = useState(customerDetailRoute);
  const [isShowBottomModal, setIsShowBottomModal] = useState(false);
  const [curentItem, setCurrentItem] = useState({});
  const goBack = () => {
    navigation.goBack();
  };
  const onCallPhone = () => {
    Linking.openURL(`tel:${customerDetail.phone}`);
  };
  const onMailTo = () => {
    Linking.openURL(`mailto:${customerDetail.email}`);
  };
  const onClickBtnEdit = () => {
    navigation.navigate('CustomerAddScreen', {
      action: 'EDIT',
      customerDetail: customerDetail,
    });
  };
  const onClickIconMore = item => {
    setIsShowBottomModal(true);
    setIsShowBottomModal(customerDetail);
  };
  const onCloseBottomModal = () => {
    setIsShowBottomModal(false);
  };
  return (
    <SafeAreaView style={styles.containerWrapper}>
      <HeaderTop2
        navigation={navigation}
        titleHeader={customerDetail.name}
        btnGoBack
        goBack={goBack}
      />
      <ScrollView>
        <View style={[styles.bigLabel, styles.borderBottom]}>
          <View>
            <Text style={styles.textBold}>{basicInfo}</Text>
          </View>
          <TouchableOpacity onPress={onClickIconMore} style={styles.btnMore}>
            <Icon
              name="ellipsis-v"
              type="font-awesome-5"
              color={Colors.coolGreyTwo}
              size={18}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <View style={styles.labelWrapper}>
            <View style={styles.label}>
              <Icon
                name="phone"
                type="feather"
                color={Colors.coolGreyTwo}
                size={20}
              />
            </View>
            {customerDetail.phone ? (
              <TouchableOpacity onPress={onCallPhone}>
                <Text style={styles.phone}>{customerDetail.phone}</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.textEmpty}>{noInformation}</Text>
            )}
          </View>
          <View style={styles.labelWrapper}>
            <View style={styles.label}>
              <Icon
                name="email"
                type="fontisto"
                color={Colors.coolGreyTwo}
                size={20}
              />
            </View>
            {customerDetail.email ? (
              <TouchableOpacity onPress={onMailTo}>
                <Text style={styles.phone}>{customerDetail.email}</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.textEmpty}>{noInformation}</Text>
            )}
          </View>
          <View style={styles.labelWrapper}>
            <View style={styles.label}>
              <Icon
                name="birthday-cake"
                type="font-awesome"
                color={Colors.coolGreyTwo}
                size={20}
              />
            </View>
            {customerDetail.dob ? (
              <Text style={styles.text}>
                {moment(customerDetail.dob).format('DD / MM / YYYY')}
              </Text>
            ) : (
              <Text style={styles.textEmpty}>{noInformation}</Text>
            )}
          </View>
          <View style={styles.labelWrapper}>
            <View style={styles.label}>
              <Icon
                name="user"
                type="feather"
                color={Colors.coolGreyTwo}
                size={20}
              />
            </View>
            {customerDetail.sex ? (
              <Text style={styles.text}>
                {customerDetail.sex === 'MALE' ? 'Nam' : 'Nữ'}
              </Text>
            ) : (
              <Text style={styles.textEmpty}>{noInformation}</Text>
            )}
          </View>
          <View style={styles.labelWrapper}>
            <View style={styles.label}>
              <Icon
                name="address-card-o"
                type="font-awesome"
                color={Colors.coolGreyTwo}
                size={20}
              />
            </View>
            {customerDetail.identity ? (
              <Text style={styles.text}>{customerDetail.identity}</Text>
            ) : (
              <Text style={styles.textEmpty}>{noInformation}</Text>
            )}
          </View>
          <View style={styles.labelWrapper}>
            <View style={styles.label}>
              <Icon
                name="home-outline"
                type="ionicon"
                color={Colors.coolGreyTwo}
                size={20}
              />
            </View>
            {customerDetail.address ? (
              <Text style={styles.text}>{customerDetail.address}</Text>
            ) : (
              <Text style={styles.textEmpty}>{noInformation}</Text>
            )}
          </View>
        </View>
      </ScrollView>
      <Modal
        isVisible={isShowBottomModal}
        onBackdropPress={onCloseBottomModal}
        backdropColor={Colors.backDropColor}
        style={styles.bottomModal}>
        <View
          style={{
            backgroundColor: Colors.white,
          }}>
          <TouchableOpacity style={styles.modalOption}>
            <Icon
              name="edit"
              type="feather"
              color={Colors.slateGrey}
              size={20}
            />
            <Text style={styles.modalText}>{edit}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalOption}>
            <Icon
              type="antdesign"
              name="closecircleo"
              size={20}
              color={Colors.slateGrey}
            />
            <Text style={styles.modalText}>{inactive}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  btnMore: {
    width: 50,
    marginRight: -20,
  },
  modalText: {
    fontSize: 15,
    color: Colors.darkGrey,
    fontWeight: 'normal',
    marginLeft: 10,
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
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  containerWrapper: {
    backgroundColor: '#fff',
    flex: 1,
  },
  container: {
    backgroundColor: '#fff',
    flex: 10,
    paddingHorizontal: 20,
  },
  fontSize14: {
    fontSize: 14,
  },
  bigLabel: {
    backgroundColor: Colors.paleGrey,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: 15,
    paddingHorizontal: 20,
    height: 50,
  },
  textBold: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  borderBottom: {
    borderBottomWidth: 0.5,
    borderColor: Colors.cloudyBlue,
  },
  borderTop: {
    borderTopWidth: 0.5,
    borderColor: Colors.cloudyBlue,
  },
  marginTop: {
    marginTop: 20,
  },
  btnEdit: {
    color: Colors.uglyBlue,
  },
  label: {
    fontSize: 15,
    marginVertical: 8,
    width: 50,
    alignItems: 'flex-start',
  },
  labelText: {
    // fontSize: 15,
    // marginVertical: 8,
    width: 210,
    // alignItems: 'flex-start',
  },
  labelWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 5,
  },
  phone: {
    fontSize: 15,
    color: Colors.uglyBlue,
  },
  text: {
    fontSize: 15,
    color: Colors.darkGrey,
    marginRight: 50,
    lineHeight: 30,
  },
  textEmpty: {
    fontSize: 15,
    color: Colors.cloudyBlue,
    marginRight: 50,
    lineHeight: 30,
    fontStyle: 'italic',
  },
});
export default memo(CustomerDetail);

import React, {memo, useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  DeviceEventEmitter,
} from 'react-native';
import {HeaderTop2} from 'components';
import {Colors, Images} from 'assets';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import {Icon} from 'react-native-elements';
import {storage, useTranslation} from 'utils';
import {AuthContext} from 'components';

const Menu = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const {logout, profile} = useTranslation();
  const {signOut} = React.useContext(AuthContext);
  const onLogOut = () => {
    storage.remove({
      key: 'loginState',
    });
    signOut();
    DeviceEventEmitter.emit('refreshToken');
  };
  useEffect(() => {
    const refreshToken = () => {
      // setTimeout(() => {
      storage
        .load({
          key: 'loginState',
          autoSync: true,
          syncInBackground: true,
          syncParams: {
            extraFetchOptions: {
              // blahblah
            },
            someFlag: true,
          },
        })
        .then(ret => {
          setName(ret?.user?.name || '');
          setEmail(ret?.user?.email || '');
        })
        .catch(err => {
          console.warn(err.message);
          switch (err.name) {
            case 'NotFoundError':
              // TODO;
              break;
            case 'ExpiredError':
              // TODO
              break;
          }
        });
    };
    refreshToken();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderTop2 titleHeader={profile} />
      <View style={styles.boxMainUser}>
        <View style={[styles.boxImageColLeft, styles.boxCenterIcon]}>
          <Image
            source={Images.oxAvt}
            style={styles.boxImageColLeft}
            resizeMode="cover"
          />
        </View>
        <View style={styles.boxContentUser}>
          <Text style={styles.titleUser}>{name}</Text>
          <Text style={styles.companyUser}>{email}</Text>
        </View>
      </View>
      <TouchableOpacity>
        <View style={styles.boxMainBtn}>
          <Icon
            name="contacts"
            type="antdesign"
            color={Colors.uglyBlue}
            size={20}
          />
          <Text style={styles.textBtn}>{profile}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onLogOut}>
        <View style={styles.boxMainBtn}>
          <IconMaterialCommunity name="logout" size={20} color="#44b7b3" />
          <Text style={styles.textBtn}>{logout}</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  borderCustomStyle: {
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  textMainLoading: {marginTop: 20, fontSize: 15, color: Colors.darkGrey},
  boxMainLoading: {
    position: 'absolute',
    width: 300,
    height: 260,
    justifyContent: 'center',
    alignItems: 'center',
    top: (Dimensions.get('window').height - 260) / 2,
    left: (Dimensions.get('window').width - 300) / 2,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  boxMainUser: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderBottomWidth: 0.5,
    borderColor: Colors.cloudyBlue,
  },
  boxMainBtn: {
    borderBottomWidth: 0.5,
    borderColor: Colors.cloudyBlue,
    // paddingVertical: 12,
    flexDirection: 'row',
    paddingHorizontal: 25,
    alignItems: 'center',
    height: 50,
  },
  textBtn: {
    fontSize: 15,
    color: Colors.darkGrey,
    lineHeight: 20,
    marginLeft: 20,
    justifyContent: 'center',
  },
  boxContentUser: {justifyContent: 'flex-start', marginLeft: 15},
  container: {
    backgroundColor: '#fff',
    flex: 1,
    position: 'relative',
  },
  content: {
    padding: 15,
  },
  titleWarning: {
    fontSize: 15,
    color: Colors.darkGrey,
    textAlign: 'center',
  },
  boxImageColLeft: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  boxCenterIcon: {
    // backgroundColor: '#fedeb1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleUser: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.slateGrey,
    lineHeight: 20,
  },
  companyUser: {
    fontSize: 13,
    lineHeight: 17,
    color: Colors.coolGreyTwo,
  },
});
export default memo(Menu);

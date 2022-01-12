import React, {memo} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {HeaderTop} from 'components';
import {Colors} from 'assets';
import {Icon} from 'react-native-elements';
import {AlphabetList} from 'react-native-section-alphabet-list';
import {useTranslation} from 'utils';

const Teacher = ({navigation, route}) => {
  const queryString = route?.params?.qs;
  console.log(queryString);
  const {viewResult, noInformation} = useTranslation();
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

  const actionBtnLeft = () => {
    navigation.goBack();
  };

  const actionBtnTeacher = () => {
    navigation.navigate('TeacherDetail');
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
  return (
    <SafeAreaView style={styles.container}>
      <HeaderTop
        navigation={navigation}
        titleHeader={viewResult}
        btnLeft
        componentBtnLeft={componentBtnLeft}
      />
      {data.length > 0 && (
        <AlphabetList
          data={data}
          indexLetterStyle={styles.sectionHeaderLabel}
          indexLetterColor={Colors.uglyBlue}
          style={styles.containerList}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          renderCustomItem={item => (
            <TouchableOpacity
              style={styles.listItemContainer}
              onPress={actionBtnTeacher}>
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
    marginBottom: 50,
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
export default memo(Teacher);

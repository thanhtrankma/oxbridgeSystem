import React, {memo} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {Colors} from 'assets';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';

const NoticationDialog = ({
  titleTop,
  contentModal,
  textBtnLeft,
  textBtnRight,
  actionModalLeft,
  actionModalRight,
  isNotBackground,
}) => {
  return (
    <>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={[styles.container, !isNotBackground && styles.background]}>
          <View style={styles.modal}>
            <View style={styles.row}>
              {titleTop && <Text style={styles.titleTop}>{titleTop}</Text>}
              <Text style={styles.contentHeader}>{contentModal}</Text>
            </View>
            <View style={styles.boxBtnSubmit}>
              <TouchableOpacity
                style={styles.btnClose}
                onPress={actionModalLeft}>
                <TouchableOpacity
                  onPress={actionModalLeft}
                  style={styles.styleBtnAction}>
                  <Text style={styles.textBtnLeft}>{textBtnLeft}</Text>
                </TouchableOpacity>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnConfirm}
                onPress={actionModalRight}>
                <TouchableOpacity
                  onPress={actionModalRight}
                  style={styles.styleBtnAction}>
                  <Text style={styles.textBtnRight}>{textBtnRight}</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    backgroundColor: '#24242699',
  },
  modal: {
    width: '75%',
    backgroundColor: 'white',
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
  row: {
    paddingVertical: 25,
    paddingHorizontal: 33,
  },
  titleTop: {
    fontSize: 15,
    color: Colors.darkGrey,
    lineHeight: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contentHeader: {
    fontSize: 13,
    lineHeight: 20,
    marginTop: 10,
    color: Colors.darkGrey,
    textAlign: 'center',
  },
  boxBtnSubmit: {
    flexDirection: 'row',
    height: 46,
    justifyContent: 'space-between',
    borderTopWidth: 0.5,
    borderColor: Colors.cloudyBlue,
  },
  btnClose: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 0.5,
    borderColor: Colors.cloudyBlue,
  },
  btnConfirm: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.cloudyBlue,
  },
  textBtnRight: {
    color: Colors.tangerine,
    fontSize: 15,
    fontWeight: 'bold',
  },
  textBtnLeft: {
    color: Colors.slateGrey,
    fontSize: 15,
  },
});
export default memo(NoticationDialog);

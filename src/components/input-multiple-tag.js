import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from 'assets';
import {Icon} from 'react-native-elements';

const InputMultipleTag = ({
  placeholder,
  label,
  listItems,
  onDeleteItem,
  onSelectItems,
}) => {
  return (
    <View style={styles.wrapperElement}>
      <View style={styles.labelSelectWrapper}>
        <Text style={[styles.labelSelect]}>{label}</Text>
        {listItems.length > 0 && (
          <Text
            style={[styles.labelSelectNumber]}>{`(${listItems.length})`}</Text>
        )}
      </View>
      <TouchableOpacity onPress={onSelectItems} style={[styles.buttonStyle]}>
        {listItems?.length > 0 ? (
          <View style={styles.selectedItemWrapper}>
            {listItems.map((el, index) => (
              <TouchableOpacity
                style={styles.selectedItem}
                key={el.path || el.code || el.id}
                onPress={() => onDeleteItem(el)}>
                <View style={styles.selectedItemInner}>
                  <Text style={styles.selectedItemText} numberOfLines={1}>
                    {el.text || el.tradeName || el.path || el.name}
                  </Text>
                  <Icon
                    name="close"
                    type="ionicon"
                    color={Colors.coolGreyTwo}
                    size={16}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <Text style={[styles.titleStyle]}>{placeholder}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapperElement: {
    marginTop: 10,
  },
  labelSelect: {
    color: Colors.darkGrey,
    fontSize: 15,
    marginVertical: 8,
  },
  labelSelectWrapper: {
    flexDirection: 'row',
  },
  labelSelectNumber: {
    color: Colors.uglyBlue,
    fontSize: 15,
    marginVertical: 8,
    marginLeft: 4,
  },
  buttonStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: Colors.cloudyBlue,
    backgroundColor: 'transparent',
    marginBottom: 20,
    padding: 10,
  },
  selectedItemWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  selectedItem: {
    padding: 10,
    backgroundColor: Colors.paleGrey,
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: Colors.cloudyBlue,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  selectedItemText: {
    color: Colors.darkGrey,
    marginRight: 8,
    maxWidth: '93%',
  },
  selectedItemInner: {
    flexDirection: 'row',
  },
  titleStyle: {
    color: Colors.coolGrey,
    fontSize: 15,
    fontWeight: 'normal',
    flex: 1,
  },
});

export default InputMultipleTag;

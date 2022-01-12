import React, {memo} from 'react';
import DatePicker from 'react-native-date-picker';
import * as RNLocalize from 'react-native-localize';

const DateTimePickerComponent = ({dateTime, onChangeDate}) => {
  const dateTimeNow = new Date();
  const local = RNLocalize.getLocales();
  const language = local[0].languageCode;
  return (
    <>
      <DatePicker
        date={
          dateTime
            ? dateTime
            : new Date(dateTimeNow.setHours(dateTimeNow.getHours()))
        }
        onDateChange={date => onChangeDate(date)}
        minimumDate={new Date(dateTimeNow.setHours(dateTimeNow.getHours()))}
        locale={language}
        androidVariant="nativeAndroid"
        mode="datetime"
        is24hourSource="locale"
      />
    </>
  );
};

export default memo(DateTimePickerComponent);

import {map, find} from 'lodash';

export const formatAmount = amount => {
  if (!amount) {
    return '';
  }
  return amount.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
};

export const getNumberOnly = string => {
  return string.replace(/[^0-9.]/g, '');
};

export const formatCurrency = amount => {
  if (!amount) {
    return '';
  }
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const checkValue = (str, max) => {
  if (str.charAt(0) !== '0' || str == '00') {
    var num = parseInt(str);
    if (isNaN(num) || num <= 0 || num > max) {
      num = 1;
    }
    str =
      num > parseInt(max.toString().charAt(0)) && num.toString().length == 1
        ? '0' + num
        : num.toString();
  }
  return str;
};

export const autoFormatDate = text => {
  var input = text;
  if (/\D\/$/.test(input)) {
    input = input.substr(0, input.length - 3);
  }
  var values = input.split('/').map(function (v) {
    return v.replace(/\D/g, '');
  });
  if (values[0]) {
    values[0] = checkValue(values[0], 31);
  }
  if (values[1]) {
    values[1] = checkValue(values[1], 12);
  }
  var output = values.map(function (v, i) {
    return v.length === 2 && i < 2 ? v + ' / ' : v;
  });
  return output.join('').substr(0, 14);
};

export const genarateQueryString = data => {
  const qs = Object.keys(data)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');
  return qs;
};
export const formatPhoneNumber = phone => {
  let phoneNumber = phone;
  phoneNumber = phoneNumber.replace(/\s/g, '');
  phoneNumber = phoneNumber.replace('+84', '0');
  return phoneNumber;
};
export const convertArrayAlpha = Master_Array => {
  const EXPECTED_RESULT = map(Master_Array, function (item) {
    const key = item.id;
    const value = item.name;
    const national = item.nationality;
    const age = 30;

    const tmpPayload = {
      ...item,
      key,
      value,
      national,
      age,
    };
    return tmpPayload;
  });
  return EXPECTED_RESULT;
};
export const convertArrayStudent = Master_Array => {
  const EXPECTED_RESULT = map(Master_Array, function (item) {
    const key = item?.account?.id;
    const value = item?.account?.name;
    const email = item?.account?.email;
    const phone = item?.account?.phone;
    const age = 30;

    const tmpPayload = {
      ...item,
      key,
      value,
      age,
      email,
      phone,
    };
    return tmpPayload;
  });
  return EXPECTED_RESULT;
};

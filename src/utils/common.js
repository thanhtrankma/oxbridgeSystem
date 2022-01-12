import Toast from 'react-native-toast-message';
import {useTranslation} from '../context/LanguageContext';

export const showToastSuccess = message => {
  Toast.show({
    type: 'success',
    position: 'top',
    text1: message,
    visibilityTime: 2000,
    autoHide: true,
    topOffset: 40,
    bottomOffset: 40,
  });
};
export const showToastError = message => {
  Toast.show({
    type: 'error',
    position: 'top',
    text1: message,
    visibilityTime: 2000,
    autoHide: true,
    topOffset: 40,
    bottomOffset: 40,
  });
};
export {useTranslation};

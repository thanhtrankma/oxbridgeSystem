import React from 'react';
import {SafeAreaView, StyleSheet, Platform, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import MainRoute from './routes/main-routes';
import Toast from 'react-native-toast-message';
// import { useTranslation } from 'context/LanguageContext';

const App = () => {
  // const { hello } = useTranslation();
  const onBeforeLift = () => {};

  const toastRef = ref => Toast.setRef(ref);

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <MainRoute />
      </NavigationContainer>
      <Toast ref={toastRef} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});

// export const c = store;
export default App;

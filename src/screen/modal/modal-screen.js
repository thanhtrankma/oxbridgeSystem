import React from 'react';

export default function ModalScreen({route, navigation}) {
  const {Screen, ScreenProps} = route.params;
  return <Screen {...ScreenProps} navigation={navigation} />;
}

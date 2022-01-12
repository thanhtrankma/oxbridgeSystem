/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './src/app';
import {name as appName} from './app.json';
import {LanguageContextProvider} from './src/context/LanguageContext';

AppRegistry.registerComponent(appName, () => LanguageContextProvider);

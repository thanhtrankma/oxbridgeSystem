import React, {useState, useEffect, useContext} from 'react';
import en from '../lang/en.json';
import vi from '../lang/vi.json';
import * as RNLocalize from 'react-native-localize';
import App from '../app';

type LanguageContextType = {
  hello: string;
};

const LanguageContext = React.createContext<LanguageContextType>(
  {} as LanguageContextType,
);

const languageObj = {
  en: en,
  'vi-US': vi,
};

export const LanguageContextProvider: React.FC = ({children}) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  useEffect(() => {
    const currentLanguage = RNLocalize.findBestAvailableLanguage(
      Object.keys(languageObj),
    );
    // const local = RNLocalize.getLocales();
    setSelectedLanguage(currentLanguage?.languageTag || 'en');
  }, []);

  const value = {
    ...languageObj[selectedLanguage as 'en' | 'vi-US'],
  };
  return (
    <LanguageContext.Provider value={value}>
      <App />
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => useContext(LanguageContext);
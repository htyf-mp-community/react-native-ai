import React, { forwardRef } from 'react';
import App from '../App';
import SplashScreen from 'react-native-splash-screen';
import { useEffect } from 'react';
import { StoreProvider, UIProvider } from '@/_UIHOOKS_';

const MiniApp = forwardRef(({ dataSupper }: any) => {
  useEffect(() => {
    SplashScreen.hide();
    return () => {

    }
  }, [])
  return (
    <>
      <StoreProvider>
        <UIProvider><App /></UIProvider>
      </StoreProvider>
    </>
  );
});

export default MiniApp;
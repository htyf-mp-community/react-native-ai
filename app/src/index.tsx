import React, { forwardRef } from 'react';
import App from '../App';
import SplashScreen from 'react-native-splash-screen';
import { useEffect } from 'react';

const MiniApp = forwardRef(({ dataSupper }: any) => {
  useEffect(() => {
    SplashScreen.hide();
    return () => {

    }
  }, [])
  return (
    <>
      <App />
    </>
  );
});

export default MiniApp;
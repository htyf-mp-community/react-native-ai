import React, { ReactNode, useCallback, useEffect, useMemo, useRef, useState,  } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView, Alert } from 'react-native'
import { useImmer } from 'use-immer'
import { setHost, useAppDispatch, useAppSelector } from './store';
import BottomSheet from '@gorhom/bottom-sheet';
import CustomBackdrop from './components/CustomBackdrop';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { isValidUrl } from '@/utils';
import { useDebounceEffect } from 'ahooks';


const isDev = process.env.NODE_ENV !== 'production';

export const UIContext = React.createContext<any>(null);

if (isDev) {
  UIContext.displayName = '__DGZ_UIContext___';
}

export interface UIProviderProps {
  children: ReactNode | Function;
}

export const UIProvider = (props: UIProviderProps) => {
  const dispath = useAppDispatch()
  const [url, setUrl] = useState('')
  const insets = useSafeAreaInsets();
  const optionsSheetSnapPoints2 = useMemo(() => [0.1, 250+insets.bottom], []);
  const optionsSheetRef2 = useRef<BottomSheet>(null);
  const [isClient, setIsClient] = useState(false)
  const apps = useAppSelector(state => state.apps);
  const { __ENV__ } = apps;

  useEffect(() => {
    setIsClient(true)
  }, [])

  useDebounceEffect(() => {
    try {
      if (!apps.__HOST__) {
        optionsSheetRef2.current?.snapToIndex(1)
      }
    } catch (error) {
      
    }
  }, [apps.__HOST__], {
    wait: 1000
  })

  return <UIContext.Provider
    value={{
      openUrlSetting: () => {
        optionsSheetRef2.current?.snapToIndex(1)
      }
    } as SDKType}
  >
    {
      isClient && __ENV__ !== 'MASTER' ? <View
      >
        <Text style={{ fontSize: 10, color: '#fff' }}>{__ENV__}</Text>
      </View> : undefined
    }
    {
      typeof props.children === 'function' ? props.children() : props?.children
    }
    <BottomSheet
        index={-1}
        backdropComponent={CustomBackdrop}
        ref={optionsSheetRef2}
        enablePanDownToClose={false}
        snapPoints={optionsSheetSnapPoints2}
        backgroundStyle={{
          backgroundColor: '#fff'
        }}
        onChange={(index) => {
          if (index < 1) {
            
          }
        }}
        onClose={() => {
          setUrl('')
        }}
      >
        <View style={[ModalizeMessageStyles.modalView]}>
          <SafeAreaView>
            <View style={[ModalizeMessageStyles.permissionsHeader]}>
              <Text style={[ModalizeMessageStyles.text]}>please enter api host</Text>
            </View>
            <View style={[ModalizeMessageStyles.permissionsBody]}>
              <View style={ModalizeMessageStyles.contentWrap}>
                <TextInput placeholderTextColor={"#999"} value={url} onChangeText={i => setUrl(`${i}`)} style={ModalizeMessageStyles.inputWrap} placeholder='example: https://www.apps.com/api' />
              </View>
              <View style={ModalizeMessageStyles.tipWrap}>
                <Text style={ModalizeMessageStyles.tipText}>
                  Please enter the correct url
                </Text>
              </View>
            </View>
            <View style={[ModalizeMessageStyles.permissionsFooter]}>
              <TouchableOpacity
                style={[ModalizeMessageStyles.btn]}
                onPress={() => {
                  setUrl('')
                  optionsSheetRef2.current?.close()
                }}>
                <Text style={[ModalizeMessageStyles.btnText]}>取消</Text>
              </TouchableOpacity>
              <View style={[ModalizeMessageStyles.line]} />
              <TouchableOpacity
                style={[ModalizeMessageStyles.btn, ModalizeMessageStyles.onBtn]}
                onPress={async () => {
                  try {
                    let _url = (url).replace(/\s/g, "")
                    if (_url && isValidUrl(_url)) {
                      setUrl('')
                      dispath(setHost(_url))
                      optionsSheetRef2.current?.close()
                    } else {
                      Alert.alert('Please enter the correct url')
                    }
                  } catch (error) {
                    
                  } finally {

                  }
                }}
              >
                <Text style={[ModalizeMessageStyles.btnText, ModalizeMessageStyles.onBtnText]}>确定</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
      </BottomSheet>
  </UIContext.Provider>
}

const NO_INSETS_ERROR =
  'Make sure you are rendering `<UIProvider>` at the top of your app.';

export function useUI(): SDKType {
  const sdk = React.useContext(UIContext);
  if (sdk == null) {
    throw new Error(NO_INSETS_ERROR);
  }
  return sdk || {};
}

export interface SocketConfig {
 
}

export type SDKType = {
  openUrlSetting: () => void;
}

const ModalizeMessageStyles = StyleSheet.create({
  videoPlayer: {
    flexGrow: 2,
  },
  modalView: {
    flex: 2,
    paddingHorizontal: 25,
  },
  permissionsHeader: {
    height: 50,
    justifyContent: 'center',
  },
  permissionsBody: {
    minHeight: 100,
  },
  permissionsFooter: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '800',
    color: '#000',
  },
  btn: {
    height: 50,
    paddingHorizontal: 50,
    backgroundColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    overflow: 'hidden',
  },
  line: {
    width: 30,
  },
  btnText: {
    color: '#52c41a',
    fontSize: 16,
    fontWeight: '600',
  },
  onBtn: {
    backgroundColor: '#52c41a',
  },
  onBtnText: {
    color: '#fff',
  },
  contentWrap: {
    marginTop: 10,
  },
  contentText: {
    fontSize: 14,
    lineHeight: 20,
  },
  tipWrap: {
    marginTop: 10,
  },
  tipText: {
    fontSize: 12,
    lineHeight: 15,
    color: '#999',
  },
  loading: {
    marginRight: 5,
  },
  inputWrap: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    height: 40,
    borderWidth: 1,
    borderRadius: 3,
  }
});

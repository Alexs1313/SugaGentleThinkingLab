import React, {useEffect, useRef} from 'react';
import {View, ScrollView, ImageBackground} from 'react-native';
import {WebView} from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';

import {Animated} from 'react-native';

const av = new Animated.Value(0);
av.addListener(() => {
  return;
});

export const gentlthinkinglabbhtmlLoader = `  <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
        <style>
          body {
            margin: 0;
            padding: 0;
            background: transparent;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            overflow: hidden;
          }

          .spinner {
            background-image: linear-gradient(rgb(186, 66, 255) 35%, rgb(0, 225, 255));
            width: 100px;
            height: 100px;
            animation: spinning 1.7s linear infinite;
            border-radius: 50%;
            filter: blur(1px);
            box-shadow: 
              0px -5px 20px rgb(186, 66, 255),
              0px 5px 20px rgb(0, 225, 255);
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .spinner1 {
            background-color: rgb(36, 36, 36);
            width: 100%;
            height: 100%;
            border-radius: 50%;
            filter: blur(10px);
          }

          @keyframes spinning {
            to {
              transform: rotate(360deg);
            }
          }
        </style>
      </head>
      <body>
        <div class="spinner">
          <div class="spinner1"></div>
        </div>
      </body>
    </html>`;

const Gentlthinkinglabbloadr = () => {
  const navigation = useNavigation();
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      navigation.replace('Gentlthinkinglabbonb');
    }, 6000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
        console.log('timer cleared');
      }
    };
  }, [navigation]);

  return (
    <ImageBackground
      style={{flex: 1}}
      source={require('../../assets/i/gentlthinkinglabbbg.png')}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            alignSelf: 'center',
          }}>
          <WebView
            originWhitelist={['*']}
            source={{html: gentlthinkinglabbhtmlLoader}}
            style={{width: 260, height: 80, backgroundColor: 'transparent'}}
            scrollEnabled={false}
            transparent={true}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Gentlthinkinglabbloadr;

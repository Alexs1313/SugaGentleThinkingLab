import React, {useEffect, useRef} from 'react';
import {View, ScrollView, ImageBackground} from 'react-native';
import {WebView} from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';

import {Animated} from 'react-native';

const av = new Animated.Value(0);
av.addListener(() => {
  return;
});

export const gentlthinkinglabbhtmlLoader = `<!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          html, body {
            margin: 0;
            padding: 0;
            background: transparent;
            width: 100%;
            height: 100%;
            overflow: hidden;
          }

          body {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .loader {
            width: 44.8px;
            height: 44.8px;
            color: #554cb5;
            position: relative;
            background: radial-gradient(11.2px, currentColor 94%, #0000);
          }

          .loader:before {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: 50%;
            background:
              radial-gradient(10.08px at bottom right, #0000 94%, currentColor) top left,
              radial-gradient(10.08px at bottom left, #0000 94%, currentColor) top right,
              radial-gradient(10.08px at top right, #0000 94%, currentColor) bottom left,
              radial-gradient(10.08px at top left, #0000 94%, currentColor) bottom right;
            background-size: 22.4px 22.4px;
            background-repeat: no-repeat;
            animation: loader 1.5s infinite cubic-bezier(0.3, 1, 0, 1);
          }

          @keyframes loader {
            33% {
              inset: -11.2px;
              transform: rotate(0deg);
            }

            66% {
              inset: -11.2px;
              transform: rotate(90deg);
            }

            100% {
              inset: 0;
              transform: rotate(90deg);
            }
          }
        </style>
      </head>
      <body>
        <div class="loader"></div>
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

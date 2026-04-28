import Gentlthinkinglabblay from '../Gentlthinkinglabbcpnts/Gentlthinkinglabblay';
import {useStore} from '../Gentlthinkinglabbstor/Gentlthinkinglabbcontxt';

import React from 'react';

import {View, Text, TouchableOpacity, StyleSheet, Linking} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Gentlthinkinglabbsettgs = () => {
  const {
    gentlthinkinglabbBackgroundMusic,
    setGentlthinkinglabbBackgroundMusic,
    gentlthinkinglabbVibration,
    setGentlthinkinglabbVibration,
  } = useStore();

  const gentlthinkinglabbToggleBackgroundMusic = async (
    selectedValue: boolean,
  ) => {
    try {
      await AsyncStorage.setItem(
        'gentlthinkinglabbBackgroundMusic',
        JSON.stringify(selectedValue),
      );
      setGentlthinkinglabbBackgroundMusic(selectedValue);
    } catch (error) {
      console.log('Error music', error);
    }
  };

  const gentlthinkinglabbToggleVibration = async (selectedValue: boolean) => {
    try {
      await AsyncStorage.setItem(
        'gentlthinkinglabbVibration',
        JSON.stringify(selectedValue),
      );
      setGentlthinkinglabbVibration(selectedValue);
    } catch (error) {
      console.log('Error vibration', error);
    }
  };

  const gentlthinkinglabbShareApp = async () => {
    Linking.openURL(
      'https://apps.apple.com/us/app/suga-lab-gentle/id6764242180',
    ).catch(() => {
      console.log('err');
    });
  };

  return (
    <Gentlthinkinglabblay>
      <View style={styles.gentlthinkinglabbwrap}>
        <Text style={styles.gentlthinkinglabbtitle}>Settings</Text>

        <View style={styles.gentlthinkinglabbcard}>
          <View style={styles.gentlthinkinglabbrow}>
            <Text style={styles.gentlthinkinglabbrowlbl}>Music:</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                gentlthinkinglabbToggleBackgroundMusic(
                  !gentlthinkinglabbBackgroundMusic,
                )
              }
              style={{
                width: 76,
                height: 47,
                backgroundColor: '#FFFFFF',
                borderRadius: 16,
                padding: 11,
                justifyContent: 'center',
                alignItems: !gentlthinkinglabbBackgroundMusic
                  ? 'flex-start'
                  : 'flex-end',
              }}>
              <View
                style={[
                  gentlthinkinglabbBackgroundMusic
                    ? {
                        width: 23,
                        height: 23,
                        backgroundColor: '#DD00FF',
                        borderRadius: 11.5,
                      }
                    : {
                        width: 23,
                        height: 23,
                        backgroundColor: '#8886F9',
                        borderRadius: 11.5,
                      },
                ]}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.gentlthinkinglabbdivider} />
          <View style={styles.gentlthinkinglabbrow}>
            <Text style={styles.gentlthinkinglabbrowlbl}>Vibration:</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                gentlthinkinglabbToggleVibration(!gentlthinkinglabbVibration)
              }
              style={{
                width: 76,
                height: 47,
                backgroundColor: '#FFFFFF',
                borderRadius: 16,
                padding: 11,
                justifyContent: 'center',
                alignItems: !gentlthinkinglabbVibration
                  ? 'flex-start'
                  : 'flex-end',
              }}>
              <View
                style={[
                  gentlthinkinglabbVibration
                    ? {
                        width: 23,
                        height: 23,
                        backgroundColor: '#DD00FF',
                        borderRadius: 11.5,
                      }
                    : {
                        width: 23,
                        height: 23,
                        backgroundColor: '#8886F9',
                        borderRadius: 11.5,
                      },
                ]}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.gentlthinkinglabbaboutcard}>
          <Text style={styles.gentlthinkinglabbaboutlbl}>About the app:</Text>
          <Text style={styles.gentlthinkinglabbabouttext}>
            {
              'This app combines short stories, situations, and simple interactive elements.\nIt is designed to give a new perspective on familiar things and stimulate thinking in a light format.'
            }
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.gentlthinkinglabbsharebtn}
            onPress={gentlthinkinglabbShareApp}>
            <Text style={styles.gentlthinkinglabbsharetxt}>SHARE APP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Gentlthinkinglabblay>
  );
};

export default Gentlthinkinglabbsettgs;

const styles = StyleSheet.create({
  gentlthinkinglabbrowlbl: {
    fontSize: 18,
    fontFamily: 'MontserratAlternates-SemiBold',
    color: '#fff',
  },
  gentlthinkinglabbaboutcard: {
    backgroundColor: '#8886F9',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 42,
    padding: 24,
    marginTop: 10,
  },

  gentlthinkinglabbwrap: {
    paddingHorizontal: 16,
    paddingTop: 71,

    paddingBottom: 162,
  },
  gentlthinkinglabbtitle: {
    fontSize: 26,
    fontFamily: 'MontserratAlternates-Black',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 28,
  },
  gentlthinkinglabbcard: {
    backgroundColor: '#8886F9',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 42,
    paddingHorizontal: 24,
    paddingVertical: 10,
    marginBottom: 16,
  },
  gentlthinkinglabbrow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  gentlthinkinglabbdivider: {
    height: 1,
    backgroundColor: '#FFFFFF40',
  },

  gentlthinkinglabbaboutlbl: {
    fontSize: 22,
    fontFamily: 'MontserratAlternates-Black',
    color: '#fff',
    marginBottom: 12,
  },

  gentlthinkinglabbabouttext: {
    fontSize: 16,
    fontFamily: 'MontserratAlternates-Medium',
    color: '#fff',
    lineHeight: 22,
    marginBottom: 20,
  },
  gentlthinkinglabbsharebtn: {
    backgroundColor: '#DD00FF',
    borderRadius: 18,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFFCC',
  },
  gentlthinkinglabbsharetxt: {
    fontSize: 20,
    fontFamily: 'MontserratAlternates-SemiBold',
    color: '#fff',
  },
});

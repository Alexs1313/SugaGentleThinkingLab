import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import React, {useRef} from 'react';
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
  type ViewStyle,
} from 'react-native';

import Gentlthinkinglabbstries from './Gentlthinkinglabb/Gentlthinkinglabbscrns/Gentlthinkinglabbstries';
import Gentlthinkinglabbqkchoce from './Gentlthinkinglabb/Gentlthinkinglabbscrns/Gentlthinkinglabbqkchoce';
import Gentlthinkinglabbfindpar from './Gentlthinkinglabb/Gentlthinkinglabbscrns/Gentlthinkinglabbfindpar';

import Gentlthinkinglabbfacts from './Gentlthinkinglabb/Gentlthinkinglabbscrns/Gentlthinkinglabbfacts';
import Gentlthinkinglabbsvd from './Gentlthinkinglabb/Gentlthinkinglabbscrns/Gentlthinkinglabbsvd';
import Gentlthinkinglabbsettgs from './Gentlthinkinglabb/Gentlthinkinglabbscrns/Gentlthinkinglabbsettgs';

const Tab = createBottomTabNavigator();

const AnimatedTabButton = (props: Record<string, unknown>) => {
  const {children, style, onPress, onLongPress, ...rest} = props;
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.88,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 8,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress as () => void}
      onLongPress={onLongPress as (() => void) | undefined}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[style as ViewStyle, styles.gentlthinkinglabbTabButton]}
      {...rest}>
      <Animated.View
        style={[
          styles.gentlthinkinglabbTabButtonInner,
          {transform: [{scale}]},
        ]}>
        {children as React.ReactNode}
      </Animated.View>
    </Pressable>
  );
};

const Gentlthinkinglabbtabs = () => {
  const {height, width} = useWindowDimensions();
  const isLandscape = height < width;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [
          styles.gentlthinkinglabbTabBar,
          {height: isLandscape ? 80 : 92},
        ],

        tabBarButton: props => (
          <AnimatedTabButton {...(props as Record<string, unknown>)} />
        ),
      }}>
      <Tab.Screen
        name="Gentlthinkinglabbstries"
        component={Gentlthinkinglabbstries}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={[
                styles.gentlthinkinglabbIconWrap,
                focused && styles.gentlthinkinglabbIconFocused,
              ]}>
              <Image
                source={require('./assets/i/gentlthinkinglabbtab1.png')}
                tintColor={focused ? '#fff' : 'rgb(46, 41, 41)'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Gentlthinkinglabbqkchoce"
        component={Gentlthinkinglabbqkchoce}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={[
                styles.gentlthinkinglabbIconWrap,
                focused && styles.gentlthinkinglabbIconFocused,
              ]}>
              <Image
                source={require('./assets/i/gentlthinkinglabbtab2.png')}
                tintColor={focused ? '#fff' : 'rgb(46, 41, 41)'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Gentlthinkinglabbfindpar"
        component={Gentlthinkinglabbfindpar}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={[
                styles.gentlthinkinglabbIconWrap,
                focused && styles.gentlthinkinglabbIconFocused,
              ]}>
              <Image
                source={require('./assets/i/gentlthinkinglabbtab3.png')}
                tintColor={focused ? '#fff' : 'rgb(46, 41, 41)'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Gentlthinkinglabbfacts"
        component={Gentlthinkinglabbfacts}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={[
                styles.gentlthinkinglabbIconWrap,
                focused && styles.gentlthinkinglabbIconFocused,
              ]}>
              <Image
                source={require('./assets/i/gentlthinkinglabbtab4.png')}
                tintColor={focused ? '#fff' : 'rgb(46, 41, 41)'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Gentlthinkinglabbsvd"
        component={Gentlthinkinglabbsvd}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={[
                styles.gentlthinkinglabbIconWrap,
                focused && styles.gentlthinkinglabbIconFocused,
              ]}>
              <Image
                source={require('./assets/i/gentlthinkinglabbtab5.png')}
                tintColor={focused ? '#fff' : 'rgb(46, 41, 41)'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Gentlthinkinglabbsettgs"
        component={Gentlthinkinglabbsettgs}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={[
                styles.gentlthinkinglabbIconWrap,
                focused && styles.gentlthinkinglabbIconFocused,
              ]}>
              <Image
                source={require('./assets/i/gentlthinkinglabbtab6.png')}
                tintColor={focused ? '#fff' : 'rgb(46, 41, 41)'}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  gentlthinkinglabbTabGradient: {
    borderRadius: 33,
  },
  gentlthinkinglabbIconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    width: 40,
    height: 40,
  },
  gentlthinkinglabbIconFocused: {
    backgroundColor: '#DD00FF',
  },

  gentlthinkinglabbTabButton: {
    flex: 1,
  },
  gentlthinkinglabbTabButtonInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  gentlthinkinglabbTabBar: {
    elevation: 0,
    paddingTop: 22,
    justifyContent: 'center',
    position: 'absolute',
    paddingHorizontal: 18,
    borderColor: '#8886F9',
    backgroundColor: '#D1B7F0',
    height: 98,
    paddingBottom: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderTopWidth: 2,
    borderRadius: 48,
    bottom: 43,
    marginHorizontal: 34,
  },
});

export default Gentlthinkinglabbtabs;

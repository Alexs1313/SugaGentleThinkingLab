import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import Gentlthinkinglabblay from '../Gentlthinkinglabbcpnts/Gentlthinkinglabblay';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';

const gentlthinkinglabbData = [
  {
    id: 1,
    image: require('../../assets/i/gentlthinkinglaon1.png'),
    title: 'Explore Your Thinking',
    description:
      'This is a simple space with stories, situations, and ideas. You can open any section and interact with the content at your own pace.',
  },

  {
    id: 2,
    image: require('../../assets/i/gentlthinkinglaon2.png'),
    title: 'Read and discover',
    description: `There are short stories and interesting facts here.
Each element helps you look at familiar things a little differently.`,
  },

  {
    id: 3,
    image: require('../../assets/i/gentlthinkinglaon3.png'),
    title: 'Choose and reflect',
    description: `In some sections, you can choose options or find simple connections.
There are no right or wrong answers here.`,
  },
  {
    id: 4,
    image: require('../../assets/i/gentlthinkinglaon4.png'),
    title: `Everything is open 
at once`,
    description: `All content is available from the first launch.
Explore at your own pace and come back whenever you want.`,
  },
];

const Gentlthinkinglabbonb = () => {
  const navigation = useNavigation();
  const [gentlthinkinglabbIndex, setGentlthinkinglabbIndex] = useState(0);

  const handleSkip = () => {
    navigation.replace('Gentlthinkinglabbtabs');
  };

  const gentlthinkinglabbNext = () => {
    gentlthinkinglabbIndex < 3
      ? setGentlthinkinglabbIndex(gentlthinkinglabbIndex + 1)
      : navigation.replace('Gentlthinkinglabbtabs');
  };

  return (
    <Gentlthinkinglabblay>
      <View style={styles.gentlthinkinglabbcontainer}>
        <TouchableOpacity
          style={styles.gentlthinkinglabbskipbutton}
          onPress={handleSkip}>
          <Text style={styles.gentlthinkinglabbskiptext}>SKIP</Text>
        </TouchableOpacity>

        <Image source={gentlthinkinglabbData[gentlthinkinglabbIndex].image} />

        <View style={styles.gentlthinkinglabbbox}>
          <Text style={styles.gentlthinkinglabbtext}>
            {gentlthinkinglabbData[gentlthinkinglabbIndex].title}
          </Text>
          <Text style={styles.gentlthinkinglabbdesc}>
            {gentlthinkinglabbData[gentlthinkinglabbIndex].description}
          </Text>

          <TouchableOpacity
            style={styles.gentlthinkinglabbbutton}
            onPress={gentlthinkinglabbNext}>
            <Text style={styles.gentlthinkinglabbbuttontext}>Start</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Gentlthinkinglabblay>
  );
};

export default Gentlthinkinglabbonb;

const styles = StyleSheet.create({
  gentlthinkinglabbbutton: {
    backgroundColor: '#DD00FF',
    borderRadius: 18,
    width: '96%',
    height: 70,
    alignSelf: 'center',
    marginTop: 21,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFFCC',
  },

  gentlthinkinglabbcontainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexGrow: 1,
    paddingBottom: 50,
  },
  gentlthinkinglabbbox: {
    backgroundColor: '#D1B7F0',
    borderWidth: 3,
    borderColor: '#8886F9',
    padding: 30,
    borderRadius: 42,
    width: '90%',
    marginTop: 80,
  },
  gentlthinkinglabbtext: {
    fontSize: 20,
    fontFamily: 'MontserratAlternates-Black',
    color: '#000',
    textAlign: 'center',
  },
  gentlthinkinglabbdesc: {
    fontSize: 16,
    fontFamily: 'MontserratAlternates-Medium',
    color: '#000',
    textAlign: 'center',
    marginTop: 20,
  },

  gentlthinkinglabbbuttontext: {
    fontSize: 20,
    fontFamily: 'MontserratAlternates-SemiBold',
    color: '#fff',
    textAlign: 'center',
  },
  gentlthinkinglabbskipbutton: {
    position: 'absolute',
    top: 80,
    right: 20,
    zIndex: 1,
  },
  gentlthinkinglabbskiptext: {
    fontSize: 20,
    fontFamily: 'MontserratAlternates-Medium',
    color: '#fff',
    textDecorationLine: 'underline',
  },
});

// stack navigation

import {createStackNavigator} from '@react-navigation/stack';

import Gentlthinkinglabbonb from '../Gentlthinkinglabbscrns/Gentlthinkinglabbonb';
import Gentlthinkinglabbloadr from '../Gentlthinkinglabbcpnts/Gentlthinkinglabbloadr';

import Gentlthinkinglabbtabs from '../../Gentlthinkinglabbtabs';

const Stack = createStackNavigator();

const Gentlthinkinglabbstack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Gentlthinkinglabbloadr"
        component={Gentlthinkinglabbloadr}
      />
      <Stack.Screen
        name="Gentlthinkinglabbonb"
        component={Gentlthinkinglabbonb}
      />
      <Stack.Screen
        name="Gentlthinkinglabbtabs"
        component={Gentlthinkinglabbtabs}
      />
    </Stack.Navigator>
  );
};

export default Gentlthinkinglabbstack;

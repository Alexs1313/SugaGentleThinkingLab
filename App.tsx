import {NavigationContainer} from '@react-navigation/native';
import Gentlthinkinglabbstack from './Gentlthinkinglabb/Gentlthinkinglabbnav/Gentlthinkinglabbstack';
import {GentlthinkinSettingsProvider} from './Gentlthinkinglabb/Gentlthinkinglabbstor/Gentlthinkinglabbcontxt';

const App = () => {
  return (
    <NavigationContainer>
      <GentlthinkinSettingsProvider>
        <Gentlthinkinglabbstack />
      </GentlthinkinSettingsProvider>
    </NavigationContainer>
  );
};

export default App;

import {ScrollView, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Gentlthinkinglabblay = ({children}) => {
  return (
    <LinearGradient
      colors={['#DD00FF', '#8886F9']}
      style={styles.gwntlthinkinlabbbackground}
      start={{x: 0, y: 0.4}}
      end={{x: 1.2, y: 0}}>
      <ScrollView
        contentContainerStyle={styles.gwntlthinkinlabbcontent}
        showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gwntlthinkinlabbbackground: {
    flex: 1,
  },
  gwntlthinkinlabbcontent: {
    flexGrow: 1,
  },
});

export default Gentlthinkinglabblay;

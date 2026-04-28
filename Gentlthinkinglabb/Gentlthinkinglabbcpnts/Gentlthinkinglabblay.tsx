import {ImageBackground, ScrollView, StyleSheet} from 'react-native';

const Gentlthinkinglabblay = ({children}) => {
  return (
    <ImageBackground
      style={styles.gwntlthinkinlabbbackground}
      source={require('../../assets/i/gentlthinkinglabbbg.png')}>
      <ScrollView
        contentContainerStyle={styles.gwntlthinkinlabbcontent}
        showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    </ImageBackground>
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

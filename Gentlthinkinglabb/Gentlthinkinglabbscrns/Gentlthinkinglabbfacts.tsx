import Gentlthinkinglabblay from '../Gentlthinkinglabbcpnts/Gentlthinkinglabblay';

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Share,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GENTLTHINKINGLABB_FACTS_SAVED_KEY = 'gentlthinkinglabb_saved_facts';

const GENTLTHINKINGLABB_FACTS = [
  'The brain spends less energy on familiar actions, so we automatically repeat habits even when they no longer bring benefits.',
  'A person remembers information faster if it is associated with an emotion, even a weak one.',
  'When you pause while working, the brain continues to process the task in the background.',
  'We are more likely to notice what we have already paid attention to before — this is called the selective perception effect.',
  'A decision is often formed before you realize it.',
  'People assess a situation not objectively, but through their previous experience.',
  'Small changes in the environment can have a stronger impact on behavior than large efforts.',
  'The brain does not like uncertainty, so sometimes we invent explanations, even if we do not know the truth.',
  'Repetition creates a feeling of "correctness" even if the information is unverified.',
  'The way you formulate an idea affects how you perceive it.',
  'Changing the pace (slower or faster) can change your perception of the same situation.',
  'We remember unfinished actions better than completed ones.',
  'Simply switching attention helps reduce tension faster than trying to "overcome" it.',
  'A person tends to overestimate the importance of their mistakes.',
  'Familiar surroundings reduce stress levels even without obvious changes.',
  'The brain processes visual information faster than text.',
  'Even a short break can improve concentration more than long work without breaks.',
  'We are more likely to trust information that is presented simply.',
  'Expectations affect the outcome — if you think something will be difficult, it often feels that way.',
  'People respond better to options than to the lack of options.',
  'The brain quickly gets used to the new level of comfort and stops noticing it.',
  'When you explain something to another person, you yourself begin to understand it better.',
  'Even small progress creates a sense of movement and motivates more than expecting a big result.',
  'A person can change their attitude towards a situation without changing the situation itself.',
  'Decisions seem more difficult when there are too many options.',
  'We notice negative things more quickly than neutral or positive ones.',
  'Habits are formed not through willpower, but through repetition in the same conditions.',
  'The brain looks for simple explanations even for complex things.',
  'Changing your perspective can completely change the meaning of the same situation.',
  'When you stop for a short time, you begin to notice more details around you.',
];

const GENTLTHINKINGLABB_IMAGES = [
  require('../../assets/i/gentlthinkinglaon1.png'),
  require('../../assets/i/gentlthinkinglaon2.png'),
  require('../../assets/i/gentlthinkinglaon3.png'),
  require('../../assets/i/gentlthinkinglaon4.png'),
  require('../../assets/i/gentlthinkinglaost7.png'),
];

const gentlthinkinglabbRandIdx = (len: number) =>
  Math.floor(Math.random() * len);

const Gentlthinkinglabbfacts = () => {
  const [gentlthinkinglabbFactIdx, setGentlthinkinglabbFactIdx] = useState(() =>
    gentlthinkinglabbRandIdx(GENTLTHINKINGLABB_FACTS.length),
  );
  const [gentlthinkinglabbImgIdx, setGentlthinkinglabbImgIdx] = useState(() =>
    gentlthinkinglabbRandIdx(GENTLTHINKINGLABB_IMAGES.length),
  );
  const [gentlthinkinglabbSaved, setGentlthinkinglabbSaved] = useState<
    {text: string; imgIdx: number}[]
  >([]);

  useEffect(() => {
    AsyncStorage.getItem(GENTLTHINKINGLABB_FACTS_SAVED_KEY)
      .then(val => {
        if (val) {
          setGentlthinkinglabbSaved(JSON.parse(val));
        }
      })
      .catch(() => {});
  }, []);

  const gentlthinkinglabbCurrentFact =
    GENTLTHINKINGLABB_FACTS[gentlthinkinglabbFactIdx];

  const gentlthinkinglabbIsSaved = gentlthinkinglabbSaved.some(
    f => f.text === gentlthinkinglabbCurrentFact,
  );

  const gentlthinkinglabbNewFact = () => {
    setGentlthinkinglabbFactIdx(
      gentlthinkinglabbRandIdx(GENTLTHINKINGLABB_FACTS.length),
    );
    setGentlthinkinglabbImgIdx(
      gentlthinkinglabbRandIdx(GENTLTHINKINGLABB_IMAGES.length),
    );
  };

  const gentlthinkinglabbToggleSave = async () => {
    const next = gentlthinkinglabbIsSaved
      ? gentlthinkinglabbSaved.filter(
          f => f.text !== gentlthinkinglabbCurrentFact,
        )
      : [
          ...gentlthinkinglabbSaved,
          {text: gentlthinkinglabbCurrentFact, imgIdx: gentlthinkinglabbImgIdx},
        ];
    setGentlthinkinglabbSaved(next);
    await AsyncStorage.setItem(
      GENTLTHINKINGLABB_FACTS_SAVED_KEY,
      JSON.stringify(next),
    ).catch(() => {});
  };

  const gentlthinkinglabbShare = async () => {
    try {
      await Share.share({message: gentlthinkinglabbCurrentFact});
    } catch {
      console.log('error');
    }
  };

  return (
    <Gentlthinkinglabblay>
      <View style={styles.gentlthinkinglabbwrap}>
        <Text style={styles.gentlthinkinglabbtitle}>Smart Facts</Text>

        <View style={styles.gentlthinkinglabbcard}>
          <Image
            source={GENTLTHINKINGLABB_IMAGES[gentlthinkinglabbImgIdx]}
            style={styles.gentlthinkinglabbimg}
            resizeMode="contain"
          />
          <Text style={styles.gentlthinkinglabbfacttxt}>
            {gentlthinkinglabbCurrentFact}
          </Text>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.gentlthinkinglabbsharebtn}
            onPress={gentlthinkinglabbShare}>
            <Text style={styles.gentlthinkinglabbbtntxt}>SHARE</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.gentlthinkinglabbbookmarkbtn,
              gentlthinkinglabbIsSaved &&
                styles.gentlthinkinglabbbookmarkbtnsaved,
            ]}
            onPress={gentlthinkinglabbToggleSave}>
            <Image
              source={require('../../assets/i/gentlthinkinglabbtab5.png')}
              tintColor={!gentlthinkinglabbIsSaved ? '#00000080' : '#DD00FF'}
              style={styles.gentlthinkinglabbbookmarkicon}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.gentlthinkinglabbnewbtn}
          activeOpacity={0.7}
          onPress={gentlthinkinglabbNewFact}>
          <Text style={styles.gentlthinkinglabbbtntxt}>NEW FACT</Text>
        </TouchableOpacity>
      </View>
    </Gentlthinkinglabblay>
  );
};

export default Gentlthinkinglabbfacts;

const styles = StyleSheet.create({
  gentlthinkinglabbfacttxt: {
    fontSize: 16,
    fontFamily: 'MontserratAlternates-Medium',
    color: '#fff',
    textAlign: 'left',
    lineHeight: 24,
    marginBottom: 20,
    alignSelf: 'stretch',
  },

  gentlthinkinglabbsharebtn: {
    backgroundColor: '#DD00FF',
    borderRadius: 18,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#FFFFFFCC',
  },

  gentlthinkinglabbwrap: {
    paddingHorizontal: 16,
    paddingTop: 70,
    paddingBottom: 160,
  },
  gentlthinkinglabbtitle: {
    fontSize: 28,
    fontFamily: 'MontserratAlternates-Black',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 24,
  },
  gentlthinkinglabbcard: {
    backgroundColor: '#8886F9',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 42,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  gentlthinkinglabbimg: {
    width: 180,
    height: 180,
    marginBottom: 20,
  },

  gentlthinkinglabbbookmarkbtn: {
    borderRadius: 18,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderWidth: 1,

    backgroundColor: '#DD00FF',
    borderColor: '#FFFFFFCC',
  },
  gentlthinkinglabbbookmarkbtnsaved: {
    backgroundColor: '#fff',
    borderColor: '#DD00FF',
  },
  gentlthinkinglabbbookmarkicon: {
    width: 26,
    height: 26,
  },
  gentlthinkinglabbnewbtn: {
    backgroundColor: '#DD00FF',
    borderRadius: 22,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFFCC',
  },
  gentlthinkinglabbbtntxt: {
    fontSize: 20,
    fontFamily: 'MontserratAlternates-SemiBold',
    color: '#fff',
  },
});

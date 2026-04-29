import {useStore} from '../Gentlthinkinglabbstor/Gentlthinkinglabbcontxt';
import {useFocusEffect} from '@react-navigation/native';

import Sound from 'react-native-sound';

import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Share,
  Modal,
  ScrollView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Gentlthinkinglabblay from '../Gentlthinkinglabbcpnts/Gentlthinkinglabblay';

const GENTLTHINKINGLABB_SAVED_KEY = 'gentlthinkinglabb_saved_stories';

type GentlthinkinglabbStory = {
  id: number;
  image: ReturnType<typeof require>;
  title: string;
  paragraphs: string[];
  detimage: ReturnType<typeof require>;
};

const gentlthinkinglabbStories: GentlthinkinglabbStory[] = [
  {
    id: 1,
    image: require('../../assets/i/gentlthinkinglaon1.png'),
    title: 'Change without noise',
    detimage: require('../../assets/i/gentlthinkinglaost1.png'),
    paragraphs: [
      "She didn't immediately notice that something had changed.",
      'Everything looked the same: the same places, the same people, the same days. But the feeling was different. Less rush, less tension, more silence inside.',
      'She used to think that changes had to be drastic. Something had to happen to feel the difference. But this time everything happened differently.',
      'Imperceptibly.',
      "She just started to react a little differently. Sometimes she didn't answer right away. Sometimes she didn't explain. Sometimes she allowed herself to take her time. And that was enough. Changes don't always look like a new beginning. Sometimes they look like the same day, but with a different feeling.",
      "And it's these kinds of changes that last longer.",
    ],
  },
  {
    id: 2,
    image: require('../../assets/i/gentlthinkinglaon2.png'),
    detimage: require('../../assets/i/gentlthinkinglaost2.png'),
    title: 'Slower is also movement',
    paragraphs: [
      'He was used to moving quickly.',
      'Decisions, actions, reactions — everything had to be done immediately. If something was delayed, there was a feeling that he was lagging behind.',
      'But over time, it became noticeable that speed does not always mean results.',
      'Some things require a different pace.',
      'When he tried to take his time, at first it was strange. As if something was wrong. But then clarity appeared.',
      'Without haste, it became easier to see the details.',
      'And it is clear that movement is not only about speed. It is also about direction.',
    ],
  },
  {
    id: 3,
    image: require('../../assets/i/gentlthinkinglaon3.png'),
    title: 'Simple Decision',
    detimage: require('../../assets/i/gentlthinkinglaost3.png'),
    paragraphs: [
      'He stood and thought about what to do.',
      'There were many options. And each one seemed important.',
      'The longer he thought, the more difficult it became. As if each decision determined something.',
      'Then he did a simple thing — he chose the first option that seemed normal.',
      'Without analysis.',
      'Without an ideal.',
      'And nothing happened.',
      'The world did not change. But it became easier.',
      'Sometimes a decision is difficult not because it is important, but because we give it too much weight.',
    ],
  },
  {
    id: 4,
    image: require('../../assets/i/gentlthinkinglaost7.png'),
    title: 'A feeling without a name',
    detimage: require('../../assets/i/gentlthinkinglaost4.png'),
    paragraphs: [
      "He couldn't explain what he was feeling.",
      "It wasn't something clear. Not joy or sadness. Just a state that was hard to name.",
      'He had tried to break it down before: to understand, to find a reason, to explain.',
      "But this time he didn't.",
      'He just left it as it was.',
      "And the feeling didn't disappear, but it became calmer.",
      "You don't have to understand everything right away. Some things can just be experienced.",
    ],
  },
  {
    id: 5,
    image: require('../../assets/i/gentlthinkinglaon4.png'),
    title: 'More inside than meets the eye',
    detimage: require('../../assets/i/gentlthinkinglaost5.png'),
    paragraphs: [
      'From the outside, everything looked simple.',
      'Clear, understandable, without unnecessary things. But it was worth stopping and looking closely — details appeared.',
      'Shades, transitions, depth.',
      'The same with people.',
      'We often see only the surface. But there is always more behind it.',
      'And to see this, it takes not time — but attention.',
    ],
  },
];

const Gentlthinkinglabbstries = () => {
  const [gentlthinkinglabbSelected, setGentlthinkinglabbSelected] = useState<
    number | null
  >(null);
  const [gentlthinkinglabbSaved, setGentlthinkinglabbSaved] = useState<
    number[]
  >([]);

  const [
    gentlthinkinglabbBackgroundMusicIdx,
    setGentlthinkinglabbBackgroundMusicIdx,
  ] = useState(0);

  const [sound, setSound] = useState(null);
  const gentlthinkinglabbBackgroundMusicTracksCycle = [
    'dmassaiii-funlit-path-242236.mp3',
    'dmassaiii-funlit-path-242236.mp3',
  ];
  const {
    gentlthinkinglabbBackgroundMusic,
    setGentlthinkinglabbBackgroundMusic,
    setGentlthinkinglabbVibration,
  } = useStore();

  useFocusEffect(
    useCallback(() => {
      loadGentlthinkinglabbBackgroundMusic();
      loadGentlthinkinglabbVibration();
    }, []),
  );

  useEffect(() => {
    playGentlthinkinglabbBackgroundMusic(gentlthinkinglabbBackgroundMusicIdx);

    return () => {
      if (sound) {
        sound.stop(() => {
          sound.release();
        });
      }
    };
  }, [gentlthinkinglabbBackgroundMusicIdx]);

  const playGentlthinkinglabbBackgroundMusic = index => {
    if (sound) {
      sound.stop(() => {
        sound.release();
      });
    }

    const gentlthinkinglabbBackgroundMusicTrackPath =
      gentlthinkinglabbBackgroundMusicTracksCycle[index];

    const newGentlthinkinglabbBackgroundMusicSound = new Sound(
      gentlthinkinglabbBackgroundMusicTrackPath,
      Sound.MAIN_BUNDLE,

      error => {
        if (error) {
          console.log('Error =>', error);
          return;
        }

        newGentlthinkinglabbBackgroundMusicSound.play(success => {
          if (success) {
            setGentlthinkinglabbBackgroundMusicIdx(
              prevIndex =>
                (prevIndex + 1) %
                gentlthinkinglabbBackgroundMusicTracksCycle.length,
            );
          } else {
            console.log('Error =>');
          }
        });
        setSound(newGentlthinkinglabbBackgroundMusicSound);
      },
    );
  };

  useEffect(() => {
    const setVolumeGentlthinkinglabbBackgroundMusic = async () => {
      try {
        const gentlthinkinglabbBackgroundMusicValue =
          await AsyncStorage.getItem('gentlthinkinglabbBackgroundMusic');

        const isGentlthinkinglabbBackgroundMusicOn = JSON.parse(
          gentlthinkinglabbBackgroundMusicValue,
        );
        setGentlthinkinglabbBackgroundMusic(
          isGentlthinkinglabbBackgroundMusicOn,
        );
        if (sound) {
          sound.setVolume(isGentlthinkinglabbBackgroundMusicOn ? 1 : 0);
        }
      } catch (error) {
        console.error('Error =>', error);
      }
    };

    setVolumeGentlthinkinglabbBackgroundMusic();
  }, [sound]);

  useEffect(() => {
    if (sound) {
      sound.setVolume(gentlthinkinglabbBackgroundMusic ? 1 : 0);
    }
  }, [gentlthinkinglabbBackgroundMusic]);

  const loadGentlthinkinglabbVibration = async () => {
    try {
      const gentlthinkinglabbVibrationValue = await AsyncStorage.getItem(
        'gentlthinkinglabbVibration',
      );
      if (gentlthinkinglabbVibrationValue !== null) {
        const isGentlthinkinglabbVibrationOn = JSON.parse(
          gentlthinkinglabbVibrationValue,
        );
        setGentlthinkinglabbVibration(isGentlthinkinglabbVibrationOn);
      }
    } catch (error) {
      console.error('Error!', error);
    }
  };

  const loadGentlthinkinglabbBackgroundMusic = async () => {
    try {
      const gentlthinkinglabbBackgroundMusicValue = await AsyncStorage.getItem(
        'gentlthinkinglabbBackgroundMusic',
      );
      if (gentlthinkinglabbBackgroundMusicValue !== null) {
        const isGentlthinkinglabbBackgroundMusicOn = JSON.parse(
          gentlthinkinglabbBackgroundMusicValue,
        );
        setGentlthinkinglabbBackgroundMusic(
          isGentlthinkinglabbBackgroundMusicOn,
        );
      }
    } catch (error) {
      console.error('Error loading settings =>', error);
    }
  };

  useEffect(() => {
    AsyncStorage.getItem(GENTLTHINKINGLABB_SAVED_KEY)
      .then(val => {
        if (val) {
          setGentlthinkinglabbSaved(JSON.parse(val));
        }
      })
      .catch(() => {});
  }, []);

  const gentlthinkinglabbToggleSave = async (id: number) => {
    const next = gentlthinkinglabbSaved.includes(id)
      ? gentlthinkinglabbSaved.filter(x => x !== id)
      : [...gentlthinkinglabbSaved, id];
    setGentlthinkinglabbSaved(next);
    await AsyncStorage.setItem(
      GENTLTHINKINGLABB_SAVED_KEY,
      JSON.stringify(next),
    ).catch(() => {});
  };

  const gentlthinkinglabbShareStory = async (story: GentlthinkinglabbStory) => {
    try {
      await Share.share({
        message: `${story.title}\n\n${story.paragraphs.join('\n\n')}`,
      });
    } catch {}
  };

  const gentlthinkinglabbSelectedStory = gentlthinkinglabbStories.find(
    s => s.id === gentlthinkinglabbSelected,
  );

  const gentlthinkinglabbIsSaved = gentlthinkinglabbSelectedStory
    ? gentlthinkinglabbSaved.includes(gentlthinkinglabbSelectedStory.id)
    : false;

  return (
    <>
      <Gentlthinkinglabblay>
        <View style={styles.gentlthinkinglabblistwrap}>
          {!!gentlthinkinglabbSelectedStory ? (
            <Text style={styles.gentlthinkinglabbtitle}></Text>
          ) : (
            <Text style={styles.gentlthinkinglabbtitle}>Symbol Stories</Text>
          )}

          {gentlthinkinglabbStories.map(story => {
            const isSaved = gentlthinkinglabbSaved.includes(story.id);
            return (
              <View key={story.id} style={styles.gentlthinkinglabblistcard}>
                <Image
                  source={story.image}
                  style={styles.gentlthinkinglabblistimg}
                  resizeMode="contain"
                />
                <View style={styles.gentlthinkinglabblistbtns}>
                  <TouchableOpacity
                    style={styles.gentlthinkinglabbopenbtn}
                    onPress={() => setGentlthinkinglabbSelected(story.id)}>
                    <Text style={styles.gentlthinkinglabbopentxt}>OPEN</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.gentlthinkinglabbbookmarklistbtn,
                      isSaved && styles.gentlthinkinglabbbookmarklistbtnsaved,
                    ]}
                    onPress={() => gentlthinkinglabbToggleSave(story.id)}>
                    <Image
                      source={require('../../assets/i/gentlthinkinglabbtab5.png')}
                      tintColor={isSaved ? '#DD00FF' : '#00000080'}
                      style={styles.gentlthinkinglabbbookmarkicon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      </Gentlthinkinglabblay>

      <Modal
        visible={!!gentlthinkinglabbSelectedStory}
        animationType="fade"
        transparent={true}
        statusBarTranslucent={Platform.OS === 'android'}
        onRequestClose={() => setGentlthinkinglabbSelected(null)}>
        <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.224)'}}>
          <ScrollView
            contentContainerStyle={styles.gentlthinkinglabbdetailwrap}
            showsVerticalScrollIndicator={false}>
            <Text style={styles.gentlthinkinglabbtitle}>Symbol Stories</Text>
            {gentlthinkinglabbSelectedStory && (
              <View style={styles.gentlthinkinglabbcard}>
                <View style={styles.gentlthinkinglabbcardheader}>
                  <Text style={styles.gentlthinkinglabbcardtitle}>
                    {gentlthinkinglabbSelectedStory.title}
                  </Text>
                  <TouchableOpacity
                    style={styles.gentlthinkinglabbclosebtn}
                    onPress={() => setGentlthinkinglabbSelected(null)}>
                    <Image
                      source={require('../../assets/i/gentlthinkincls.png')}
                    />
                  </TouchableOpacity>
                </View>
                <Image
                  source={gentlthinkinglabbSelectedStory.detimage}
                  style={styles.gentlthinkinglabbdetailimg}
                  resizeMode="cover"
                />
                <View style={styles.gentlthinkinglabbactionrow}>
                  <TouchableOpacity
                    style={styles.gentlthinkinglabbbtnshare}
                    onPress={() =>
                      gentlthinkinglabbShareStory(
                        gentlthinkinglabbSelectedStory,
                      )
                    }>
                    <Text style={styles.gentlthinkinglabbbtntxt}>SHARE</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.gentlthinkinglabbbtnbookmark,
                      gentlthinkinglabbIsSaved &&
                        styles.gentlthinkinglabbbtnbookmarksaved,
                    ]}
                    onPress={() =>
                      gentlthinkinglabbToggleSave(
                        gentlthinkinglabbSelectedStory.id,
                      )
                    }>
                    <Image
                      source={require('../../assets/i/gentlthinkinglabbtab5.png')}
                      tintColor={
                        !gentlthinkinglabbIsSaved ? '#00000080' : '#DD00FF'
                      }
                      style={styles.gentlthinkinglabbbookmarkicon}
                    />
                  </TouchableOpacity>
                </View>
                {gentlthinkinglabbSelectedStory.paragraphs.map((p, i) => (
                  <Text key={i} style={styles.gentlthinkinglabbpara}>
                    {p}
                  </Text>
                ))}
              </View>
            )}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

export default Gentlthinkinglabbstries;

const styles = StyleSheet.create({
  gentlthinkinglabbcardheader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },

  gentlthinkinglabbcardtitle: {
    fontSize: 18,
    fontFamily: 'MontserratAlternates-Black',
    color: '#000',
    flex: 1,
    marginRight: 10,
  },
  gentlthinkinglabbclosebtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  gentlthinkinglabbmodalbg: {
    flex: 1,
  },
  gentlthinkinglabbtitle: {
    fontSize: 26,
    fontFamily: 'MontserratAlternates-Black',
    color: '#fff',
    textAlign: 'center',
    marginTop: 70,
    marginBottom: 20,
  },
  gentlthinkinglabblistwrap: {
    paddingHorizontal: 16,
    paddingBottom: 160,
  },
  gentlthinkinglabblistcard: {
    backgroundColor: '#8886F9',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 42,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 34,
    paddingVertical: 14,
    marginBottom: 14,
    gap: 16,
    justifyContent: 'space-between',
  },
  gentlthinkinglabblistimg: {
    width: 120,
    height: 120,
  },
  gentlthinkinglabblistbtns: {
    gap: 10,
  },
  gentlthinkinglabbopenbtn: {
    backgroundColor: '#DD00FF',
    borderRadius: 18,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFFCC',
    width: 150,
  },
  gentlthinkinglabbopentxt: {
    fontSize: 16,
    fontFamily: 'MontserratAlternates-SemiBold',
    color: '#fff',
  },
  gentlthinkinglabbbookmarklistbtn: {
    backgroundColor: '#DD00FF',
    borderRadius: 18,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFFCC',
    width: 150,
  },
  gentlthinkinglabbbookmarklistbtnsaved: {
    backgroundColor: '#fff',

    borderColor: '#D1B7F0',
  },
  gentlthinkinglabbbookmarkicon: {
    width: 24,
    height: 24,
  },
  gentlthinkinglabbdetailwrap: {
    paddingHorizontal: 16,
    paddingBottom: 161,
  },
  gentlthinkinglabbcard: {
    backgroundColor: '#8886F9',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 42,
    padding: 20,
  },

  gentlthinkinglabbclosetext: {
    fontSize: 16,
    color: '#555',
    fontFamily: 'MontserratAlternates-Medium',
  },
  gentlthinkinglabbdetailimg: {
    width: '100%',
    height: 181,
    borderRadius: 20,
    marginBottom: 14,
  },
  gentlthinkinglabbactionrow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  gentlthinkinglabbbtnshare: {
    flex: 1,
    backgroundColor: '#DD00FF',
    borderRadius: 12,
    height: 48,

    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFFCC',
  },

  gentlthinkinglabbbtnbookmark: {
    flex: 1,

    borderRadius: 12,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,

    backgroundColor: '#DD00FF',
    borderColor: '#FFFFFFCC',
  },
  gentlthinkinglabbbtnbookmarksaved: {
    borderColor: '#D1B7F0',
    backgroundColor: '#fff',
  },
  gentlthinkinglabbbtntxt: {
    fontSize: 14,
    fontFamily: 'MontserratAlternates-SemiBold',
    color: '#fff',
  },
  gentlthinkinglabbpara: {
    fontSize: 15,
    fontFamily: 'MontserratAlternates-Medium',
    color: '#fff',
    marginBottom: 14,
  },
});

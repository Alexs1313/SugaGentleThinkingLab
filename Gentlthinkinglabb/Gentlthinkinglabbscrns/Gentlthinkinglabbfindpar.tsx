import Gentlthinkinglabblay from '../Gentlthinkinglabbcpnts/Gentlthinkinglabblay';

import {useFocusEffect} from '@react-navigation/native';

import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Share,
  Modal,
  Vibration,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GENTLTHINKINGLABB_VIBRATION_KEY = 'gentlthinkinglabb_vibration';

const CARD_GAP = 10;

const GENTLTHINKINGLABB_IMGS = [
  require('../../assets/i/gentlthinkinglaon1.png'),
  require('../../assets/i/gentlthinkinglaon2.png'),
  require('../../assets/i/gentlthinkinglaon3.png'),
  require('../../assets/i/gentlthinkinglaon4.png'),
  require('../../assets/i/gentlthinkinglaost7.png'),
];

const MAX_ROUND = 10;

type GentlthinkinglabbCard = {
  id: string;
  pairIdx: number;
  imgIdx: number;
  flipped: boolean;
  matched: boolean;
};

type GentlthinkinglabbState = 'tutorial' | 'playing' | 'complete';

const gentlthinkinglabbMakeCards = (round: number): GentlthinkinglabbCard[] => {
  const pairs = round + 1;
  const arr: GentlthinkinglabbCard[] = [];
  for (let i = 0; i < pairs; i++) {
    const imgIdx = i % GENTLTHINKINGLABB_IMGS.length;
    arr.push({id: `${i}a`, pairIdx: i, imgIdx, flipped: false, matched: false});
    arr.push({id: `${i}b`, pairIdx: i, imgIdx, flipped: false, matched: false});
  }
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const Gentlthinkinglabbfindpar = () => {
  const [gentlthinkinglabbState, setGentlthinkinglabbState] =
    useState<GentlthinkinglabbState>('tutorial');
  const [gentlthinkinglabbRound, setGentlthinkinglabbRound] = useState(1);
  const [gentlthinkinglabbCards, setGentlthinkinglabbCards] = useState<
    GentlthinkinglabbCard[]
  >([]);
  const [gentlthinkinglabbFirst, setGentlthinkinglabbFirst] = useState<
    string | null
  >(null);
  const [gentlthinkinglabbLocked, setGentlthinkinglabbLocked] = useState(false);
  const [gentlthinkinglabbVibrationOn, setGentlthinkinglabbVibrationOn] =
    useState(true);

  useFocusEffect(
    useCallback(() => {
      setGentlthinkinglabbState('tutorial');
      setGentlthinkinglabbRound(1);
      setGentlthinkinglabbCards([]);
      setGentlthinkinglabbFirst(null);
      setGentlthinkinglabbLocked(false);
    }, []),
  );

  useEffect(() => {
    AsyncStorage.getItem(GENTLTHINKINGLABB_VIBRATION_KEY)
      .then(v => {
        if (v !== null) {
          setGentlthinkinglabbVibrationOn(v === 'true');
        }
      })
      .catch(() => {});
  }, []);

  const gentlthinkinglabbStartRound = (r: number) => {
    setGentlthinkinglabbCards(gentlthinkinglabbMakeCards(r));
    setGentlthinkinglabbFirst(null);
    setGentlthinkinglabbLocked(false);
    setGentlthinkinglabbState('playing');
  };

  useEffect(() => {
    if (gentlthinkinglabbState !== 'playing') {
      return;
    }
    if (
      gentlthinkinglabbCards.length > 0 &&
      gentlthinkinglabbCards.every(c => c.matched)
    ) {
      setGentlthinkinglabbState('complete');
    }
  }, [gentlthinkinglabbCards, gentlthinkinglabbState]);

  const gentlthinkinglabbHandleCard = (id: string) => {
    if (gentlthinkinglabbLocked) {
      return;
    }
    const card = gentlthinkinglabbCards.find(c => c.id === id);
    if (!card || card.matched || card.flipped) {
      return;
    }

    setGentlthinkinglabbCards(prev =>
      prev.map(c => (c.id === id ? {...c, flipped: true} : c)),
    );

    if (gentlthinkinglabbFirst === null) {
      setGentlthinkinglabbFirst(id);
    } else {
      const first = gentlthinkinglabbCards.find(
        c => c.id === gentlthinkinglabbFirst,
      )!;
      setGentlthinkinglabbFirst(null);
      setGentlthinkinglabbLocked(true);

      if (first.pairIdx === card.pairIdx) {
        if (gentlthinkinglabbVibrationOn) {
          Vibration.vibrate(150);
        }
        setTimeout(() => {
          setGentlthinkinglabbCards(prev =>
            prev.map(c =>
              c.id === first.id || c.id === id ? {...c, matched: true} : c,
            ),
          );
          setGentlthinkinglabbLocked(false);
        }, 400);
      } else {
        setTimeout(() => {
          setGentlthinkinglabbCards(prev =>
            prev.map(c =>
              c.id === first.id || c.id === id ? {...c, flipped: false} : c,
            ),
          );
          setGentlthinkinglabbLocked(false);
        }, 700);
      }
    }
  };

  const gentlthinkinglabbContinue = () => {
    const next =
      gentlthinkinglabbRound >= MAX_ROUND ? 1 : gentlthinkinglabbRound + 1;
    setGentlthinkinglabbRound(next);
    gentlthinkinglabbStartRound(next);
  };

  const gentlthinkinglabbShare = async () => {
    try {
      await Share.share({
        message: `I completed Round ${gentlthinkinglabbRound} in Find a Pair!`,
      });
    } catch {
      console.log('error');
    }
  };

  const gentlthinkinglabbClose = () => {
    setGentlthinkinglabbState('tutorial');
    setGentlthinkinglabbRound(1);
    setGentlthinkinglabbCards([]);
  };

  return (
    <>
      <Gentlthinkinglabblay>
        <View style={styles.gentlthinkinglabbwrap}>
          <Text style={styles.gentlthinkinglabbtitle}>Find a pair</Text>

          {gentlthinkinglabbState === 'tutorial' ? (
            <View style={styles.gentlthinkinglabbtutcard}>
              <Text style={styles.gentlthinkinglabbtuthow}>How it works:</Text>
              <Text style={styles.gentlthinkinglabbtuttext}>
                {
                  'Find identical pairs among the elements.\nClick on two identical figures in a row - they will disappear.\nWith each level, there are more pairs.'
                }
              </Text>
              <View style={styles.gentlthinkinglabbdemorow}>
                {[false, true, false, true].map((rev, i) => (
                  <View
                    key={i}
                    style={{
                      backgroundColor: '#DD00FF',
                      paddingBottom: 3,
                      borderRadius: 16,
                    }}>
                    <View
                      style={[
                        styles.gentlthinkinglabbdemocard,
                        rev && styles.gentlthinkinglabbdemocardrev,
                      ]}>
                      {rev ? (
                        <Image
                          source={GENTLTHINKINGLABB_IMGS[1]}
                          style={styles.gentlthinkinglabbdemoimg}
                          resizeMode="contain"
                        />
                      ) : (
                        <Text style={styles.gentlthinkinglabbcardq}>?</Text>
                      )}
                    </View>
                  </View>
                ))}
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.gentlthinkinglabbstartbtn}
                onPress={() => {
                  setGentlthinkinglabbRound(1);
                  gentlthinkinglabbStartRound(1);
                }}>
                <Text style={styles.gentlthinkinglabbbtntxt}>OK, START</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <View style={styles.gentlthinkinglabbbadgewrap}>
                <View style={styles.gentlthinkinglabbbadge}>
                  <Text style={styles.gentlthinkinglabbbadgetxt}>
                    Round: {gentlthinkinglabbRound}
                  </Text>
                </View>
              </View>

              <View style={styles.gentlthinkinglabbgrid}>
                {gentlthinkinglabbCards.map(card => (
                  <View
                    key={card.id}
                    style={[
                      {
                        backgroundColor: '#DD00FF',
                        paddingBottom: 3,
                        borderRadius: 16,
                      },
                      card.matched && styles.gentlthinkinglabbcardgone,
                    ]}>
                    <TouchableOpacity
                      key={card.id}
                      activeOpacity={0.7}
                      onPress={() => gentlthinkinglabbHandleCard(card.id)}
                      style={[
                        styles.gentlthinkinglabbcard,
                        card.matched && styles.gentlthinkinglabbcardgone,
                      ]}>
                      {card.flipped && !card.matched ? (
                        <Image
                          source={GENTLTHINKINGLABB_IMGS[card.imgIdx]}
                          style={styles.gentlthinkinglabbcardimg}
                          resizeMode="contain"
                        />
                      ) : !card.matched ? (
                        <Text style={styles.gentlthinkinglabbcardq}>?</Text>
                      ) : null}
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </>
          )}
        </View>
      </Gentlthinkinglabblay>

      <Modal
        visible={gentlthinkinglabbState === 'complete'}
        animationType="fade"
        transparent={true}
        onRequestClose={gentlthinkinglabbClose}>
        <View style={styles.gentlthinkinglabboverlay}>
          <View style={styles.gentlthinkinglabbcompcard}>
            <Text style={styles.gentlthinkinglabbcomptitle}>
              ROUND COMPLETED
            </Text>

            <View style={styles.gentlthinkinglabbcompbadge}>
              <Text style={styles.gentlthinkinglabbcompbadgetxt}>
                Round: {gentlthinkinglabbRound}
              </Text>
            </View>

            <View style={styles.gentlthinkinglabbimgrow}>
              {GENTLTHINKINGLABB_IMGS.map((src, i) => (
                <Image
                  key={i}
                  source={src}
                  style={styles.gentlthinkinglabbcompimg}
                  resizeMode="contain"
                />
              ))}
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.gentlthinkinglabbcompbtn}
              onPress={gentlthinkinglabbShare}>
              <Text style={styles.gentlthinkinglabbbtntxt}>SHARE</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.gentlthinkinglabbcompbtn}
              onPress={gentlthinkinglabbContinue}>
              <Text style={styles.gentlthinkinglabbbtntxt}>CONTINUE</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.gentlthinkinglabbclosebtn}
              onPress={gentlthinkinglabbClose}>
              <Image
                source={require('../../assets/i/gentlthinkincls.png')}
                style={styles.gentlthinkinglabbcloseicon}
              />
              <Text style={styles.gentlthinkinglabbclosetxt}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Gentlthinkinglabbfindpar;

const styles = StyleSheet.create({
  gentlthinkinglabbtuthow: {
    fontSize: 20,
    fontFamily: 'MontserratAlternates-Black',
    color: '#fff',
    marginBottom: 23,
    textAlign: 'center',
  },

  gentlthinkinglabbtuttext: {
    fontSize: 16,
    fontFamily: 'MontserratAlternates-Medium',
    color: '#fff',
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 34,
  },

  gentlthinkinglabbwrap: {
    paddingHorizontal: 16,
    paddingTop: 71,
    paddingBottom: 163,
  },
  gentlthinkinglabbtitle: {
    fontSize: 26,
    fontFamily: 'MontserratAlternates-Black',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 60,
  },
  gentlthinkinglabbtutcard: {
    backgroundColor: '#8886F9',
    borderRadius: 42,
    padding: 28,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },

  gentlthinkinglabbdemorow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: CARD_GAP,
    marginBottom: 58,
  },
  gentlthinkinglabbdemocard: {
    width: 54,
    height: 54,
    backgroundColor: '#fff',
    borderRadius: 14,

    justifyContent: 'center',
    alignItems: 'center',
  },
  gentlthinkinglabbdemocardrev: {
    backgroundColor: '#D8D0F8',
  },
  gentlthinkinglabbdemoimg: {
    width: 44,
    height: 44,
  },

  gentlthinkinglabbstartbtn: {
    backgroundColor: '#DD00FF',
    borderRadius: 18,
    height: 70,
    width: '84%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFFCC',
  },
  gentlthinkinglabbbadgewrap: {
    alignItems: 'center',
    marginBottom: 28,
  },
  gentlthinkinglabbbadge: {
    backgroundColor: '#8886F9',
    borderRadius: 12,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#FFFFFFCC',
    height: 66,
    justifyContent: 'center',
  },

  gentlthinkinglabbbadgetxt: {
    fontSize: 18,
    fontFamily: 'MontserratAlternates-SemiBold',
    color: '#fff',
  },
  gentlthinkinglabbgrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: CARD_GAP,
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
    alignSelf: 'center',
  },
  gentlthinkinglabbcard: {
    width: 54,
    height: 54,
    backgroundColor: '#fff',
    borderRadius: 16,

    justifyContent: 'center',
    alignItems: 'center',
  },
  gentlthinkinglabbcardgone: {
    opacity: 0,
  },
  gentlthinkinglabbcardimg: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  gentlthinkinglabbcardq: {
    fontSize: 22,
    fontFamily: 'MontserratAlternates-Black',
    color: '#DD00FF',
  },
  gentlthinkinglabboverlay: {
    flex: 1,
    backgroundColor: 'rgba(80, 60, 160, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  gentlthinkinglabbcompcard: {
    backgroundColor: '#8886F9',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 42,
    padding: 28,
    width: '100%',
    alignItems: 'center',
  },
  gentlthinkinglabbcomptitle: {
    fontSize: 26,
    fontFamily: 'MontserratAlternates-Black',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 34,
  },
  gentlthinkinglabbcompbadge: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 32,
    paddingVertical: 12,
    marginBottom: 20,
    height: 66,
    justifyContent: 'center',
  },
  gentlthinkinglabbcompbadgetxt: {
    fontSize: 20,
    fontFamily: 'MontserratAlternates-SemiBold',
    color: '#8886F9',
  },
  gentlthinkinglabbimgrow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 29,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  gentlthinkinglabbcompimg: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  gentlthinkinglabbcompbtn: {
    backgroundColor: '#DD00FF',
    borderRadius: 18,
    width: '84%',
    alignSelf: 'center',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#FFFFFFCC',
  },
  gentlthinkinglabbbtntxt: {
    fontSize: 20,
    fontFamily: 'MontserratAlternates-SemiBold',
    color: '#fff',
  },
  gentlthinkinglabbclosebtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
    paddingVertical: 8,
  },
  gentlthinkinglabbcloseicon: {
    width: 22,
    height: 22,
  },
  gentlthinkinglabbclosetxt: {
    fontSize: 16,
    fontFamily: 'MontserratAlternates-SemiBold',
    color: '#fff',
  },
});

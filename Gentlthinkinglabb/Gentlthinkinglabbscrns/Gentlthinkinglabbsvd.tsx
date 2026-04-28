// saved
import AsyncStorage from '@react-native-async-storage/async-storage';

import Gentlthinkinglabblay from '../Gentlthinkinglabbcpnts/Gentlthinkinglabblay';

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
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

const GENTLTHINKINGLABB_STORIES_KEY = 'gentlthinkinglabb_saved_stories';
const GENTLTHINKINGLABB_FACTS_KEY = 'gentlthinkinglabb_saved_facts';

type GentlthinkinglabbStory = {
  id: number;
  image: ReturnType<typeof require>;
  detimage: ReturnType<typeof require>;
  title: string;
  paragraphs: string[];
};

const GENTLTHINKINGLABB_STORIES: GentlthinkinglabbStory[] = [
  {
    id: 1,
    image: require('../../assets/i/gentlthinkinglaon1.png'),
    detimage: require('../../assets/i/gentlthinkinglaost1.png'),
    title: 'Change without noise',
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
    detimage: require('../../assets/i/gentlthinkinglaost3.png'),
    title: 'Simple Decision',
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
    detimage: require('../../assets/i/gentlthinkinglaost4.png'),
    title: 'A feeling without a name',
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
    detimage: require('../../assets/i/gentlthinkinglaost5.png'),
    title: 'More inside than meets the eye',
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

const GENTLTHINKINGLABB_FACT_IMAGES = [
  require('../../assets/i/gentlthinkinglaon1.png'),
  require('../../assets/i/gentlthinkinglaon2.png'),
  require('../../assets/i/gentlthinkinglaon3.png'),
  require('../../assets/i/gentlthinkinglaon4.png'),
  require('../../assets/i/gentlthinkinglaost7.png'),
];

type GentlthinkinglabbSavedFact = {text: string; imgIdx: number};

const Gentlthinkinglabbsvd = () => {
  const [gentlthinkinglabbSavedIds, setGentlthinkinglabbSavedIds] = useState<
    number[]
  >([]);
  const [gentlthinkinglabbSavedFacts, setGentlthinkinglabbSavedFacts] =
    useState<GentlthinkinglabbSavedFact[]>([]);
  const [gentlthinkinglabbOpenStory, setGentlthinkinglabbOpenStory] =
    useState<GentlthinkinglabbStory | null>(null);

  useFocusEffect(
    useCallback(() => {
      Promise.all([
        AsyncStorage.getItem(GENTLTHINKINGLABB_STORIES_KEY),
        AsyncStorage.getItem(GENTLTHINKINGLABB_FACTS_KEY),
      ])
        .then(([sv, fv]) => {
          if (sv) {
            setGentlthinkinglabbSavedIds(JSON.parse(sv));
          }
          if (fv) {
            setGentlthinkinglabbSavedFacts(JSON.parse(fv));
          }
        })
        .catch(() => {
          console.log('error');
        });
    }, []),
  );

  const gentlthinkinglabbUnsaveStory = async (id: number) => {
    const next = gentlthinkinglabbSavedIds.filter(x => x !== id);
    setGentlthinkinglabbSavedIds(next);
    await AsyncStorage.setItem(
      GENTLTHINKINGLABB_STORIES_KEY,
      JSON.stringify(next),
    ).catch(() => {
      console.log('error');
    });
  };

  const gentlthinkinglabbSaveStory = async (id: number) => {
    const next = [...gentlthinkinglabbSavedIds, id];
    setGentlthinkinglabbSavedIds(next);
    await AsyncStorage.setItem(
      GENTLTHINKINGLABB_STORIES_KEY,
      JSON.stringify(next),
    ).catch(() => {
      console.log('error');
    });
  };

  const gentlthinkinglabbUnsaveFact = async (fact: GentlthinkinglabbSavedFact) => {
    const next = gentlthinkinglabbSavedFacts.filter(f => f.text !== fact.text);
    setGentlthinkinglabbSavedFacts(next);
    await AsyncStorage.setItem(
      GENTLTHINKINGLABB_FACTS_KEY,
      JSON.stringify(next),
    ).catch(() => {
      console.log('error');
    });
  };

  const gentlthinkinglabbShareFact = async (fact: GentlthinkinglabbSavedFact) => {
    try {
      await Share.share({message: fact.text});
    } catch {
      console.log('error');
    }
  };

  const gentlthinkinglabbShareStory = async (story: GentlthinkinglabbStory) => {
    try {
      await Share.share({
        message: `${story.title}\n\n${story.paragraphs.join('\n\n')}`,
      });
    } catch {
      console.log('error');
    }
  };

  const gentlthinkinglabbSavedStories = GENTLTHINKINGLABB_STORIES.filter(s =>
    gentlthinkinglabbSavedIds.includes(s.id),
  );

  const gentlthinkinglabbTotal =
    gentlthinkinglabbSavedIds.length + gentlthinkinglabbSavedFacts.length;

  const gentlthinkinglabbRecommend = GENTLTHINKINGLABB_STORIES.find(
    s => !gentlthinkinglabbSavedIds.includes(s.id),
  );

  const gentlthinkinglabbIsOpenSaved = gentlthinkinglabbOpenStory
    ? gentlthinkinglabbSavedIds.includes(gentlthinkinglabbOpenStory.id)
    : false;

  return (
    <>
      <Gentlthinkinglabblay>
        <View style={styles.gentlthinkinglabbwrap}>
          <View style={styles.gentlthinkinglabbheader}>
            <Text style={styles.gentlthinkinglabbtitle}>SAVED</Text>
            <Text style={styles.gentlthinkinglabbcount}>
              {gentlthinkinglabbTotal}
            </Text>
          </View>

          {gentlthinkinglabbTotal === 0 ? (
            <>
              <View style={styles.gentlthinkinglabbemptycard}>
                <Text style={styles.gentlthinkinglabbemptytxt}>
                  {'Nothing here yet\nSave something to\ncome back to later'}
                </Text>
              </View>

              {!!gentlthinkinglabbRecommend && (
                <>
                  <Text style={styles.gentlthinkinglabbrecommendlbl}>
                    We recommend saving:
                  </Text>
                  <View style={styles.gentlthinkinglabblistcard}>
                    <Image
                      source={gentlthinkinglabbRecommend.image}
                      style={styles.gentlthinkinglabblistimg}
                      resizeMode="contain"
                    />
                    <View style={styles.gentlthinkinglabblistbtns}>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.gentlthinkinglabbopenbtn}
                        onPress={() =>
                          setGentlthinkinglabbOpenStory(
                            gentlthinkinglabbRecommend,
                          )
                        }>
                        <Text style={styles.gentlthinkinglabbopentxt}>
                          OPEN
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.gentlthinkinglabbbookmarkpink}
                        onPress={() =>
                          gentlthinkinglabbSaveStory(
                            gentlthinkinglabbRecommend.id,
                          )
                        }>
                        <Image
                          source={require('../../assets/i/gentlthinkinglabbtab5.png')}
                          tintColor="#00000080"
                          style={styles.gentlthinkinglabbbookmarkicon}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
              )}
            </>
          ) : (
            <>
              {gentlthinkinglabbSavedStories.map(story => (
                <View
                  key={`story-${story.id}`}
                  style={styles.gentlthinkinglabblistcard}>
                  <Image
                    source={story.image}
                    style={styles.gentlthinkinglabblistimg}
                    resizeMode="contain"
                  />
                  <View style={styles.gentlthinkinglabblistbtns}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={styles.gentlthinkinglabbopenbtn}
                      onPress={() => setGentlthinkinglabbOpenStory(story)}>
                      <Text style={styles.gentlthinkinglabbopentxt}>OPEN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={styles.gentlthinkinglabbbookmarkwhite}
                      onPress={() => gentlthinkinglabbUnsaveStory(story.id)}>
                      <Image
                        source={require('../../assets/i/gentlthinkinglabbtab5.png')}
                        tintColor="#DD00FF"
                        style={styles.gentlthinkinglabbbookmarkicon}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}

              {gentlthinkinglabbSavedFacts.map((fact, index) => {
                return (
                  <View
                    key={`fact-${index}`}
                    style={styles.gentlthinkinglabbfactcard}>
                    <Image
                      source={GENTLTHINKINGLABB_FACT_IMAGES[fact.imgIdx]}
                      style={styles.gentlthinkinglabbfactimg}
                      resizeMode="contain"
                    />
                    <Text style={styles.gentlthinkinglabbfacttxt}>{fact.text}</Text>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={styles.gentlthinkinglabbsharebtn}
                      onPress={() => gentlthinkinglabbShareFact(fact)}>
                      <Text style={styles.gentlthinkinglabbsharetxt}>
                        SHARE
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={styles.gentlthinkinglabbbookmarkwhite}
                      onPress={() => gentlthinkinglabbUnsaveFact(fact)}>
                      <Image
                        source={require('../../assets/i/gentlthinkinglabbtab5.png')}
                        tintColor="#DD00FF"
                        style={styles.gentlthinkinglabbbookmarkicon}
                      />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </>
          )}
        </View>
      </Gentlthinkinglabblay>

      <Modal
        visible={!!gentlthinkinglabbOpenStory}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setGentlthinkinglabbOpenStory(null)}>
        <View style={styles.gentlthinkinglabbmodalbg}>
          <ScrollView
            contentContainerStyle={styles.gentlthinkinglabbmodalcontent}
            showsVerticalScrollIndicator={false}>
            <Text style={styles.gentlthinkinglabbmodaltitle}>
              Symbol Stories
            </Text>
            {gentlthinkinglabbOpenStory && (
              <View style={styles.gentlthinkinglabbmodalcard}>
                <View style={styles.gentlthinkinglabbcardheader}>
                  <Text style={styles.gentlthinkinglabbcardtitle}>
                    {gentlthinkinglabbOpenStory.title}
                  </Text>
                  <TouchableOpacity
                    onPress={() => setGentlthinkinglabbOpenStory(null)}>
                    <Image
                      source={require('../../assets/i/gentlthinkincls.png')}
                    />
                  </TouchableOpacity>
                </View>
                <Image
                  source={gentlthinkinglabbOpenStory.detimage}
                  style={styles.gentlthinkinglabbdetailimg}
                  resizeMode="cover"
                />
                <View style={styles.gentlthinkinglabbactionrow}>
                  <TouchableOpacity
                    style={styles.gentlthinkinglabbmodalshare}
                    onPress={() =>
                      gentlthinkinglabbShareStory(gentlthinkinglabbOpenStory)
                    }>
                    <Text style={styles.gentlthinkinglabbmodalbtntext}>
                      SHARE
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.gentlthinkinglabbmodalbookmark,
                      gentlthinkinglabbIsOpenSaved &&
                        styles.gentlthinkinglabbmodalbookmarksaved,
                    ]}
                    onPress={() =>
                      gentlthinkinglabbIsOpenSaved
                        ? gentlthinkinglabbUnsaveStory(
                            gentlthinkinglabbOpenStory.id,
                          )
                        : gentlthinkinglabbSaveStory(
                            gentlthinkinglabbOpenStory.id,
                          )
                    }>
                    <Image
                      source={require('../../assets/i/gentlthinkinglabbtab5.png')}
                      tintColor={
                        gentlthinkinglabbIsOpenSaved ? '#DD00FF' : '#00000080'
                      }
                      style={styles.gentlthinkinglabbbookmarkicon}
                    />
                  </TouchableOpacity>
                </View>
                {gentlthinkinglabbOpenStory.paragraphs.map((p, i) => (
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

export default Gentlthinkinglabbsvd;

const styles = StyleSheet.create({
  gentlthinkinglabbmodaltitle: {
    fontSize: 26,
    fontFamily: 'MontserratAlternates-Black',
    color: '#fff',
    textAlign: 'center',
    marginTop: 70,
    marginBottom: 20,
  },

  gentlthinkinglabbmodalcard: {
    backgroundColor: '#8886F9',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 42,
    padding: 20,
  },

  gentlthinkinglabbwrap: {
    paddingHorizontal: 16,
    paddingTop: 70,
    paddingBottom: 159,
  },
  gentlthinkinglabbheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  gentlthinkinglabbtitle: {
    fontSize: 26,
    fontFamily: 'MontserratAlternates-Black',
    color: '#fff',
  },
  gentlthinkinglabbcount: {
    fontSize: 26,
    fontFamily: 'MontserratAlternates-Black',
    color: '#fff',
  },
  gentlthinkinglabbemptycard: {
    backgroundColor: '#8886F9',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 42,
    padding: 32,
    alignItems: 'center',
    marginBottom: 74,
  },
  gentlthinkinglabbemptytxt: {
    fontSize: 22,
    fontFamily: 'MontserratAlternates-SemiBold',
    color: '#fff',
    textAlign: 'center',
    lineHeight: 28,
  },

  gentlthinkinglabbrecommendlbl: {
    fontSize: 20,
    fontFamily: 'MontserratAlternates-SemiBold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 24,
  },
  gentlthinkinglabblistcard: {
    backgroundColor: '#8886F9',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 42,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 34,
    paddingVertical: 18,
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
  gentlthinkinglabbbookmarkpink: {
    backgroundColor: '#DD00FF',
    borderRadius: 18,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFFCC',
    width: 150,
  },
  gentlthinkinglabbbookmarkwhite: {
    backgroundColor: '#fff',
    borderRadius: 18,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1B7F0',
    width: '100%',
  },
  gentlthinkinglabbbookmarkicon: {
    width: 24,
    height: 24,
  },
  gentlthinkinglabbfactcard: {
    backgroundColor: '#8886F9',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 42,
    padding: 24,
    alignItems: 'center',
    marginBottom: 14,
  },
  gentlthinkinglabbfactimg: {
    width: 180,
    height: 180,
    marginBottom: 16,
  },
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
  gentlthinkinglabbsharetxt: {
    fontSize: 20,
    fontFamily: 'MontserratAlternates-SemiBold',
    color: '#fff',
  },
  gentlthinkinglabbmodalbg: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.224)',
  },
  gentlthinkinglabbmodalcontent: {
    paddingHorizontal: 16,
    paddingBottom: 160,
  },

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
  gentlthinkinglabbdetailimg: {
    width: '100%',
    height: 180,
    borderRadius: 20,
    marginBottom: 14,
  },
  gentlthinkinglabbactionrow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  gentlthinkinglabbmodalshare: {
    flex: 1,
    backgroundColor: '#DD00FF',
    borderRadius: 12,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFFCC',
  },
  gentlthinkinglabbmodalbookmark: {
    flex: 1,
    backgroundColor: '#DD00FF',
    borderRadius: 12,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFFCC',
  },
  gentlthinkinglabbmodalbookmarksaved: {
    backgroundColor: '#fff',
    borderColor: '#D1B7F0',
  },
  gentlthinkinglabbmodalbtntext: {
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

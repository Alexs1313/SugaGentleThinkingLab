import Gentlthinkinglabblay from '../Gentlthinkinglabbcpnts/Gentlthinkinglabblay';

import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from 'react-native';

type GentlthinkinglabbQuestion = {
  id: number;
  text: string;
  options: [string, string, string, string];
  explanation: string;
};

const GENTLTHINKINGLABB_ALL_QUESTIONS: GentlthinkinglabbQuestion[] = [
  {
    id: 1,
    text: 'You are running late, but you see someone you know who wants to talk.',
    options: [
      'Stop and talk',
      'Briefly explain and leave',
      'Pretend not to notice',
      'Postpone the conversation',
    ],
    explanation:
      'Sometimes we choose between being polite and having our own plans. Each option shows what is more important to you at the moment.',
  },
  {
    id: 2,
    text: "You were given advice that you didn't ask for.",
    options: [
      'Listen',
      'Ignore',
      "Thank you, but don't change anything",
      'Ask for more details',
    ],
    explanation:
      "The reaction to other people's opinions often depends on trust, not on the advice itself.",
  },
  {
    id: 3,
    text: 'You have a free hour with no plans.',
    options: [
      'Watch something',
      'Take a walk',
      'Do something useful',
      'Just do nothing',
    ],
    explanation:
      'Free time can be perceived as an opportunity or as a pause — and both options are normal.',
  },
  {
    id: 4,
    text: 'You made a mistake in a simple situation.',
    options: [
      'Fix it and forget',
      'Think about it for a long time',
      'Laugh at it',
      'Avoid it again',
    ],
    explanation:
      'The attitude towards mistakes often determines how quickly we move on.',
  },
  {
    id: 5,
    text: 'You need to make a decision quickly.',
    options: [
      'Trust your first thought',
      'Take a break',
      'Ask someone for advice',
      'Choose the safest option',
    ],
    explanation: 'Quick decisions are a balance between intuition and caution.',
  },
  {
    id: 6,
    text: 'Someone takes a long time to respond to messages.',
    options: [
      'Write again',
      'Wait',
      'Think something is wrong',
      'Switch to other things',
    ],
    explanation: 'We often add meaning where there may not be any.',
  },
  {
    id: 7,
    text: 'You are offered a new experience.',
    options: ['Try it now', 'Postpone for later', 'Reject', 'Learn more'],
    explanation:
      'Your attitude towards new things shows your level of openness to change.',
  },
  {
    id: 8,
    text: 'You feel tired.',
    options: [
      'Keep working',
      'Take a break',
      'Change your activity',
      'Postpone everything',
    ],
    explanation: "Rest may look different, and that's okay.",
  },
  {
    id: 9,
    text: "You disagree with the other person's opinion.",
    options: [
      'Say it directly',
      'Keep quiet',
      'Try to understand',
      'Change the subject',
    ],
    explanation:
      'The reaction depends not only on the thought, but also on the situation and context.',
  },
  {
    id: 10,
    text: 'You start something new.',
    options: [
      'Go slowly',
      'Immerse yourself completely',
      'Watch how others do it',
      'Try and see',
    ],
    explanation:
      'Starting is often not about perfection, but about the first step.',
  },
  {
    id: 11,
    text: "You didn't succeed the first time.",
    options: ['Try again', 'Postpone', 'Change your approach', 'Leave it'],
    explanation: 'Your reaction to failure shapes your subsequent experience.',
  },
  {
    id: 12,
    text: 'You receive unexpected praise.',
    options: ['Accept', 'Doubt', 'Depreciate', 'Thank'],
    explanation:
      'Perceiving the positive is often more difficult than it seems.',
  },
  {
    id: 13,
    text: 'You need to choose between two equally normal options.',
    options: [
      'Choose quickly',
      'Think for a long time',
      'Give in to feelings',
      'Postpone the decision',
    ],
    explanation:
      'Not every choice has an ideal option — sometimes any one leads forward.',
  },
  {
    id: 14,
    text: 'You are left alone with nothing to do.',
    options: ['Find something to do', 'Rest', 'Think', 'Pick up the phone'],
    explanation: 'Silence can be both uncomfortable and useful.',
  },
  {
    id: 15,
    text: 'You need to change a habit.',
    options: ['Do it abruptly', 'In small steps', 'Delay', 'Try another way'],
    explanation:
      "Change doesn't always work the same way — it's the process that matters.",
  },
];

const gentlthinkinglabbShuffle = (arr: GentlthinkinglabbQuestion[]) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const Gentlthinkinglabbqkchoce = () => {
  const [gentlthinkinglabbQuestions, setGentlthinkinglabbQuestions] = useState<
    GentlthinkinglabbQuestion[]
  >(() => gentlthinkinglabbShuffle([...GENTLTHINKINGLABB_ALL_QUESTIONS]));
  const [gentlthinkinglabbIndex, setGentlthinkinglabbIndex] = useState(0);
  const [gentlthinkinglabbAnswer, setGentlthinkinglabbAnswer] = useState<
    number | null
  >(null);

  const gentlthinkinglabbCurrent =
    gentlthinkinglabbQuestions[gentlthinkinglabbIndex];
  const gentlthinkinglabbTotal = gentlthinkinglabbQuestions.length;

  const gentlthinkinglabbReset = () => {
    setGentlthinkinglabbQuestions(
      gentlthinkinglabbShuffle([...GENTLTHINKINGLABB_ALL_QUESTIONS]),
    );
    setGentlthinkinglabbIndex(0);
    setGentlthinkinglabbAnswer(null);
  };

  const gentlthinkinglabbHandleContinue = () => {
    if (gentlthinkinglabbIndex < gentlthinkinglabbTotal - 1) {
      setGentlthinkinglabbIndex(prev => prev + 1);
      setGentlthinkinglabbAnswer(null);
    } else {
      gentlthinkinglabbReset();
    }
  };

  return (
    <>
      <Gentlthinkinglabblay>
        <View style={styles.gentlthinkinglabbwrap}>
          {!!gentlthinkinglabbAnswer ? (
            <View style={styles.gentlthinkinglabbheader}>
              <Text style={styles.gentlthinkinglabbtitle}></Text>
              <Text style={styles.gentlthinkinglabbprogress}></Text>
            </View>
          ) : (
            <View style={styles.gentlthinkinglabbheader}>
              <Text style={styles.gentlthinkinglabbtitle}>Quick Choice</Text>
              <Text style={styles.gentlthinkinglabbprogress}>
                {gentlthinkinglabbIndex + 1}/{gentlthinkinglabbTotal}
              </Text>
            </View>
          )}

          <View style={styles.gentlthinkinglabbquestioncard}>
            <Image
              source={require('../../assets/i/gentlthinkinglaon2.png')}
              style={styles.gentlthinkinglabbqimage}
              resizeMode="contain"
            />
            <Text style={styles.gentlthinkinglabbqtext}>
              {gentlthinkinglabbCurrent.text}
            </Text>
          </View>

          {gentlthinkinglabbCurrent.options.map((opt, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.gentlthinkinglabboptionbtn}
              onPress={() => setGentlthinkinglabbAnswer(idx)}>
              <Text style={styles.gentlthinkinglabboptiontxt}>
                {String.fromCharCode(65 + idx)}. {opt}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Gentlthinkinglabblay>

      <Modal
        animationType="fade"
        visible={gentlthinkinglabbAnswer !== null}
        transparent={true}
        onRequestClose={gentlthinkinglabbReset}>
        <View style={styles.gentlthinkinglabboverlay}>
          <ScrollView
            contentContainerStyle={styles.gentlthinkinglabbmodalcontent}
            showsVerticalScrollIndicator={false}>
            <Text style={styles.gentlthinkinglabbresulttitle}>Your choice</Text>

            <View style={styles.gentlthinkinglabbquestioncard}>
              <Image
                source={require('../../assets/i/gentlthinkinglaon2.png')}
                style={styles.gentlthinkinglabbqimage}
                resizeMode="contain"
              />
              <Text style={styles.gentlthinkinglabbqtext}>
                {gentlthinkinglabbCurrent.text}
              </Text>
              {gentlthinkinglabbAnswer !== null && (
                <View style={styles.gentlthinkinglabbanswerrow}>
                  <Text style={styles.gentlthinkinglabbanswerlabl}>
                    Your answer:
                  </Text>
                  <View style={styles.gentlthinkinglabbanswerval}>
                    <Text style={styles.gentlthinkinglabbanswerxt}>
                      {String.fromCharCode(65 + gentlthinkinglabbAnswer)}.{' '}
                      {
                        gentlthinkinglabbCurrent.options[
                          gentlthinkinglabbAnswer
                        ]
                      }
                    </Text>
                  </View>
                </View>
              )}

              <View style={styles.gentlthinkinglabbexplcard}>
                <Text style={styles.gentlthinkinglabbexpltitle}>
                  Explanation:
                </Text>
                <Text style={styles.gentlthinkinglabbexpltext}>
                  {gentlthinkinglabbCurrent.explanation}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.gentlthinkinglabbcontinuebtn}
                onPress={gentlthinkinglabbHandleContinue}>
                <Text style={styles.gentlthinkinglabbcontinuetxt}>
                  CONTINUE
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.gentlthinkinglabbclosewrap}
                onPress={gentlthinkinglabbReset}>
                <View style={styles.gentlthinkinglabbclosecircle}>
                  <Image
                    source={require('../../assets/i/gentlthinkincls.png')}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.gentlthinkinglabbclosetxt}>Close</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

export default Gentlthinkinglabbqkchoce;

const styles = StyleSheet.create({
  gentlthinkinglabbanswerrow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    gap: 16,
    flexWrap: 'wrap',
    marginBottom: 24,
  },

  gentlthinkinglabbanswerlabl: {
    fontSize: 16,
    fontFamily: 'MontserratAlternates-Medium',
    color: '#fff',
  },
  gentlthinkinglabbanswerval: {
    backgroundColor: '#21AA48',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flex: 1,
    height: 71,

    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFFCC',
  },

  gentlthinkinglabbwrap: {
    paddingHorizontal: 16,
    paddingTop: 71,
    paddingBottom: 158,
  },
  gentlthinkinglabbheader: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  gentlthinkinglabbtitle: {
    fontSize: 26,
    fontFamily: 'MontserratAlternates-Black',
    color: '#fff',
  },
  gentlthinkinglabbprogress: {
    fontSize: 26,
    fontFamily: 'MontserratAlternates-Black',
    color: '#fff',
  },
  gentlthinkinglabbquestioncard: {
    backgroundColor: '#8886F9',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 42,
    alignItems: 'center',
    padding: 20,
    marginBottom: 16,
  },
  gentlthinkinglabbqimage: {
    width: 100,
    height: 100,
    marginBottom: 12,
  },
  gentlthinkinglabbqtext: {
    fontSize: 16,
    fontFamily: 'MontserratAlternates-Medium',
    color: '#fff',
    textAlign: 'center',
    lineHeight: 24,
  },

  gentlthinkinglabbanswerxt: {
    fontSize: 15,
    fontFamily: 'MontserratAlternates-SemiBold',
    color: '#fff',
    textAlign: 'center',
  },
  gentlthinkinglabboptionbtn: {
    backgroundColor: '#DD00FF',
    borderRadius: 18,
    height: 60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#FFFFFFCC',
    paddingHorizontal: 16,
  },
  gentlthinkinglabboptiontxt: {
    fontSize: 16,
    fontFamily: 'MontserratAlternates-SemiBold',
    color: '#fff',
    textAlign: 'center',
  },
  gentlthinkinglabboverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.22)',
  },
  gentlthinkinglabbmodalcontent: {
    paddingHorizontal: 16,
    paddingTop: 70,
    paddingBottom: 160,
  },
  gentlthinkinglabbresulttitle: {
    fontSize: 28,
    fontFamily: 'MontserratAlternates-Black',
    color: '#fff',
    marginBottom: 20,
  },
  gentlthinkinglabbexplcard: {
    backgroundColor: '#fff',
    borderRadius: 42,
    padding: 26,
    marginBottom: 20,
  },
  gentlthinkinglabbexpltitle: {
    fontSize: 20,
    fontFamily: 'MontserratAlternates-Black',
    color: '#8886F9',
    marginBottom: 13,
    textAlign: 'center',
  },
  gentlthinkinglabbexpltext: {
    fontSize: 16,
    fontFamily: 'MontserratAlternates-Medium',
    color: '#8886F9',
    lineHeight: 22,
    textAlign: 'center',
  },
  gentlthinkinglabbcontinuebtn: {
    backgroundColor: '#DD00FF',
    borderRadius: 18,
    height: 71,
    width: '77%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FFFFFFCC',
  },
  gentlthinkinglabbcontinuetxt: {
    fontSize: 20,
    fontFamily: 'MontserratAlternates-SemiBold',
    color: '#fff',
  },
  gentlthinkinglabbclosewrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 10,
  },
  gentlthinkinglabbclosecircle: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  gentlthinkinglabbclosetxt: {
    fontSize: 20,
    fontFamily: 'MontserratAlternates-SemiBold',
    color: '#fff',
  },
});

import React, { useState, useEffect, useContext } from 'react';
import { Box, Center, VStack, useToast, Text } from '@chakra-ui/react';
import { decodeQuestion, decodeHtml, shuffle } from './utils/utils';
import { initialValues } from './constants/initialValues';
import Header from './components/header/Header';
import ImageHint from './components/ImageHint';
import GameInterface from './components/GameInterface';
import FooterLinks from './components/FooterLinks';
import Loader from './components/Loader';
import GameResultToast from './components/GameResultToast';
import BoxedAlphabets from './components/BoxedAlphabets';
import {
  getLeaderBoards,
  getQuestions,
  postLeaderBoard,
} from './api/openTriviaApi';
import { getImage, getImage2, getImage3 } from './api/imageSearch';
import { categories } from './constants/gameSettings';
import {
  successMessages,
  failMessages,
} from './constants/gameFailOrSuccessMessage';
import { Context as ScoreContext } from './context/ScoreContext';
import styled from '@emotion/styled';

const App = () => {
  const scoreContext = useContext(ScoreContext);
  const { playerScore } = scoreContext.state;

  const [loading, setLoading] = useState({
    app: false,
    highScores: false,
    saveScore: false,
  });
  // animated boxed letters
  const [boxedLetters, setBoxedLetters] = useState(
    'Drag the letters and play along!'.split('')
  );
  const [boxedLettersColor, setBoxedLettersColor] = useState('orange.400');

  //states used for open trivia api
  const [apiVariables, setApiVariables] = useState({
    difficulty: 'easy',
    category: 9,
    numOfQuestions: 5,
  });

  const [imageHint, setImageHint] = useState('');
  const [scoreLeaders, setScoreLeaders] = useState([]);
  const [playerName, setPlayerName] = useState('');
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  // initialValues are symbols, punctuations or space etc.
  const [guessedLetters, setGuessedLetters] = useState(initialValues);
  const [invalidGuess, setInvalidGuess] = useState(0);
  const [invalidLetters, setInvalidLetters] = useState([]);
  // states used for conditionally removing blur on image hint when you guessed wrong letter
  const [clearedIndex, setClearedIndex] = useState([]);
  const ranNums = shuffle([0, 1, 2, 3, 4]);
  const [randomNums, setRandomNums] = useState(ranNums);

  // to display placeholder when background image is loading
  const [bgIsLoaded, setBgIsLoaded] = useState(false);

  // states to display current question, category, difficulty and answer
  const currentCat = categories.find(
    cat => cat.value === apiVariables.category
  );
  const [current, setCurrent] = useState({
    answer: '',
    question: '',
    category: currentCat && currentCat.name,
    difficulty: apiVariables.difficulty,
  });

  const resetGuessedLetters = () => setGuessedLetters(initialValues);

  const existingPlayerScore = scoreLeaders.find(
    player => player.name === playerName
  );

  const fetchQUestions = () => {
    setLoading({ app: true });
    let currentAnswer = '';
    let curentQuestion = '';
    let currentCategory = '';
    let currentDifficulty = '';
    getQuestions(
      apiVariables.numOfQuestions,
      apiVariables.category === 0 ? '' : apiVariables.category,
      apiVariables.difficulty === 'Any Difficulty'
        ? ''
        : apiVariables.difficulty
    )
      .then(res => {
        // console.log('result', res);
        if (res.data.response_code !== 0) {
          setBoxedLetters('Error! Try other settings.'.split(''));
          setBoxedLettersColor('red.500');
          console.error(
            'No data was returned, number of questions may be limited for the category and difficulty you selected'
          );
          setTimeout(() => {
            setLoading({ app: false });
          }, 3000);
        } else {
          setQuestions(res.data.results);
          curentQuestion = decodeQuestion(
            res.data.results[questionIndex] &&
              res.data.results[questionIndex].question
          );
          currentAnswer = decodeHtml(
            res.data.results[questionIndex] &&
              res.data.results[questionIndex].correct_answer
          );
          currentCategory =
            res.data.results[questionIndex] &&
            res.data.results[questionIndex].category;
          currentDifficulty =
            res.data.results[questionIndex] &&
            res.data.results[questionIndex].difficulty;
          setCurrent({
            category: currentCategory,
            difficulty: currentDifficulty,
            answer: currentAnswer,
            question: curentQuestion,
          });
          fetchImage(curentQuestion);
          resetGuessedLetters();
          setInvalidLetters([]);
          setTimeout(() => {
            setLoading({ app: false });
          }, 3000);
        }
      })
      .catch(err => {
        setTimeout(() => {
          setLoading({ app: false });
        }, 3000);
        setBoxedLetters('Error! Something went wrong'.split(''));
        setBoxedLettersColor('red.500');
        // console.log('fetch question error', err);
      });
  };

  const getScores = () => {
    setLoading({ highScores: true });
    getLeaderBoards()
      .then(res => {
        // console.log('scores response', res.data);
        setScoreLeaders(res.data);
        setTimeout(() => {
          setLoading({ highScores: false });
        }, 1000);
      })
      .catch(err => {
        setLoading({ highScores: false });
        // console.log(err);
      });
  };

  const fetchImage = query => {
    let thumbnail = '';
    if (localStorage.getItem(query)) {
      thumbnail = JSON.parse(localStorage.getItem(query));
      setImageHint(thumbnail);
    } else {
      getImage3(query)
        .then(res => {
          console.log(res.data.value);
          setImageHint(res.data.value[0].thumbnail);
          localStorage.setItem(
            query,
            JSON.stringify(res.data.value[0].thumbnail)
          );
        })
        .catch(err => {
          setImageHint(
            'https://via.placeholder.com/200x150/bbc2cc/FF0000/?text=No_Image'
          );
        });
    }
  };

  useEffect(() => {
    if (existingPlayerScore) {
      toast({
        position: 'top-right',
        title: `Player ${
          existingPlayerScore && existingPlayerScore.name
        } already exists, please select other name.`,
        status: 'warning',
        isClosable: true,
      });
    }
  }, [playerName]);

  useEffect(() => {
    getScores();
  }, [loading.saveScore]);

  useEffect(() => {
    gameFailOrSuccess();
  }, [invalidGuess, guessedLetters, questionIndex]);

  const toast = useToast();

  const randomFailMessage = () =>
    failMessages[Math.floor(Math.random() * 6)].message;

  const randomSuccessMessage = () =>
    successMessages[Math.floor(Math.random() * 6)].message;

  const resetStates = () => {
    setClearedIndex([]);
    setRandomNums(ranNums);
    resetGuessedLetters();
    setInvalidGuess(0);
    setInvalidLetters([]);
    setQuestions([]);
    setQuestionIndex(0);
    setImageHint('');
    setCurrent({
      answer: '',
      question: '',
      category: currentCat && currentCat.name,
      difficulty: apiVariables.difficulty,
    });
    scoreContext.clearScore();
    localStorage.setItem('score', JSON.stringify(0));
  };

  const gameFailOrSuccess = () => {
    // you guessed wrong 5 times
    if (invalidGuess === 5) {
      // console.log('you failed');
      setClearedIndex([]);
      setRandomNums(ranNums);
      resetGuessedLetters();
      setInvalidGuess(0);
      setInvalidLetters([]);
      setTimeout(() => {
        //if all questions are answered
        if (questions.length === 1) {
          toast({
            position: 'top',
            render: () => GameResultToast(100, '', randomFailMessage()),
          });
          // console.log('last question wrong guess');
          setQuestionIndex(0);
          setImageHint('');
          setCurrent({
            answer: '',
            question: '',
            category: currentCat && currentCat.name,
            difficulty: apiVariables.difficulty,
          });
          setQuestions([]);
          resetGuessedLetters();
          setInvalidGuess(0);
          setInvalidLetters([]);
        } else {
          // proceed to next question and set states base on next question index
          toast({
            position: 'top',
            render: () =>
              GameResultToast(
                100,
                '',
                `
                Question: ${current.question && current.question}
                Answer: ${current.answer && current.answer.join('')}`
              ),
          });
          // console.log('next question wrong guess');
          let currentCategory = '';
          let currentAnswer = '';
          let currentQuestion = '';
          let currentDifficulty = '';
          let currentQuestionIndex = 0;
          currentQuestionIndex = questionIndex !== 0 ? 0 : questionIndex + 1;
          currentAnswer = decodeHtml(
            questions[currentQuestionIndex] &&
              questions[currentQuestionIndex].correct_answer
          );
          currentQuestion = decodeQuestion(
            questions[currentQuestionIndex] &&
              questions[currentQuestionIndex].question
          );
          currentCategory =
            questions[currentQuestionIndex] &&
            questions[currentQuestionIndex].category;
          currentDifficulty =
            questions[currentQuestionIndex] &&
            questions[currentQuestionIndex].difficulty;
          setCurrent({
            answer: currentAnswer,
            question: currentQuestion,
            category: currentCategory,
            difficulty: currentDifficulty,
          });
          // fetch image hint base on the question
          fetchImage(currentQuestion);
          // filter the previous question and proceed
          setQuestions(
            questions.filter(
              c =>
                c.correct_answer !==
                questions[
                  questionIndex === 0 ? currentQuestionIndex - 1 : questionIndex
                ].correct_answer
            )
          );
        }
      }, 4500);
      // you correctly guessed the answer
    } else if (
      current.answer &&
      current.answer.every(r => guessedLetters.includes(r))
    ) {
      if (questions.length === 1) {
        // console.log('last question correct guess');
        toast({
          position: 'top',
          render: () =>
            GameResultToast(
              -100,
              'Congratulations! Play more to beat the high score',
              ''
            ),
        });
        setCurrent({
          answer: '',
          question: '',
          category: currentCat && currentCat.name,
          difficulty: apiVariables.difficulty,
        });
        setQuestionIndex(0);
        setQuestions([]);
        resetGuessedLetters();
        setInvalidGuess(0);
        setInvalidLetters([]);
        setClearedIndex([]);
        setRandomNums(ranNums);
        setImageHint('');
      } else {
        toast({
          position: 'top',
          render: () => GameResultToast(-100, randomSuccessMessage(), ''),
        });
        // console.log('next question correct guess');
        let currentCategory = '';
        let currentAnswer = '';
        let currentQuestion = '';
        let currentDifficulty = '';
        let currentQuestionIndex = 0;
        currentQuestionIndex = questionIndex !== 0 ? 0 : questionIndex + 1;
        currentAnswer = decodeHtml(
          questions[currentQuestionIndex] &&
            questions[currentQuestionIndex].correct_answer
        );
        currentQuestion = decodeQuestion(
          questions[currentQuestionIndex] &&
            questions[currentQuestionIndex].question
        );
        currentCategory =
          questions[currentQuestionIndex] &&
          questions[currentQuestionIndex].category;
        currentDifficulty =
          questions[currentQuestionIndex] &&
          questions[currentQuestionIndex].difficulty;
        setCurrent({
          answer: currentAnswer,
          question: currentQuestion,
          category: currentCategory,
          difficulty: currentDifficulty,
        });
        fetchImage(currentQuestion);
        setTimeout(() => {
          setQuestions(
            questions.filter(
              c =>
                c.correct_answer !==
                questions[
                  questionIndex === 0 ? currentQuestionIndex - 1 : questionIndex
                ].correct_answer
            )
          );
        }, 500);
      }
      setQuestionIndex(0);
      resetGuessedLetters();
      setInvalidGuess(0);
      setInvalidLetters([]);
      setClearedIndex([]);
      setRandomNums(ranNums);
      if (current.difficulty === 'easy') {
        scoreContext.addScore(playerScore + (5 - invalidGuess * 1));
      }
      if (current.difficulty === 'medium') {
        scoreContext.addScore(playerScore + (5 - invalidGuess * 2));
      }
      if (current.difficulty === 'hard') {
        scoreContext.addScore(playerScore + (5 - invalidGuess * 4));
      }
    } else {
      localStorage.setItem('score', JSON.stringify(playerScore));
      // console.log('Did not find all of', current.answer, 'in', guessedLetters);
    }
  };

  const handleSaveScore = () => {
    setLoading({ saveScore: true });
    postLeaderBoard(playerName, playerScore)
      .then(res => {
        toast({
          position: 'top-right',
          title: `Check your name on the leaderboards, good game!`,
          status: 'success',
          isClosable: true,
        });
        // console.log(res);
        setLoading({ saveScore: false });
        scoreContext.clearScore();
        localStorage.setItem('score', JSON.stringify(0));
      })
      .catch(err => {
        toast({
          position: 'top-right',
          title: `Something went wrong, try again later.`,
          status: 'error',
          isClosable: true,
        });
        setLoading({ saveScore: false });
        // console.log(err);
      });
  };

  // const DivSpacer = styled.div`
  //   height: ${imageHint ? '45px' : '100vh'};
  //   margin: 0px 0px 45px 0px;
  //   background: transparent;
  // `;

  const DivContainer = styled.div`
    min-height: 100vh;
    margin-top: 40px;
  `;

  return (
    <Box>
      {/* <Text>{current.answer && current.answer.join('')}</Text> */}
      <Header
        resetStates={resetStates}
        current={current}
        scoreLeaders={scoreLeaders}
        apiVariables={apiVariables}
        setApiVariables={setApiVariables}
        score={playerScore}
        handleSaveScore={handleSaveScore}
        playerName={playerName}
        setPlayerName={setPlayerName}
        fetchQUestions={fetchQUestions}
        loading={loading}
      />
      <DivContainer>
        {!loading.app ? (
          <>
            {imageHint && !loading.app ? (
              <Center p="2">
                <VStack>
                  <ImageHint
                    bgIsLoaded={bgIsLoaded}
                    setBgIsLoaded={setBgIsLoaded}
                    imageHint={imageHint}
                    clearedIndex={clearedIndex}
                  />
                  <GameInterface
                    invalidGuess={invalidGuess}
                    randomNums={randomNums}
                    current={current}
                    score={playerScore}
                    questions={questions}
                    guessedLetters={guessedLetters}
                    invalidLetters={invalidLetters}
                    setGuessedLetters={setGuessedLetters}
                    setClearedIndex={setClearedIndex}
                    setInvalidLetters={setInvalidLetters}
                    setInvalidGuess={setInvalidGuess}
                    clearedIndex={clearedIndex}
                  />
                </VStack>
              </Center>
            ) : (
              <BoxedAlphabets
                boxedLettersColor={boxedLettersColor}
                boxedLetters={boxedLetters}
              />
            )}
          </>
        ) : (
          <Center mt="40">
            <Loader />
          </Center>
        )}
      </DivContainer>
      {/* <DivSpacer /> */}
      <Box bg="blackAlpha.300">
        <FooterLinks />
      </Box>
    </Box>
  );
};

export default App;

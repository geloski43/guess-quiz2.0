import React from 'react';
import {
  HStack,
  Tag,
  TagLabel,
  TagRightIcon,
  Tooltip,
  Badge,
  Box,
  useMediaQuery,
  VStack,
  Text,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { CgListTree } from 'react-icons/cg';
import { BiTachometer } from 'react-icons/bi';
import { BsClipboardData, BsQuestionSquare } from 'react-icons/bs';

const GameInterface = ({
  current,
  score,
  questions,
  guessedLetters,
  invalidLetters,
  setGuessedLetters,
  setClearedIndex,
  setInvalidLetters,
  setInvalidGuess,
  clearedIndex,
  randomNums,
  invalidGuess,
}) => {
  const [isNotFullScreen] = useMediaQuery('(max-width: 1000px)');
  const oneSpace = '\xa0\xa0\xa0';
  const alphabet = 'qwertyuiopasdfghjklzxcvbnm1234567890'.split('');
  const gameInfo = [
    {
      tooltip: 'Category',
      text: current.category,
      rightIcon: CgListTree,
      font: 'GEORGEA Regular',
    },
    {
      tooltip: 'Difficulty',
      text: current.difficulty,
      rightIcon: BiTachometer,
      font: 'GEORGEA Regular',
    },
    {
      tooltip: 'Score',
      text: score,
      rightIcon: BsClipboardData,
      font: 'Digital Numbers Regular',
    },
    {
      tooltip: 'Questions',
      text: questions.length,
      rightIcon: BsQuestionSquare,
      font: 'Digital Numbers Regular',
    },
  ];

  const KBDiv = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    width: ${isNotFullScreen ? '80vw' : '35vw'};
    margin-left: auto;
    marginr-right: auto;
    margin-top: 18px;
    background-color: rgb(192, 192, 192, 0.6);
    border-radius: 20px;
    margin-bottom: -80px;
    position: relative;
  `;

  const PLetter = styled.p`
    border: 2px solid rgb(227, 115, 22, 0.8);
    display: inline;
    border-radius: 0.1em;
    border-width: 0.3em;
    border-top-width: 0.1em;
    border-bottom-width: 0.1em;
    font-size: ${isNotFullScreen ? '1em' : '1.1em'};
    font-family: GEORGEA Regular;
  `;

  return (
    <>
      <HStack maxW="xl" justifyContent={'center'} flexWrap="wrap">
        {current &&
          current.answer &&
          current.answer.map((letter, i) => (
            <Box key={i} my="5">
              <PLetter>
                {guessedLetters.includes(letter) ? letter : oneSpace}
              </PLetter>
            </Box>
          ))}
      </HStack>

      {isNotFullScreen ? (
        <HStack spacing={'2'}>
          {gameInfo.map((v, i) => (
            <Tooltip
              key={i}
              hasArrow
              placement="top"
              label={v.tooltip}
              aria-label="category"
            >
              <Tag
                size="lg"
                colorScheme="orange"
                borderRadius="lg"
                variant="subtle"
              >
                <TagLabel fontSize={'xx-small'} fontFamily={v.font}>
                  <VStack>
                    <Badge colorScheme="black">
                      <Text fontSize={'xx-small'}>{v.text}</Text>
                    </Badge>
                    <Text as="sup">{v.tooltip}</Text>
                  </VStack>
                </TagLabel>
              </Tag>
            </Tooltip>
          ))}
        </HStack>
      ) : (
        <HStack spacing={'5'}>
          {gameInfo.map((v, i) => (
            <Tooltip
              key={i}
              hasArrow
              placement="top"
              label={v.tooltip}
              aria-label="category"
            >
              <Tag
                size="lg"
                colorScheme="orange"
                borderRadius="lg"
                variant="subtle"
              >
                <TagLabel fontSize={'xx-small'} fontFamily={v.font}>
                  <Badge colorScheme="black">{v.text}</Badge>
                </TagLabel>
                <TagRightIcon as={v.rightIcon} />
              </Tag>
            </Tooltip>
          ))}
        </HStack>
      )}

      <KBDiv>
        {alphabet.map((letter, i) => (
          <motion.span
            whileHover={{
              scale:
                !guessedLetters.includes(letter) &&
                !invalidLetters.includes(letter)
                  ? 1.2
                  : 1,
            }}
            whileTap={{
              scale:
                !guessedLetters.includes(letter) &&
                !invalidLetters.includes(letter)
                  ? [1, 0.7, 0.7, 0.8, 1]
                  : 1,
            }}
            key={i}
            style={{
              cursor:
                !guessedLetters.includes(letter) &&
                !invalidLetters.includes(letter)
                  ? 'pointer'
                  : 'not-allowed',
              margin: 5,
              height: '1em',
              fontSize: 35,
              fontFamily: 'BetsyFlanagan-Regular',
              fontWeight: 'bolder',
              marginBottom: 10,

              color: !guessedLetters.includes(letter)
                ? invalidLetters.includes(letter) &&
                  !current.answer.includes(letter)
                  ? '#570861'
                  : 'black'
                : 'rgb(3, 209, 0)',
            }}
            onClick={() => {
              if (
                guessedLetters.includes(letter) ||
                invalidLetters.includes(letter)
              ) {
                console.log('letter already selected');
              } else if (current.answer.includes(letter)) {
                let letterArray = [];
                letterArray.push(letter);
                setGuessedLetters([...guessedLetters, letter]);
              } else {
                let invalidLetterArray = [];
                invalidLetterArray.push(letter);
                setClearedIndex([...clearedIndex, randomNums.next().value]);
                setInvalidLetters([...invalidLetters, letter]);
                setInvalidGuess(invalidGuess + 1);
              }
            }}
          >
            {letter}
          </motion.span>
        ))}
      </KBDiv>
    </>
  );
};

export default GameInterface;

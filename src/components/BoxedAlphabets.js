import React, { useRef } from 'react';
import { Text, useMediaQuery, Center, Wrap, WrapItem } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const BoxedAlphabets = ({ boxedLetters, boxedLettersColor }) => {
  const constraintsRef = useRef(null);
  const [isNotFullScreen] = useMediaQuery('(max-width: 1000px)');

  return (
    <Center>
      <motion.div className="boxed-letters-container" ref={constraintsRef}>
        <Wrap>
          {boxedLetters.map((v, i) => (
            <motion.div
              whileHover={{ rotate: -180 }}
              key={i}
              drag
              dragConstraints={constraintsRef}
            >
              <WrapItem>
                <Text
                  fontSize={isNotFullScreen ? '4xl' : '5xl'}
                  fontFamily={'Blockway Pixies Medium'}
                  cursor={'grab'}
                  fontWeight="thin"
                  color={boxedLettersColor}
                >
                  {v}
                </Text>
              </WrapItem>
            </motion.div>
          ))}
        </Wrap>
      </motion.div>
    </Center>
  );
};

export default BoxedAlphabets;

import React, { useRef } from 'react';
import { Text, useMediaQuery, Center, Wrap, WrapItem } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const BoxedAlphabets = () => {
  const alphabets = 'dragmexplyjubtoqwisfhkzcvn'.split('');
  const constraintsRef = useRef(null);
  const [isNotFullScreen] = useMediaQuery('(max-width: 1000px)');

  return (
    <Center>
      <motion.div className="boxed-letters-container" ref={constraintsRef}>
        <Wrap>
          {alphabets.map((v, i) => (
            <motion.div
              whileHover={{ rotate: -180 }}
              key={v}
              drag
              dragConstraints={constraintsRef}
            >
              <WrapItem>
                <Text
                  fontSize={isNotFullScreen ? '5xl' : '6xl'}
                  fontFamily={'Blockway Pixies Medium'}
                  cursor={'grab'}
                  fontWeight="thin"
                  color="orange.400"
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

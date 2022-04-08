import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const GameResultToast = (yValue, winText, failText) => {
  const y = useMotionValue(0);
  const xInput = [100, 0, -100];
  const background = useTransform(y, xInput, [
    'linear-gradient(180deg, #570861 0%, rgb(211, 9, 225) 100%)',
    'linear-gradient(180deg, #7700ff 0%, rgb(68, 0, 255) 100%)',
    'linear-gradient(180deg, rgb(230, 255, 0) 0%, rgb(3, 209, 0) 100%)',
  ]);
  const color = useTransform(y, xInput, [
    'rgb(211, 9, 225)',
    'rgb(68, 0, 255)',
    'rgb(3, 209, 0)',
  ]);
  const tickPath = useTransform(y, [-10, -55], [0, 1]);
  const crossPathA = useTransform(y, [10, 100], [0, 1]);
  const crossPathB = useTransform(y, [10, 100], [0, 1]);

  return (
    <motion.div className="toast-container" style={{ background }}>
      {failText && (
        <Box textAlign={'center'} pt="14" mx="5">
          <Text
            fontFamily={'GEORGEA Regular'}
            color="orange.400"
            fontSize={'sm'}
          >
            {failText}
          </Text>
        </Box>
      )}
      {winText && (
        <Box pt="250px" mx="5" textAlign={'center'}>
          <Text
            fontFamily={'GEORGEA Regular'}
            color="blackAlpha.900"
            fontSize={'sm'}
          >
            {winText}
          </Text>
        </Box>
      )}
      <motion.div
        className="box"
        style={{ y }}
        animate={{ y: yValue }}
        transition={{
          delay: 1,
          y: { type: 'spring', stiffness: 50 },
          default: { duration: 1 },
        }}
      >
        <svg className="progress-icon" viewBox="0 0 50 50">
          <motion.path
            fill="none"
            strokeWidth="2"
            stroke={color}
            d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
            style={{ translateX: 5, translateY: 5 }}
          />
          <motion.path
            fill="none"
            strokeWidth="2"
            stroke={color}
            d="M14,26 L 22,33 L 35,16"
            strokeDasharray="0 1"
            style={{ pathLength: tickPath }}
          />
          <motion.path
            fill="none"
            strokeWidth="2"
            stroke={color}
            d="M17,17 L33,33"
            strokeDasharray="0 1"
            style={{ pathLength: crossPathA }}
          />
          <motion.path
            fill="none"
            strokeWidth="2"
            stroke={color}
            d="M33,17 L17,33"
            strokeDasharray="0 1"
            style={{ pathLength: crossPathB }}
          />
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default GameResultToast;

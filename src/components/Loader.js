import React from 'react';
import { Center } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const icon = {
  hidden: {
    opacity: 0,
    pathLength: 0,
    fill: 'rgba(208, 105, 22, 0)',
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    fill: 'rgba(208, 105, 22, 1)',
  },
};

const Loader = () => {
  return (
    <motion.div
      className="svg-container"
      animate={{
        scale: [0.75, 0.5, 0.5, 0.5, 0.75],
        rotate: [0, 0, 270, 270, 0],
        borderRadius: ['20%', '20%', '50%', '50%', '20%'],
      }}
      transition={{
        duration: 2,
        ease: 'easeInOut',
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,
        repeatDelay: 1,
      }}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        className="svg-item"
      >
        <motion.path
          d="M 87.5 87.5 L 25 87.5 L 25 75 L 12.5 75 L 12.5 62.5 L 0 62.5 L 0 25 L 12.5 25 L 12.5 12.5 L 25 12.5 L 25 0 L 87.5 0 L 87.5 12.5 L 37.5 12.5 L 37.5 25 L 25 25 L 25 62.5 L 37.5 62.5 L 37.5 75 L 62.5 75 L 62.5 50 L 50 50 L 50 37.5 L 87.5 37.5 L 87.5 87.5 Z"
          variants={icon}
          initial="hidden"
          animate="visible"
          transition={{
            default: {
              duration: 2,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatDelay: 1,
            },
            fill: {
              duration: 2,
              ease: [1, 0, 0.8, 1],
              repeat: Infinity,
              repeatDelay: 1,
            },
          }}
        />
      </motion.svg>
    </motion.div>
  );
};

export default Loader;

import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from '@chakra-ui/react';

const ResetModal = ({
  background,
  initialRef,
  finalRef,
  modalOpen,
  setModalOpen,
  isNotFullScreen,
  resetStates,
}) => {
  const { resetGame } = modalOpen;

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={resetGame}
      onClose={() => {
        setModalOpen({ resetGame: false });
      }}
      motionPreset="slideInRight"
    >
      <ModalOverlay />
      <ModalContent bg={background} mr={isNotFullScreen ? '0' : '-54vw'}>
        <ModalHeader>Reset Game</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Text>
            Make sure to save your score first before trying to reset the game.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button
            ref={initialRef}
            onClick={() => {
              resetStates();
              setModalOpen({ resetGame: false });
            }}
            colorScheme="blue"
            mr={3}
          >
            Reset
          </Button>
          <Button onClick={() => setModalOpen({ resetGame: false })}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ResetModal;

import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const SaveScoreModal = ({
  initialRef,
  finalRef,
  isOpen,
  onClose,
  isNotFullScreen,
  setPlayerName,
  score,
  handleSaveScore,
  playerName,
  background,
  existingPlayerScore,
}) => {
  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInRight"
    >
      <ModalOverlay />
      <ModalContent bg={background} mr={isNotFullScreen ? '0' : '-54vw'}>
        <ModalHeader>Save your score</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Player name</FormLabel>
            <InputGroup>
              <Input
                isInvalid={
                  playerName.length < 4 ||
                  playerName.length > 12 ||
                  existingPlayerScore
                }
                errorBorderColor="red.300"
                isRequired={true}
                onChange={e => {
                  setPlayerName(e.target.value);
                }}
                value={playerName}
                ref={initialRef}
                placeholder="Player name"
              />
              <InputRightElement
                onClick={() => {
                  setPlayerName('');
                }}
                cursor={'pointer'}
                children={<AiOutlineCloseCircle color="gray.500" />}
              />
            </InputGroup>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Score</FormLabel>
            <Input
              fontWeight={'extrabold'}
              fontFamily={'Digital Numbers Regular'}
              isDisabled
              value={score}
              placeholder="Score"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            isDisabled={
              !playerName ||
              existingPlayerScore ||
              playerName.length < 4 ||
              playerName.length > 12
            }
            onClick={() => {
              handleSaveScore();
              setTimeout(() => {
                onClose();
              }, 1500);
            }}
            colorScheme="blue"
            mr={3}
          >
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SaveScoreModal;

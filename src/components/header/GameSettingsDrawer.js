import React from 'react';
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  RadioGroup,
  Stack,
  Radio,
  Text,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  HStack,
} from '@chakra-ui/react';
import { difficulties, categories } from '../../constants/gameSettings';
import { TiArrowSortedDown } from 'react-icons/ti';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

const GameSettingsDrawer = ({
  setApiVariables,
  settingsTabRef,
  setDrawerOpen,
  apiVariables,
  drawerOpen,
  initialRef,
  background,
}) => {
  const { difficulty, category, numOfQuestions } = apiVariables;
  const { gameSettings } = drawerOpen;
  return (
    <Drawer
      initialFocusRef={initialRef}
      size="lg"
      isOpen={gameSettings}
      placement="right"
      onClose={() => {
        setDrawerOpen({ gameSettings: false });
      }}
      finalFocusRef={settingsTabRef}
    >
      <DrawerOverlay />
      <DrawerContent bg={background}>
        <DrawerCloseButton />
        <DrawerHeader>
          <HStack>
            <Text>Game Settings</Text>
            <ColorModeSwitcher />
          </HStack>
        </DrawerHeader>
        <DrawerBody>
          <Text fontSize="sm" mt="12" mb="5">
            Category
          </Text>
          <Select
            ref={initialRef}
            icon={<TiArrowSortedDown />}
            value={category}
            onChange={e => {
              setApiVariables({
                ...apiVariables,
                category: e.target.value,
              });
            }}
          >
            {categories.map(c => (
              <option key={c.value} value={c.value}>
                {c.name}
              </option>
            ))}
          </Select>

          <Text fontSize="sm" mt="12" mb="5">
            Number of Questions
          </Text>
          <NumberInput
            onChange={value => {
              setApiVariables({ ...apiVariables, numOfQuestions: value });
            }}
            value={numOfQuestions}
            max={50}
            min={1}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>

          <RadioGroup
            onChange={value => {
              setApiVariables({ ...apiVariables, difficulty: value });
            }}
            value={difficulty}
          >
            <Text mt="12" mb="5" fontSize="sm">
              Difficulty
            </Text>
            <Stack direction="row">
              {difficulties.map(d => (
                <Radio key={d.id} value={d.name}>
                  <Text fontSize="small">{d.name}</Text>
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </DrawerBody>

        <DrawerFooter>
          <Button
            onClick={() => {
              setApiVariables({
                category: 9,
                difficulty: 'easy',
                numOfQuestions: 5,
              });
            }}
            colorScheme="blue"
          >
            <Text fontSize="sm">Set Default</Text>
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default GameSettingsDrawer;

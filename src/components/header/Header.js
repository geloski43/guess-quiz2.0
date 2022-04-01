import React, { useState, useRef } from 'react';
import {
  HStack,
  Tab,
  TabList,
  Tabs,
  Grid,
  GridItem,
  Text,
  Spinner,
  useColorModeValue,
  useMediaQuery,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { GiPlayButton, GiHamburgerMenu } from 'react-icons/gi';
import { FiSettings } from 'react-icons/fi';
import { AiFillTrophy } from 'react-icons/ai';
import { VscSave } from 'react-icons/vsc';
import { motion } from 'framer-motion';
import GameSettingsDrawer from './GameSettingsDrawer';
import HighScoresDrawer from './HighScoresDrawer';
import SaveScoreModal from './SaveScoreModal';

const Header = ({
  loading,
  fetchQUestions,
  score,
  playerName,
  setPlayerName,
  handleSaveScore,
  apiVariables,
  setApiVariables,
  scoreLeaders,
  imageHint,
}) => {
  const settingsTabRef = useRef();
  const highScoresTabRef = useRef();
  // for header logo animation
  const constraintsRef = useRef(null);
  // for drawers
  const [drawerOpen, setDrawerOpen] = useState({
    gameSettings: false,
    highScores: false,
  });
  // for save score modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  const saveScoreInitialRef = useRef();
  const saveScoreFinalRef = useRef();
  const gameSettingsInitialRef = useRef();

  const bg = useColorModeValue('gray.100', 'purple.900');
  const [isNotFullScreen] = useMediaQuery('(max-width: 1000px)');
  const existingPlayerScore = scoreLeaders.find(
    player => player.name === playerName
  );
  return (
    <Grid bg={bg} p="1.5" templateColumns="repeat(2, 1fr)">
      <GridItem w="100%">
        <HStack>
          <motion.div className="title-container" ref={constraintsRef}>
            <motion.div
              whileHover={{ scale: 0.7, rotate: 180 }}
              drag
              dragConstraints={constraintsRef}
            >
              <Text
                fontSize={isNotFullScreen ? '23px' : '3xl'}
                fontFamily={'Blockway Pixies Medium'}
                cursor={'pointer'}
                fontWeight="thin"
                color="orange.400"
              >
                G
              </Text>
            </motion.div>
          </motion.div>
          <Text
            fontSize={isNotFullScreen ? '23px' : '3xl'}
            fontFamily={'Blockway Pixies Medium'}
            fontWeight="thin"
            color="orange.400"
          >
            uess Quiz
          </Text>
        </HStack>
      </GridItem>
      <GridItem w="100%" colStart={6}>
        {isNotFullScreen ? (
          <Menu closeOnBlur={true}>
            <MenuButton
              size="md"
              as={IconButton}
              aria-label="Options"
              icon={<GiHamburgerMenu />}
              variant="outline"
            />
            <MenuList>
              <MenuItem
                isDisabled={imageHint}
                onClick={() => {
                  fetchQUestions();
                }}
                icon={<GiPlayButton />}
              >
                <Text fontFamily="GEORGEA Regular" fontSize={'xs'}>
                  Play
                </Text>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setDrawerOpen({ gameSettings: true });
                }}
                icon={<FiSettings />}
              >
                <Text fontFamily="GEORGEA Regular" fontSize={'xs'}>
                  Settings
                </Text>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setDrawerOpen({ highScores: true });
                }}
                icon={
                  loading.highScores ? (
                    <Spinner size="sm" color="blue.200" />
                  ) : (
                    <AiFillTrophy />
                  )
                }
              >
                <Text fontFamily="GEORGEA Regular" fontSize={'xs'}>
                  High Scores
                </Text>
              </MenuItem>

              {score > 0 && (
                <MenuItem
                  ref={saveScoreFinalRef}
                  onClick={onOpen}
                  icon={
                    loading.saveScore ? (
                      <Spinner size="sm" color="blue.200" />
                    ) : (
                      <VscSave />
                    )
                  }
                >
                  <Text fontFamily="GEORGEA Regular" fontSize={'xs'}>
                    Save Score
                  </Text>
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        ) : (
          <Tabs>
            <TabList>
              <Tab
                isDisabled={imageHint}
                onClick={() => {
                  fetchQUestions();
                }}
              >
                <HStack>
                  <Text fontFamily="GEORGEA Regular">Play</Text>
                  <GiPlayButton />
                </HStack>
              </Tab>
              <Tab
                ref={settingsTabRef}
                onClick={() => {
                  setDrawerOpen({ gameSettings: true });
                }}
              >
                <HStack>
                  <Text fontFamily="GEORGEA Regular">Settings</Text>
                  <FiSettings />
                </HStack>
              </Tab>
              <Tab
                ref={highScoresTabRef}
                onClick={() => {
                  setDrawerOpen({ highScores: true });
                }}
              >
                <HStack>
                  <Text fontFamily="GEORGEA Regular">High Scores</Text>
                  {loading.highScores ? (
                    <Spinner size="sm" color="blue.200" />
                  ) : (
                    <AiFillTrophy />
                  )}
                </HStack>
              </Tab>

              {score > 0 && (
                <Tab ref={saveScoreFinalRef} onClick={onOpen}>
                  <HStack>
                    <Text fontFamily="GEORGEA Regular">Save Score</Text>
                    {loading.saveScore ? (
                      <Spinner size="sm" color="blue.200" />
                    ) : (
                      <VscSave />
                    )}
                  </HStack>
                </Tab>
              )}
            </TabList>
          </Tabs>
        )}
      </GridItem>

      <GameSettingsDrawer
        background={bg}
        initialRef={gameSettingsInitialRef}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        settingsTabRef={settingsTabRef}
        apiVariables={apiVariables}
        setApiVariables={setApiVariables}
      />

      <HighScoresDrawer
        background={bg}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        highScoresTabRef={highScoresTabRef}
        scoreLeaders={scoreLeaders}
        loading={loading}
      />

      <SaveScoreModal
        existingPlayerScore={existingPlayerScore}
        background={bg}
        playerName={playerName}
        initialRef={saveScoreInitialRef}
        finalRef={saveScoreFinalRef}
        isOpen={isOpen}
        onClose={onClose}
        isNotFullScreen={isNotFullScreen}
        setPlayerName={setPlayerName}
        score={score}
        handleSaveScore={handleSaveScore}
      />
    </Grid>
  );
};

export default Header;

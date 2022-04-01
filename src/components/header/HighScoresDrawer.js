import React from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Center,
} from '@chakra-ui/react';
import { fromNow } from '../../utils/utils';
import Loader from '../Loader';

const HighScoresDrawer = ({
  drawerOpen,
  setDrawerOpen,
  highScoresTabRef,
  scoreLeaders,
  loading,
  background,
}) => {
  const { highScores } = drawerOpen;

  return (
    <Drawer
      size="lg"
      isOpen={highScores}
      placement="top"
      onClose={() => {
        setDrawerOpen({ highScores: false });
      }}
      finalFocusRef={highScoresTabRef}
    >
      <DrawerOverlay />
      <DrawerContent bg={background}>
        <DrawerCloseButton />
        <DrawerHeader>
          <Text>High Scores</Text>
        </DrawerHeader>
        <DrawerBody>
          {!loading.highScores ? (
            <>
              {scoreLeaders.length > 0 ? (
                <Center>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th
                          fontSize={'2xl'}
                          fontFamily={'BetsyFlanagan-Regular'}
                        >
                          Name
                        </Th>
                        <Th
                          fontSize={'2xl'}
                          fontFamily={'BetsyFlanagan-Regular'}
                        >
                          Score
                        </Th>
                        <Th
                          fontSize={'2xl'}
                          fontFamily={'BetsyFlanagan-Regular'}
                        >
                          Date
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {scoreLeaders
                        .filter((f, index) => index <= 4)
                        .map((v, i) => (
                          <Tr key={i}>
                            <Td>{v.name}</Td>
                            <Td>{v.score}</Td>
                            <Td>
                              {fromNow(
                                new Date(v.createdAt)
                                  .getTime()
                                  .toString()
                                  .slice(0, -3)
                              )}
                            </Td>
                          </Tr>
                        ))}
                    </Tbody>
                  </Table>
                </Center>
              ) : (
                <Center>
                  <Text color="red.400">No High Scores</Text>
                </Center>
              )}
            </>
          ) : (
            <Center>
              <Loader />
            </Center>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default HighScoresDrawer;

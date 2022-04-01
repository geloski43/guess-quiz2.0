import {
  ButtonGroup,
  Container,
  IconButton,
  Stack,
  Text,
  Avatar,
  Link,
} from '@chakra-ui/react';
import * as React from 'react';
import { SiGmail, SiGithub, SiLinkedin } from 'react-icons/si';
import { motion } from 'framer-motion';

const FooterLinks = () => {
  return (
    <Container
      as="footer"
      role="contentinfo"
      pt={{ base: '12', md: '10' }}
      pb={{ base: '2', md: '4' }}
    >
      <Stack spacing={{ base: '1', md: '2' }}>
        <Stack justify="center" direction="row">
          <ButtonGroup variant="ghost">
            <motion.div whileHover={{ opacity: 0.8 }}>
              <Link href="https://geloski-portfolio.vercel.app/" isExternal>
                <Avatar
                  bg="whiteAlpha.900"
                  mt="1"
                  size="sm"
                  name="Geloski"
                  src="https://robohash.org/Kapitan%20Smiley?set=set2;size=100x100"
                />
              </Link>
            </motion.div>
            <IconButton
              as="a"
              href="mailto:ajgonzales43@gmail.com"
              aria-label="Gmail"
              color="red.500"
              icon={<SiGmail fontSize="1.25rem" />}
            />
            <IconButton
              as="a"
              href="https://github.com/geloski43"
              aria-label="GitHub"
              icon={<SiGithub fontSize="1.25rem" />}
            />
            <IconButton
              as="a"
              href="https://www.linkedin.com/in/angelo-gonzales-6b58a0212"
              aria-label="LinkedIn"
              color="linkedin.700"
              icon={<SiLinkedin fontSize="1.25rem" />}
            />
          </ButtonGroup>
        </Stack>
        <Text fontSize="sm" align={'center'} fontWeight="extrabold">
          &copy; {new Date().getFullYear()} Guess Quiz. All rights reserved.
        </Text>
      </Stack>
    </Container>
  );
};

export default FooterLinks;

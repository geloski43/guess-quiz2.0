import {
  ColorModeScript,
  ChakraProvider,
  extendTheme,
  theme as base,
} from '@chakra-ui/react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Provider as ScoreProvider } from './context/ScoreContext';
import { mode } from '@chakra-ui/theme-tools';

const styles = {
  global: props => ({
    body: {
      bg: mode('#f0e7db', '#202023')(props),
    },
  }),
};
const theme = extendTheme({
  fonts: {
    heading: `Blockway Pixies Medium, ${base.fonts?.heading}`,
    body: `Roboto Regular, ${base.fonts?.body}`,
  },
  styles,
});

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <ScoreProvider>
      <ColorModeScript />
      <App />
    </ScoreProvider>
  </ChakraProvider>,
  document.getElementById('root')
);

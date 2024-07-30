import { extendTheme } from '@chakra-ui/react';

const lightTheme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: 'body',
        backgroundColor: '#ffffff',
        color: '#000000',
      },
    },
  },
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'Georgia, serif',
    mono: 'Menlo, monospace',
  },
});

const darkTheme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: 'body',
        backgroundColor: '#000000',
        color: '#ffffff',
      },
    },
  },
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'Georgia, serif',
    mono: 'Menlo, monospace',
  },
});

export { lightTheme, darkTheme };

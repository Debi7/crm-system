import { extendTheme } from '@chakra-ui/react';

const lightTheme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: 'body',
        backgroundColor: '#f9f4f4',
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
        backgroundColor: '#575454',
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

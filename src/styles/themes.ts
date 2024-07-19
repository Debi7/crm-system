import { extendTheme } from '@chakra-ui/react';

interface CustomTheme {
  styles: {
    global: {
      body: {
        fontFamily: string;
      };
    };
  };
  fonts: {
    body: string;
    heading: string;
    mono: string;
  };
  colors: {
    background: {
      light: string;
      dark: string;
    };
    text: {
      light: string;
      dark: string;
    };
  };
}

const theme: CustomTheme = {
  styles: {
    global: {
      body: {
        fontFamily: 'body',
      },
    },
  },
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'Georgia, serif',
    mono: 'Menlo, monospace',
  },
  colors: {
    background: {
      light: '#ffffff',
      dark: '#000000',
    },
    text: {
      light: '#000000',
      dark: '#ffffff',
    },
  },
};

const extendedTheme = extendTheme(theme);

export default extendedTheme;

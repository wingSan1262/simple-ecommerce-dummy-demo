import {MD3LightTheme, MD3Theme} from 'react-native-paper';

export const theme: MD3Theme = {
  ...MD3LightTheme, // or MD3DarkTheme
  roundness: 2,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#4778f5',
    primaryContainer: '#FFBA0080',
    surfaceVariant: '#FFFFFF',
  },
};

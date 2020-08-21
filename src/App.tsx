import React from 'react';
import { ThemeProvider } from 'theme-ui'
import theme from './components/theme';

export function App() {
  return (
    <ThemeProvider theme={theme}>
    </ThemeProvider>
  );
}
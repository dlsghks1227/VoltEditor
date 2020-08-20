import React from 'react';
import { ThemeProvider } from 'theme-ui'
import './App.css';
import theme from './api/components/theme';

export function App() {
  return (
    <ThemeProvider theme={theme}>
    </ThemeProvider>
  );
}

export default App;

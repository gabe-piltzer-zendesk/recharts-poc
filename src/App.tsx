import React from 'react';
import { DEFAULT_THEME, ThemeProvider } from '@zendeskgarden/react-theming';

const App: React.FC = () => {
  // const { fonts } = DEFAULT_THEME;

  return (
    <ThemeProvider theme={{ ...DEFAULT_THEME, rtl: false }}>
      Theme provider only
    </ThemeProvider>
  );
};

export default App;

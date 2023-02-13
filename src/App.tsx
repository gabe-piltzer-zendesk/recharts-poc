import React from 'react';
import { DEFAULT_THEME, ThemeProvider } from '@zendeskgarden/react-theming';
import StorageUsage from './usage/storage-usage';
import styled from 'styled-components';

const StorageUsageContainer = styled.div`
  padding: 20px;
`;

const App: React.FC = () => {
  // const { fonts } = DEFAULT_THEME;

  return (
    <ThemeProvider theme={{ ...DEFAULT_THEME, rtl: false }}>
      <StorageUsageContainer>
        <StorageUsage />
      </StorageUsageContainer>
    </ThemeProvider>
  );
};

export default App;

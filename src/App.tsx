import React from 'react';
import { DEFAULT_THEME, ThemeProvider } from '@zendeskgarden/react-theming';
import LineChart from './components/charts/LineChart';
import { oneYearMonthlyData } from './usage/storage-usage/data';

const LIMIT = 370;

const getColorByLimit = (
  limit: number,
  threshold: number,
  value: number,
  palette: any
) => {
  if (value >= limit) {
    return palette.red[600];
  } else if (value >= threshold) {
    return palette.yellow[600];
  } else {
    return palette.green[200];
  }
};

const getSegmentColor = (
  value: number,
  palette: any,
  limit: number
): string | undefined => {
  const threshold = limit * 0.7;
  return getColorByLimit(limit, threshold, value, palette);
};

const App: React.FC = () => {
  // const { fonts } = DEFAULT_THEME;
  const data = oneYearMonthlyData.map((data) => {
    return {
      ...data,
      date: new Date(data.date).toLocaleDateString(),
    };
  });

  const labelLine = `${data[data.length - 1].value} GB used`;
  const labelReferenceLine = `${LIMIT} GB limit`;

  return (
    <ThemeProvider theme={{ ...DEFAULT_THEME, rtl: false }}>
      <LineChart
        data={data}
        dataKey={'value'}
        dataKeyXAxis={'date'}
        domainYAxis={[0, 600]}
        labelLine={labelLine}
        labelReferenceLine={labelReferenceLine}
        labelXAxis={'Date'}
        labelYAxis={'Storage (GB)'}
        lineColorCallback={getSegmentColor}
        referenceLineValue={LIMIT}
      />
    </ThemeProvider>
  );
};

export default App;

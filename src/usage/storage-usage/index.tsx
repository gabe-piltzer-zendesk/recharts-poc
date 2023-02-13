import React, { memo } from 'react';
import LineChart from '../../components/charts/LineChart';
import { oneYearMonthlyData } from './data';

const LIMIT = 370;

const StorageUsage: React.FC = () => {
  const data = oneYearMonthlyData.map((data) => {
    return {
      ...data,
      date: new Date(data.date).toLocaleDateString(),
    };
  });

  const labelLine = `${data[data.length - 1].value} GB used`;
  const labelReferenceLine = `${LIMIT} GB limit`;

  return (
    <LineChart
      data={data}
      dataKey={'value'}
      dataKeyXAxis={'date'}
      domainYAxis={[0, 600]}
      labelLine={labelLine}
      labelReferenceLine={labelReferenceLine}
      labelXAxis={'Date'}
      labelYAxis={'Storage (GB)'}
      referenceLineValue={LIMIT}
    />
  );
};

export default memo(StorageUsage);

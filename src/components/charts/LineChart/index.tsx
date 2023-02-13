import React, { memo } from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { ImplicitLabelType } from 'recharts/types/component/Label';
import { useTheme } from 'styled-components';

interface Props {
  data: any[];
  dataKey: string;
  dataKeyXAxis: string;
  domainYAxis: string[] | number[];
  labelLine: string;
  labelReferenceLine: string;
  labelXAxis: string;
  labelYAxis: string;
  lineColorCallback: (
    value: number,
    palette: any,
    limit: number
  ) => string | undefined;
  referenceLineValue: number;
}

const LineChart: React.FC<Props> = ({
  data,
  dataKey,
  dataKeyXAxis,
  domainYAxis,
  labelReferenceLine,
  labelXAxis,
  labelYAxis,
  lineColorCallback,
  referenceLineValue,
}) => {
  // @ts-ignore
  const { palette } = useTheme();

  // Labels
  const referenceLineLabel: ImplicitLabelType = {
    value: labelReferenceLine,
    position: 'insideBottomRight',
  };
  const xAxisLabel: ImplicitLabelType = {
    value: labelXAxis,
    offset: -5,
    position: 'insideBottom',
  };
  const yAxisLabel: ImplicitLabelType = {
    value: labelYAxis,
    angle: -90,
    position: 'insideLeft',
  };

  // Challenges
  // 1. Adding an individual label to the <Line> component with proper formatting and positioning
  // 2. Conditionally coloring line segments, no callback exists, have to use <linearGradient> which mean we need accurate percentages
  // 3. Axis labels are tough to control (formatting and positioning)

  return (
    <ResponsiveContainer width={'95%'} height={600}>
      <RechartsLineChart data={data}>
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="100%" y2="0">
            <stop offset="0%" stopColor={palette.green[200]} />
            <stop offset="20%" stopColor={palette.green[200]} />
            <stop offset="20%" stopColor={palette.yellow[600]} />
            <stop offset="50%" stopColor={palette.yellow[600]} />
            <stop offset="50%" stopColor={palette.red[600]} />
            <stop offset="100%" stopColor={palette.red[600]} />
          </linearGradient>
        </defs>
        <Line dataKey={dataKey} stroke={'url(#gradient)'} strokeWidth={3} />
        <ReferenceLine y={referenceLineValue} label={referenceLineLabel} />
        <XAxis dataKey={dataKeyXAxis} interval={0} label={xAxisLabel} />
        <YAxis domain={domainYAxis} label={yAxisLabel} />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

export default memo(LineChart);

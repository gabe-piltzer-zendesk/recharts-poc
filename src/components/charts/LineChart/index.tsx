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
  referenceLineValue,
}) => {
  // @ts-ignore
  const { fonts, palette } = useTheme();

  // Labels
  const referenceLineLabel: ImplicitLabelType = {
    fontFamily: fonts.system,
    value: labelReferenceLine,
    position: 'insideBottomRight',
  };
  const xAxisLabel: ImplicitLabelType = {
    fontFamily: fonts.system,
    value: labelXAxis,
    offset: -5,
    position: 'insideBottom',
  };
  const yAxisLabel: ImplicitLabelType = {
    fontFamily: fonts.system,
    value: labelYAxis,
    angle: -90,
    position: 'insideLeft',
  };

  // Challenges
  // 1. Adding an individual label to the <Line> component with proper formatting and positioning
  // 2. Conditionally coloring line segments, no callback exists, have to use <linearGradient> which mean we need accurate percentages
  //   - This requires more complex calculations and creates coloring issues with line dots
  // 3. Axis labels are tough to control (formatting and positioning)
  // 4. No global way to set fonts and other styling, we have to set it for every implementation

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
        <XAxis
          fontFamily={fonts.system}
          fontSize={14}
          dataKey={dataKeyXAxis}
          interval={0}
          label={xAxisLabel}
        />
        <YAxis
          fontFamily={fonts.system}
          fontSize={14}
          domain={domainYAxis}
          label={yAxisLabel}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

export default memo(LineChart);

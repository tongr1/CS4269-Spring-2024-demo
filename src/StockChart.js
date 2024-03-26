import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, axisClasses } from '@mui/x-charts';
import $ from 'jquery';
import stockData from "./data/stock_amzn_2018.json"
import Title from './Title';

// Generate Sales Data
function createData(time, price) {
  return { time, price: price ?? null };
}


var data = [];

// alert(JSON.stringify(stockData));

for (var o in stockData) {
  // alert(JSON.stringify(stockData[o]["Date"]));
  if (stockData[o]["Symbol"] != "AMZN") continue;
  if (stockData[o]["Date"] >= "2018-07-01") {
    break;
  }
  data.push(createData(stockData[o]["Date"].substring(0, 10), stockData[o]["Close"]));
  
}

/*
const data = [
  createData('00:00', 0),
  createData('03:00', 300),
  createData('06:00', 600),
  createData('09:00', 800),
  createData('12:00', 1500),
  createData('15:00', 2000),
  createData('18:00', 2400),
  createData('21:00', 2400),
  createData('24:00'),
];
*/



export default function StockChart() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>2018</Title>
      <div style={{ width: '100%', flexGrow: 1, overflow: 'hidden' }}>
        <LineChart
          dataset={data}
          margin={{
            top: 16,
            right: 20,
            left: 70,
            bottom: 30,
          }}
          xAxis={[
            {
              scaleType: 'point',
              dataKey: 'time',
              tickNumber: 365,
              tickLabelStyle: theme.typography.body2,
            },
          ]}
          yAxis={[
            {
              label: 'Price ($)',
              labelStyle: {
                ...theme.typography.body1,
                fill: theme.palette.text.primary,
              },
              tickLabelStyle: theme.typography.body2,
              max: 100,
              tickNumber: 3,
            },
          ]}
          series={[
            {
              dataKey: 'price',
              showMark: false,
              color: theme.palette.primary.light,
            },
          ]}
          sx={{
            [`.${axisClasses.root} line`]: { stroke: theme.palette.text.secondary },
            [`.${axisClasses.root} text`]: { fill: theme.palette.text.secondary },
            [`& .${axisClasses.left} .${axisClasses.label}`]: {
              transform: 'translateX(-25px)',
            },
          }}
        />
      </div>
    </React.Fragment>
  );
}

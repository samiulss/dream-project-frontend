import {
  CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis
} from 'recharts';

const data = [
  {
    name: 'Jan',
    uv: 4000,
    Earning: 2400,
    amt: 2400,
  },
  {
    name: 'Feb',
    uv: 3000,
    Earning: 1398,
    amt: 2210,
  },
  {
    name: 'Mar',
    uv: 2000,
    Earning: 9800,
    amt: 2290,
  },
  {
    name: 'Apr',
    uv: 2780,
    Earning: 3908,
    amt: 2000,
  },
  {
    name: 'May',
    uv: 1890,
    Earning: 4800,
    amt: 2181,
  },
  {
    name: 'Jun',
    uv: 2390,
    Earning: 3800,
    amt: 2500,
  },
];

function Chart() {
  return (
    <LineChart
      width={900}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="Earning" stroke="#8884d8" activeDot={{ r: 8 }} />
    </LineChart>
  );
}

export default Chart;

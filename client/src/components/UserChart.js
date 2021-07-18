import React, { useEffect } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

const UserChart = (props) => {
  return (
    <div className="data-container">
      <LineChart
        className="chart"
        width={500}
        height={300}
        data={props.userChartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey={props.userTrend.key_word_1}
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey={props.userTrend.key_word_2}
          stroke="#82ca9d"
        />
      </LineChart>
    </div>
  )
}

export default UserChart

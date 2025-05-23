import React from 'react'
import { Line } from '@ant-design/charts'
import type { LineChartData } from '../../../apis/charts/chart.interface'

interface LineChartProps {
  data: LineChartData[]
  xField?: string
  yField?: string
  title?: string
}

const LineChart: React.FC<LineChartProps> = ({ data, xField = 'x', yField = 'y', title }) => {
  const config = {
    data,
    xField,
    yField,
    height: 260,
    point: { size: 5, shape: 'diamond' },
    smooth: true,
    line: {
      style: {
        stroke: '#5B8FF9',
        lineWidth: 1,
      },
    },
    axis: {
      x: {
        label: {
          style: {
            fill: '#1890ff',
          },
        },
      },
      y: {
        label: {
          style: {
            fill: '#52c41a',
          },
        },
      },
    },
  }
  return (
    <div>
      {title && <div style={{ fontWeight: 500, marginBottom: 8 }}>{title}</div>}
      <Line {...config} />
    </div>
  )
}

export default LineChart

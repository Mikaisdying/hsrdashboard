import React from 'react'
import { Card } from 'antd'
import { Pie } from '@ant-design/plots'
import type { PieChartData } from '../../../apis/charts/chart.interface'
import { colorPieChart } from '../../../common/theme/theme.constant'
import { useTheme } from '../../../common/theme/ThemeContext'

interface PieChartProps {
  data: PieChartData[]
  title?: string
}

const PieChart: React.FC<PieChartProps> = ({ data, title }) => {
  const { theme } = useTheme()
  const legendLabelColor = theme === 'dark' ? '#eee' : '#333'

  const config = {
    data,
    angleField: 'value',
    colorField: 'type',
    color: colorPieChart,
    label: {
      text: 'value',
      style: {
        fontWeight: 'light',
      },
    },
    legend: {
      color: {
        title: false,
        position: 'left',
        rowPadding: 5,
        itemLabelFill: legendLabelColor,
      },
    },
    radius: 0.9,
    height: 260,
    tooltip: true,
  }

  return (
    <Card
      title={title}
      style={{ height: '100%', minHeight: 320 }}
      styles={{ body: { padding: 0 } }}
    >
      <Pie {...config} />
    </Card>
  )
}

export default PieChart

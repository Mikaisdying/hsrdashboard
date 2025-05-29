import { useState, useEffect } from 'react'
import LineChart from './charts/LineChart'
import PieChart from './charts/PieChart'
import { Card } from 'antd'
import { fetchLineChartData, fetchPieChartData } from '../../apis/charts/chart.api'
import type { LineChartData, PieChartData } from '../../apis/charts/chart.interface'

const DashboardPage = () => {
  const [lineData, setLineData] = useState<LineChartData[]>([])
  const [pieData, setPieData] = useState<PieChartData[]>([])
  const [, /* loading */ setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    Promise.all([fetchLineChartData(), fetchPieChartData()]).then(([l, p]) => {
      setLineData(l)
      setPieData(p)
      setLoading(false)
    })
  }, [])

  return (
    <div className="h-full overflow-auto p-4">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
        }}
      >
        <Card title="Biểu đồ đường">
          <LineChart data={lineData} />
        </Card>
        <Card title="Biểu đồ tròn">
          <PieChart data={pieData} />
        </Card>
      </div>
    </div>
  )
}

export default DashboardPage

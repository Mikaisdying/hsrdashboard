import { useFetch } from '../../hooks/useFetch'
import LineChart from './charts/LineChart'
import PieChart from './charts/PieChart'
import { Card } from 'antd'
import { fetchLineChartData, fetchPieChartData } from '../../apis/charts/chart.api'
import type { LineChartData, PieChartData } from '../../apis/charts/chart.interface'

const DashboardPage = () => {
  const {
    data: lineData,
    loading: loadingLine,
    error: errorLine,
  } = useFetch<LineChartData[]>(fetchLineChartData, [])
  const {
    data: pieData,
    loading: loadingPie,
    error: errorPie,
  } = useFetch<PieChartData[]>(fetchPieChartData, [])

  if (loadingLine || loadingPie) return <div>Loading...</div>
  if (errorLine || errorPie) return <div>Error loading chart data</div>

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
          <LineChart data={lineData || []} />
        </Card>
        <Card title="Biểu đồ tròn">
          <PieChart data={pieData || []} />
        </Card>
      </div>
    </div>
  )
}

export default DashboardPage

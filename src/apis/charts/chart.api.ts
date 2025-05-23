import { apiService } from '../apiService'
import type { LineChartData, PieChartData } from './chart.interface'

export const fetchLineChartData = async (): Promise<LineChartData[]> => {
  return apiService<LineChartData[]>({ url: '/lineChartData' })
}

export const fetchPieChartData = async (): Promise<PieChartData[]> => {
  return apiService<PieChartData[]>({ url: '/pieChartData' })
}

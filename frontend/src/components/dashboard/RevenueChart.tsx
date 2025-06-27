"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FiTrendingUp } from "react-icons/fi"
import { formatPrice } from "@/lib/formatters"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface MonthlyRevenueData {
  month: string
  revenue: number
}

interface RevenueChartProps {
  data: MonthlyRevenueData[]
}

export default function RevenueChart({ data }: RevenueChartProps) {
  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0)
  const monthsWithData = data.filter(item => item.revenue > 0).length
  const averageRevenue = monthsWithData > 0 ? totalRevenue / monthsWithData : 0
  
  if (data.length === 0) {
    return (
      <Card className="border-0 shadow-xl bg-card hover:shadow-2xl transition-all duration-300 overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-primary to-accent"></div>
        <CardHeader className="pb-4">
          <CardTitle className="text-sm sm:text-base font-medium text-foreground flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <FiTrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            </div>
            Monthly Revenue Trend
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col items-center justify-center h-40 space-y-3">
            <div className="p-4 bg-muted/50 rounded-full">
              <FiTrendingUp className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-sm">No revenue data available</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Chart.js configuration
  const chartData = {
    labels: data.map(item => item.month),
    datasets: [
      {
        label: 'Monthly Revenue',
        data: data.map(item => item.revenue),
        backgroundColor: data.map((item) => {
          const maxRevenue = Math.max(...data.map(d => d.revenue))
          const minRevenue = Math.min(...data.map(d => d.revenue))
          
          if (item.revenue === maxRevenue) {
            return 'rgba(34, 197, 94, 0.8)' // emerald for highest
          } else if (item.revenue === minRevenue) {
            return 'rgba(239, 68, 68, 0.8)' // red for lowest
          } else {
            return 'rgba(59, 130, 246, 0.8)' // blue for others
          }
        }),
        borderColor: data.map((item) => {
          const maxRevenue = Math.max(...data.map(d => d.revenue))
          const minRevenue = Math.min(...data.map(d => d.revenue))
          
          if (item.revenue === maxRevenue) {
            return 'rgba(34, 197, 94, 1)'
          } else if (item.revenue === minRevenue) {
            return 'rgba(239, 68, 68, 1)'
          } else {
            return 'rgba(59, 130, 246, 1)'
          }
        }),
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      }
    ]
  }

  const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
        callbacks: {
          label: function(context) {
            return `Revenue: ${formatPrice(context.raw as number)}`
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
        },
        ticks: {
          color: 'rgba(148, 163, 184, 0.8)',
          callback: function(value) {
            return formatPrice(value as number)
          }
        },
        border: {
          display: false
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgba(148, 163, 184, 0.8)',
        },
        border: {
          display: false
        }
      }
    },
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart'
    }
  }

  return (
    <Card className="border-0 shadow-xl bg-card hover:shadow-2xl transition-all duration-300 overflow-hidden">
      <div className="h-2 bg-gradient-to-r from-primary to-accent"></div>
      <CardHeader className="pb-4">
        <CardTitle className="text-sm sm:text-base font-medium text-foreground flex items-center gap-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <FiTrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          </div>
          Monthly Revenue Trend
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-6">
          {/* Chart Area */}
          <div className="h-64">
            <Bar data={chartData} options={chartOptions} />
          </div>
          
          {/* Summary Stats */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Total Revenue</p>
              <p className="text-sm font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {formatPrice(totalRevenue)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Average ({monthsWithData} months)</p>
              <p className="text-sm font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {formatPrice(averageRevenue)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 
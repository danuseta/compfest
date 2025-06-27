"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MdPieChart } from "react-icons/md"
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

interface SubscriptionData {
  planName: string
  count: number
  color: string
}

interface SubscriptionPieChartProps {
  data: SubscriptionData[]
}

export default function SubscriptionPieChart({ data }: SubscriptionPieChartProps) {
  const total = data.reduce((sum, item) => sum + item.count, 0)
  
  if (total === 0) {
    return (
      <Card className="border-0 shadow-xl bg-card hover:shadow-2xl transition-all duration-300 overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-primary to-accent"></div>
        <CardHeader className="pb-4">
          <CardTitle className="text-sm sm:text-base font-medium text-foreground flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <MdPieChart className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            </div>
            Plan Distribution
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col items-center justify-center h-40 space-y-3">
            <div className="p-4 bg-muted/50 rounded-full">
              <MdPieChart className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-sm">No subscription data available</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const chartData = {
    labels: data.map(item => item.planName),
    datasets: [
      {
        data: data.map(item => item.count),
        backgroundColor: data.map(item => item.color),
        borderColor: data.map(item => item.color),
        borderWidth: 2,
        hoverBorderWidth: 4,
        hoverOffset: 8,
      }
    ]
  }

  const chartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '60%',
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
            const percentage = ((context.parsed / total) * 100).toFixed(1)
            return `${context.label}: ${context.parsed} (${percentage}%)`
          }
        }
      }
    },
    animation: {
      animateRotate: true,
      animateScale: true,
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
            <MdPieChart className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          </div>
          Plan Distribution
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-6">
          {/* Chart Area */}
          <div className="relative">
            <div className="h-64">
              <Doughnut data={chartData} options={chartOptions} />
            </div>
            {/* Center Content */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <p className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{total}</p>
                <p className="text-xs text-muted-foreground font-medium">Subscriptions</p>
              </div>
            </div>
          </div>
          
          {/* Legend */}
          <div className="space-y-3">
            {data.map((item, index) => {
              const percentage = ((item.count / total) * 100).toFixed(1)
              return (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full shadow-sm"
                      style={{ 
                        backgroundColor: item.color,
                        boxShadow: `0 0 10px ${item.color}40`
                      }}
                    />
                    <span className="text-sm font-medium text-foreground">{item.planName}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-foreground">{item.count}</span>
                    <span className="text-xs text-muted-foreground ml-1">({percentage}%)</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 
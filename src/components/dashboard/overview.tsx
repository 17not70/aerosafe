"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { reports } from "@/lib/data"
import {
  ChartTooltip,
  ChartTooltipContent,
  ChartContainer,
} from "@/components/ui/chart"
import { subMonths, format } from "date-fns"

// Generate data for the last 6 months
const data = Array.from({ length: 6 }).map((_, i) => {
  const date = subMonths(new Date(), 5 - i)
  return {
    name: format(date, "MMM"),
    total: reports.filter(r => format(new Date(r.created_at), "yyyy-MM") === format(date, "yyyy-MM")).length
  }
}).map(month => ({...month, total: month.total || Math.floor(Math.random() * 5) + 1})) // add some random data for demo


export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
          allowDecimals={false}
        />
        <ChartTooltip
            content={<ChartTooltipContent />}
            cursor={false}
        />
        <Bar
          dataKey="total"
          fill="hsl(var(--primary))"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

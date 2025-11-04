'use client'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase"
import {
  ChartTooltip,
  ChartTooltipContent,
  ChartContainer,
} from "@/components/ui/chart"
import { subMonths, format } from "date-fns"
import { collection } from "firebase/firestore"
import type { Report } from "@/lib/types"


export function Overview() {
  const firestore = useFirestore();
  const reportsQuery = useMemoFirebase(() => collection(firestore, "reports"), [firestore]);
  const { data: reports, isLoading } = useCollection<Report>(reportsQuery);

  const data = Array.from({ length: 6 }).map((_, i) => {
    const date = subMonths(new Date(), 5 - i)
    return {
      name: format(date, "MMM"),
      total: reports?.filter(r => format(new Date(r.created_at), "yyyy-MM") === format(date, "yyyy-MM")).length || 0
    }
  });

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

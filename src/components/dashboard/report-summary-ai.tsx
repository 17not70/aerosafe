"use client"

import { useState, useEffect } from "react"
import { generateReportSummary } from "@/ai/flows/generate-report-summary"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wand2 } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface ReportSummaryAiProps {
  reportDescription: string
}

export function ReportSummaryAi({ reportDescription }: ReportSummaryAiProps) {
  const [summary, setSummary] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function getSummary() {
      try {
        setIsLoading(true)
        setError(null)
        const result = await generateReportSummary({ reportDescription })
        setSummary(result.summary)
      } catch (e) {
        console.error(e)
        setError("Failed to generate summary.")
      } finally {
        setIsLoading(false)
      }
    }
    getSummary()
  }, [reportDescription])

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Wand2 className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-lg">AI Generated Summary</h3>
      </div>
      {isLoading && (
        <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
        </div>
      )}
      {error && <p className="text-sm text-destructive">{error}</p>}
      {summary && (
        <p className="text-sm text-muted-foreground">
          {summary}
        </p>
      )}
    </div>
  )
}

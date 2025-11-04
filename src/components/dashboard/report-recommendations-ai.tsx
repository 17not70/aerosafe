"use client"

import { useState } from "react"
import { generateCorrectiveActionRecommendations } from "@/ai/flows/generate-corrective-action-recommendations"
import { Button } from "@/components/ui/button"
import { Wand2, Lightbulb } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface ReportRecommendationsAiProps {
  reportDetails: string
}

export function ReportRecommendationsAi({ reportDetails }: ReportRecommendationsAiProps) {
  const [recommendations, setRecommendations] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function getRecommendations() {
    try {
      setIsLoading(true)
      setError(null)
      const result = await generateCorrectiveActionRecommendations({ reportDetails })
      setRecommendations(result.recommendations)
    } catch (e) {
      console.error(e)
      setError("Failed to generate recommendations.")
    } finally {
      setIsLoading(false)
    }
  }

  const formatRecommendations = (text: string) => {
    return text.split('\n').map((line, index) => {
      // Remove numbering like "1. " or "1) " and trim whitespace
      const content = line.replace(/^\d+[.)]\s*/, '').trim();
      if (content) {
        return (
          <li key={index} className="flex items-start gap-3">
            <Lightbulb className="h-4 w-4 mt-1 shrink-0 text-accent" />
            <span>{content}</span>
          </li>
        );
      }
      return null;
    });
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Wand2 className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-lg">AI Corrective Action Recommendations</h3>
      </div>
      
      {!recommendations && !isLoading && (
         <div className="flex flex-col items-start gap-4 rounded-lg border p-4 text-sm">
            <p className="text-muted-foreground">Use AI to generate potential corrective actions based on this report. This is a tool to assist, not replace, expert safety analysis.</p>
            <Button onClick={getRecommendations} disabled={isLoading}>
              {isLoading ? "Generating..." : "Generate Recommendations"}
            </Button>
         </div>
      )}

      {isLoading && (
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}
      
      {recommendations && (
        <div className="text-sm text-muted-foreground">
            <ul className="space-y-3">
                {formatRecommendations(recommendations)}
            </ul>
        </div>
      )}
    </div>
  )
}

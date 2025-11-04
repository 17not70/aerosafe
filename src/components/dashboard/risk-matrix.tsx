import { Report, Severity, Probability } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface RiskMatrixProps {
  reports: Report[];
}

const severityLabels = ['Insignificant', 'Minor', 'Moderate', 'Major', 'Catastrophic'];
const probabilityLabels = ['Improbable', 'Remote', 'Occasional', 'Probable', 'Frequent'];

const getRiskColor = (riskIndex: number) => {
  if (riskIndex >= 17) return 'bg-red-600 hover:bg-red-700'; // High
  if (riskIndex >= 10) return 'bg-orange-500 hover:bg-orange-600'; // Medium
  if (riskIndex >= 4) return 'bg-yellow-400 hover:bg-yellow-500'; // Low
  return 'bg-green-500 hover:bg-green-600'; // Very Low
};

const getTextColor = (riskIndex: number) => {
    if (riskIndex >= 10) return 'text-white';
    return 'text-gray-900';
}

export function RiskMatrix({ reports }: RiskMatrixProps) {
  const matrix: (Report[])[][] = Array(5).fill(0).map(() => Array(5).fill(0).map(() => []));

  reports.forEach(report => {
    const severityIndex = report.severity - 1;
    const probabilityIndex = report.probability - 1;
    if (severityIndex >= 0 && severityIndex < 5 && probabilityIndex >= 0 && probabilityIndex < 5) {
      matrix[severityIndex][probabilityIndex].push(report);
    }
  });

  return (
    <TooltipProvider>
      <div className="flex gap-4">
        <div className="flex flex-col-reverse justify-between text-xs text-muted-foreground pt-8 pr-2">
          {severityLabels.map((label, i) => <div key={i} className="h-16 flex items-center font-semibold -rotate-90">{label}</div>)}
          <div className="h-8" />
        </div>
        <div className="flex-1">
            <div className="grid grid-cols-5 gap-1 text-xs text-center font-semibold text-muted-foreground pb-2">
                {probabilityLabels.map((label, i) => <div key={i}>{label}</div>)}
            </div>
            <div className="grid grid-cols-5 grid-rows-5 gap-1 aspect-square">
                {matrix.slice().reverse().map((row, rowIndex) =>
                    row.map((cellReports, colIndex) => {
                    const severity = (5 - rowIndex) as Severity;
                    const probability = (colIndex + 1) as Probability;
                    const riskIndex = severity * probability;
                    const cellHasReports = cellReports.length > 0;

                    return (
                        <Tooltip key={`${rowIndex}-${colIndex}`}>
                        <TooltipTrigger asChild>
                            <div
                            className={cn(
                                'rounded-md flex items-center justify-center font-bold text-lg transition-colors duration-200',
                                cellHasReports ? getRiskColor(riskIndex) : 'bg-secondary',
                                cellHasReports ? getTextColor(riskIndex) : 'text-muted-foreground',
                                cellHasReports && 'cursor-pointer'
                            )}
                            >
                            {cellHasReports ? cellReports.length : 0}
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="font-bold">{severityLabels[severity-1]} / {probabilityLabels[probability-1]}</p>
                            <p>Risk Index: {riskIndex}</p>
                            <p>{cellReports.length} report(s)</p>
                            {cellHasReports && <ul className="list-disc pl-4 mt-2">
                                {cellReports.slice(0, 3).map(r => <li key={r.id}>{r.title}</li>)}
                                {cellReports.length > 3 && <li>...and {cellReports.length - 3} more</li>}
                            </ul>}
                        </TooltipContent>
                        </Tooltip>
                    );
                    })
                )}
            </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

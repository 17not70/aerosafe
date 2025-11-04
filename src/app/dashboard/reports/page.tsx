import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { reports } from "@/lib/data"
import { cn } from "@/lib/utils"
import { format, parseISO } from "date-fns"
import { FilePlus, Download } from "lucide-react"
import Link from "next/link"

const getRiskColor = (riskIndex: number) => {
  if (riskIndex >= 17) return 'bg-red-200 text-red-900 border-red-300';
  if (riskIndex >= 10) return 'bg-orange-200 text-orange-900 border-orange-300';
  if (riskIndex >= 4) return 'bg-yellow-200 text-yellow-900 border-yellow-300';
  return 'bg-green-200 text-green-900 border-green-300';
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Open':
      return 'text-blue-600 bg-blue-100';
    case 'In Progress':
      return 'text-yellow-600 bg-yellow-100';
    case 'Completed':
      return 'text-green-600 bg-green-100';
    case 'Closed':
      return 'text-gray-600 bg-gray-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight font-headline">All Reports</h1>
        <div className="flex items-center gap-2">
            <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export CSV
            </Button>
            <Button asChild>
                <Link href="/dashboard/reports/new">
                <FilePlus className="mr-2 h-4 w-4" /> New Report
                </Link>
            </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Safety Reports</CardTitle>
          <CardDescription>A list of all submitted safety reports.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Risk Index</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.id.toUpperCase()}</TableCell>
                  <TableCell>{report.title}</TableCell>
                  <TableCell>
                    <Badge variant={report.type === 'MOR' ? "destructive" : "secondary"}>{report.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn("border", getRiskColor(report.risk_index))}>{report.risk_index}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn(getStatusColor(report.action_status))}>{report.action_status}</Badge>
                  </TableCell>
                  <TableCell>{format(parseISO(report.created_at), "MMM d, yyyy")}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={`/dashboard/reports/${report.id}`}>View</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

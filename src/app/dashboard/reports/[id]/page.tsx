import { notFound } from "next/navigation"
import { reports, users, correctiveActions } from "@/lib/data"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Paperclip, ShieldCheck, Edit, PlusCircle } from "lucide-react"
import { format, parseISO } from "date-fns"
import { cn } from "@/lib/utils"
import { ReportSummaryAi } from "@/components/dashboard/report-summary-ai"
import { ReportRecommendationsAi } from "@/components/dashboard/report-recommendations-ai"

const getRiskColor = (riskIndex: number, element: 'text' | 'bg' | 'border') => {
    if (riskIndex >= 17) return `text-red-900 bg-red-100 border-red-300`;
    if (riskIndex >= 10) return `text-orange-900 bg-orange-100 border-orange-300`;
    if (riskIndex >= 4) return `text-yellow-900 bg-yellow-100 border-yellow-300`;
    return `text-green-900 bg-green-100 border-green-300`;
};

const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'text-blue-600 bg-blue-100';
      case 'In Progress': return 'text-yellow-600 bg-yellow-100';
      case 'Completed': return 'text-green-600 bg-green-100';
      case 'Closed': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
};

export default function ReportDetailPage({ params }: { params: { id: string } }) {
  const report = reports.find((r) => r.id === params.id)
  if (!report) {
    notFound()
  }

  const reporter = users.find((u) => u.id === report.reporter_id)
  const reportActions = correctiveActions.filter(a => a.report_id === report.id);

  return (
    <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="h-7 w-7" asChild>
                <Link href="/dashboard/reports">
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Back</span>
                </Link>
            </Button>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0 font-headline">
                {report.title}
            </h1>
            <Badge variant={report.type === 'MOR' ? 'destructive' : 'secondary'} className="ml-auto sm:ml-0">
                {report.type}
            </Badge>
            <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Button variant="outline" size="sm">
                Discard
                </Button>
                <Button size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Report
                </Button>
            </div>
        </div>
      <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Report Details</CardTitle>
              <CardDescription>{report.id.toUpperCase()}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {report.description}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
                <CardTitle className="font-headline">AI Analysis</CardTitle>
                <CardDescription>AI-powered insights based on the report data.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <ReportSummaryAi reportDescription={report.description} />
                <Separator />
                <ReportRecommendationsAi reportDetails={report.description} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="font-headline">Corrective Actions</CardTitle>
                    <CardDescription>Actions taken to address this report.</CardDescription>
                </div>
                <Button size="sm" variant="outline">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Action
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Description</TableHead>
                            <TableHead>Assigned To</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Due</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {reportActions.length > 0 ? reportActions.map(action => {
                            const assignee = users.find(u => u.id === action.assigned_to_id);
                            return (
                                <TableRow key={action.id}>
                                    <TableCell className="font-medium">{action.description}</TableCell>
                                    <TableCell>{assignee?.name || 'Unassigned'}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={cn(getStatusColor(action.status))}>{action.status}</Badge>
                                    </TableCell>
                                    <TableCell>{format(parseISO(action.due_date), "MMM d, yyyy")}</TableCell>
                                </TableRow>
                            )
                        }) : (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center text-muted-foreground">No corrective actions assigned.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
          </Card>
        </div>
        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Risk Assessment</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Severity</span>
                        <span>{report.severity} / 5</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Probability</span>
                        <span>{report.probability} / 5</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between font-semibold">
                        <span className="text-muted-foreground">Risk Index</span>
                        <span className={cn('text-lg', getRiskColor(report.risk_index, 'text').split(' ')[0])}>{report.risk_index}</span>
                    </div>
                </CardContent>
                <CardFooter className={cn('p-4 rounded-b-lg', getRiskColor(report.risk_index, 'bg'))}>
                    <p className={cn('text-sm font-medium w-full text-center', getRiskColor(report.risk_index, 'text').split(' ')[0])}>Medium Risk</p>
                </CardFooter>
            </Card>
            <Card>
            <CardHeader>
                <CardTitle className="font-headline">Metadata</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 text-sm">
                <div className="flex items-start gap-3">
                    <Avatar className="w-10 h-10 border">
                        <AvatarImage src={reporter?.avatar} />
                        <AvatarFallback>{reporter?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">Reported By</p>
                        <p className="text-muted-foreground">{reporter?.name}</p>
                    </div>
                </div>
                <Separator />
                <div className="grid gap-1">
                    <p className="font-semibold">Date Submitted</p>
                    <p className="text-muted-foreground">{format(parseISO(report.created_at), "PPP p")}</p>
                </div>
                <Separator />
                <div className="grid gap-1">
                    <p className="font-semibold">Action Status</p>
                    <Badge variant="outline" className={cn(getStatusColor(report.action_status))}>{report.action_status}</Badge>
                </div>
                {report.attachments && report.attachments.length > 0 && (
                    <>
                    <Separator />
                    <div>
                        <p className="font-semibold mb-2">Attachments</p>
                        <ul className="grid gap-2">
                        {report.attachments.map(att => (
                            <li key={att.name}>
                            <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                                <a href={att.url}>
                                <Paperclip className="h-3.5 w-3.5 mr-2" /> {att.name}
                                </a>
                            </Button>
                            </li>
                        ))}
                        </ul>
                    </div>
                    </>
                )}
            </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}

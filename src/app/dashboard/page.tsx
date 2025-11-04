'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, FilePlus } from "lucide-react"
import Link from "next/link"
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase"
import { Overview } from "@/components/dashboard/overview"
import { RecentReports } from "@/components/dashboard/recent-reports"
import { RiskMatrix } from "@/components/dashboard/risk-matrix"
import { collection, query, where } from "firebase/firestore"
import type { Report, CorrectiveAction } from "@/lib/types"

export default function DashboardPage() {
  const firestore = useFirestore();
  const reportsQuery = useMemoFirebase(() => collection(firestore, "reports"), [firestore]);
  const { data: reports, isLoading: reportsLoading } = useCollection<Report>(reportsQuery);

  const correctiveActionsQuery = useMemoFirebase(() => collection(firestore, "corrective_actions"), [firestore]);
  const { data: correctiveActions, isLoading: actionsLoading } = useCollection<CorrectiveAction>(correctiveActionsQuery);
  
  const openActions = correctiveActions?.filter(a => a.status === 'Open' || a.status === 'In Progress').length || 0;
  const overdueActions = correctiveActions?.filter(a => new Date(a.due_date) < new Date() && a.status !== 'Completed' && a.status !== 'Closed').length || 0;

  const totalReports = reports?.length || 0;
  const avgRiskIndex = totalReports > 0 ? (reports!.reduce((acc, r) => acc + r.risk_index, 0) / totalReports).toFixed(1) : 0;
  
  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Button asChild>
            <Link href="/dashboard/reports/new">
              <FilePlus className="mr-2 h-4 w-4" /> New Report
            </Link>
          </Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportsLoading ? '...' : totalReports}</div>
            <p className="text-xs text-muted-foreground">
              +2 this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Actions</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{actionsLoading ? '...' : openActions}</div>
            <p className="text-xs text-muted-foreground">
              from {reports?.filter(r => r.action_status !== 'Closed').length} reports
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Index Average</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportsLoading ? '...' : avgRiskIndex}</div>
            <p className="text-xs text-muted-foreground">
              Trending downwards
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Actions</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v4" />
              <path d="M12 20v2" />
              <path d="M5 5l2.5 2.5" />
              <path d="M16.5 16.5l2.5 2.5" />
              <path d="M2 12h4" />
              <path d="M18 12h4" />
              <path d="M5 19l2.5-2.5" />
              <path d="M16.5 7.5l2.5-2.5" />
              <circle cx="12" cy="12" r="4" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{actionsLoading ? '...' : overdueActions}</div>
            <p className="text-xs text-muted-foreground">
              Requires immediate attention
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="font-headline">Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="font-headline">Recent Reports</CardTitle>
            <CardDescription>
              You have {reports?.length || 0} safety reports in total.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentReports />
          </CardContent>
        </Card>
        <Card className="col-span-full">
            <CardHeader>
                <CardTitle className="font-headline">Risk Matrix</CardTitle>
                <CardDescription>5x5 matrix mapping probability vs. severity of all reports.</CardDescription>
            </CardHeader>
            <CardContent>
                <RiskMatrix reports={reports || []} />
            </CardContent>
        </Card>
      </div>
    </>
  )
}

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { correctiveActions, users, reports } from "@/lib/data"
import { cn } from "@/lib/utils"
import { format, parseISO } from "date-fns"
import Link from "next/link"

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

export default function ActionsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Corrective Actions</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Actions</CardTitle>
          <CardDescription>A list of all corrective actions across all reports.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action ID</TableHead>
                <TableHead>Report</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {correctiveActions.map((action) => {
                const user = users.find(u => u.id === action.assigned_to_id)
                const report = reports.find(r => r.id === action.report_id)
                const isOverdue = new Date(action.due_date) < new Date() && action.status !== 'Completed' && action.status !== 'Closed';
                
                return (
                  <TableRow key={action.id}>
                    <TableCell className="font-medium">{action.id.toUpperCase()}</TableCell>
                    <TableCell>
                      <Link href={`/dashboard/reports/${report?.id}`} className="hover:underline text-primary">
                        {report?.id.toUpperCase()}
                      </Link>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{action.description}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                            <AvatarImage src={user?.avatar} />
                            <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{user?.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn(getStatusColor(action.status))}>{action.status}</Badge>
                    </TableCell>
                    <TableCell className={cn(isOverdue && "text-destructive font-semibold")}>
                      {format(parseISO(action.due_date), "MMM d, yyyy")}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

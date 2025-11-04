import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { reports, users } from "@/lib/data"

export function RecentReports() {
    const recentReports = reports.slice(0, 5);

  return (
    <div className="space-y-8">
        {recentReports.map(report => {
            const user = users.find(u => u.id === report.reporter_id);
            return (
                <div className="flex items-center" key={report.id}>
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={user?.avatar} alt="Avatar" />
                        <AvatarFallback>{user?.name.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">{report.title}</p>
                        <p className="text-sm text-muted-foreground">{user?.email || 'Unknown reporter'}</p>
                    </div>
                    <div className="ml-auto font-medium">Risk: {report.risk_index}</div>
                </div>
            )
        })}
    </div>
  )
}

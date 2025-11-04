'use client'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase"
import { collection, query, orderBy, limit } from "firebase/firestore"
import type { Report, User } from "@/lib/types"

export function RecentReports() {
    const firestore = useFirestore();
    const reportsQuery = useMemoFirebase(() => query(collection(firestore, "reports"), orderBy("created_at", "desc"), limit(5)), [firestore]);
    const { data: recentReports, isLoading: reportsLoading } = useCollection<Report>(reportsQuery);

    const usersQuery = useMemoFirebase(() => collection(firestore, "users"), [firestore]);
    const { data: users, isLoading: usersLoading } = useCollection<User>(usersQuery);

  return (
    <div className="space-y-8">
        {reportsLoading && <p>Loading recent reports...</p>}
        {recentReports && recentReports.map(report => {
            const user = users?.find(u => u.id === report.reporter_id);
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

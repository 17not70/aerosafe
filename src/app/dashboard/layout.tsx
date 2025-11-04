import Link from "next/link"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { DashboardNav } from "@/components/dashboard-nav"
import { UserNav } from "@/components/user-nav"
import { Icons } from "@/components/icons"
import { getCurrentUser } from "@/lib/data"
import { FirebaseClientProvider } from "@/firebase/client-provider"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = getCurrentUser()

  return (
    <FirebaseClientProvider>
      <SidebarProvider>
        <div className="min-h-screen">
          <Sidebar>
            <SidebarHeader>
              <Link href="/dashboard" className="flex items-center gap-2">
                <Icons.logo className="w-8 h-8 text-primary" />
                <span className="font-bold text-lg font-headline text-sidebar-foreground">AeroSafe</span>
              </Link>
            </SidebarHeader>
            <SidebarContent>
              <DashboardNav userRole={user.role} />
            </SidebarContent>
            <SidebarFooter>
              <UserNav user={user} />
            </SidebarFooter>
          </Sidebar>
          <SidebarInset>
            <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
              <SidebarTrigger className="md:hidden" />
              <div className="w-full flex-1">
                {/* Breadcrumbs can be dynamically added here */}
              </div>
              <Button variant="outline" size="sm">
                Help
              </Button>
            </header>
            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
              {children}
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </FirebaseClientProvider>
  )
}

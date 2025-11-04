
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ClipboardList,
  LayoutDashboard,
  Users,
  ShieldCheck,
  FilePlus,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import type { NavItem, UserRole } from "@/lib/types"

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    roles: ["Admin", "Safety Officer", "Reporter"],
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: ClipboardList,
    roles: ["Admin", "Safety Officer", "Reporter"],
  },
  {
    title: "Actions",
    href: "/dashboard/actions",
    icon: ShieldCheck,
    roles: ["Admin", "Safety Officer"],
  },
  {
    title: "User Management",
    href: "/dashboard/admin",
    icon: Users,
    roles: ["Admin"],
  },
]

interface DashboardNavProps {
  userRole: UserRole
}

export function DashboardNav({ userRole }: DashboardNavProps) {
  const pathname = usePathname()

  const accessibleNavItems = navItems.filter((item) =>
    item.roles.includes(userRole)
  )

  return (
    <SidebarMenu>
      {accessibleNavItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href} legacyBehavior passHref>
            <SidebarMenuButton
              isActive={pathname === item.href}
              tooltip={item.title}
            >
              <item.icon />
              <span>{item.title}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
      <SidebarMenuItem className="mt-4">
          <Link href="/dashboard/reports/new" legacyBehavior passHref>
            <SidebarMenuButton
                variant="outline"
                className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 hover:text-primary"
                >
                <FilePlus />
                <span>New Report</span>
            </SidebarMenuButton>
          </Link>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

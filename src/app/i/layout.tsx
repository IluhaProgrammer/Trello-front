import { DashboardLayout } from "@/components/dashboard-layout/DashboardLayout"
import type { PropsWithChildren } from "react";

export default function Layout({children}: PropsWithChildren<unknown>) {
    return <DashboardLayout>{children}</DashboardLayout>
}
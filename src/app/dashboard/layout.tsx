// app/(vendor)/layout.tsx

import { redirect } from "next/navigation";
import DashboardShell from "./_components/dashboard-shell";
import { getServerSideUser } from "@/lib/api/server";


export default async function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getServerSideUser();
  if (!user) {
    redirect("/");
  } else if (!user.vendor) {
    redirect("/new-vendor");
  }

  return <DashboardShell>{children}</DashboardShell>;
}

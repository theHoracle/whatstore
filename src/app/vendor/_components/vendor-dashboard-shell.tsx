"use client";

import * as React from "react";
import { VendorSidebar } from "@/app/vendor/_components/vendor-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function VendorDashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  // Use useState and useEffect to handle hydration
  const [isMounted, setIsMounted] = React.useState(false);
  
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // During server-side rendering and initial hydration, render a simplified version
  if (!isMounted) {
    return (
      <SidebarProvider>
        <div className="hidden md:block"></div> {/* Placeholder for sidebar */}
        <main className="bg-background relative flex w-full flex-1 flex-col">
          <header className="flex h-16 shrink-0 items-center border-b px-4">
            {/* Minimal header during hydration */}
            <div className="h-5 w-40 bg-muted rounded animate-pulse"></div>
          </header>
          <div className="p-4">{children}</div>
        </main>
      </SidebarProvider>
    );
  }

  // After hydration, render the full component
  return (
    <SidebarProvider>
      <VendorSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/vendor">
                    Vendor Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Overview</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
} 
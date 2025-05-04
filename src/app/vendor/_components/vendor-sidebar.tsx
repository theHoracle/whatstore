"use client";

import * as React from "react";
import {
  BarChart3,
  Boxes,
  Building,
  CreditCard,
  MessageSquare,
  Package,
  Settings2,
  ShoppingCart,
  Store,
  Tag,
  Target,
  Users,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { RedirectToSignIn, useUser } from "@clerk/nextjs";
import { TeamSwitcher } from "@/components/team-switcher";

// This is sample vendor dashboard data
const data = {
  stores: [
    {
      name: "My Digital Store",
      logo: Store,
      plan: "Pro",
    },
    {
      name: "Software Hub",
      logo: Package,
      plan: "Basic",
    },
  ],
  navMain: [
    {
      title: "Overview",
      url: "/vendor",
      icon: Target,
      isActive: true,
    },
    {
      title: "Products",
      url: "/vendor/products",
      icon: Boxes,
      items: [
        {
          title: "All Products",
          url: "/vendor/products",
        },
        {
          title: "Add New",
          url: "/vendor/products/new",
        },
        {
          title: "Categories",
          url: "/vendor/products/categories",
        },
      ],
    },
    {
      title: "Orders",
      url: "/vendor/orders",
      icon: ShoppingCart,
      items: [
        {
          title: "All Orders",
          url: "/vendor/orders",
        },
        {
          title: "Pending",
          url: "/vendor/orders/pending",
        },
        {
          title: "Completed",
          url: "/vendor/orders/completed",
        },
      ],
    },
    {
      title: "Stores",
      url: "/vendor/stores",
      icon: Building,
      items: [
        {
          title: "Manage Stores",
          url: "/vendor/stores",
        },
        {
          title: "Create Store",
          url: "/vendor/stores/new",
        },
      ],
    },
    {
      title: "Customers",
      url: "/vendor/customers",
      icon: Users,
      items: [],
    },
    {
      title: "Analytics",
      url: "/vendor/analytics",
      icon: BarChart3,
      items: [
        {
          title: "Sales Overview",
          url: "/vendor/analytics/sales",
        },
        {
          title: "Customer Insights",
          url: "/vendor/analytics/customers",
        },
        {
          title: "Product Performance",
          url: "/vendor/analytics/products",
        },
      ],
    },
    {
      title: "Messages",
      url: "/vendor/messages",
      icon: MessageSquare,
      items: [],
    },
    {
      title: "Payments",
      url: "/vendor/payments",
      icon: CreditCard,
      items: [
        {
          title: "Payment Methods",
          url: "/vendor/payments/methods",
        },
        {
          title: "Transaction History",
          url: "/vendor/payments/transactions",
        },
        {
          title: "Payout Settings",
          url: "/vendor/payments/settings",
        },
      ],
    },
    {
      title: "Settings",
      url: "/vendor/settings",
      icon: Settings2,
      items: [
        {
          title: "Account",
          url: "/vendor/settings/account",
        },
        {
          title: "Notifications",
          url: "/vendor/settings/notifications",
        },
        {
          title: "Integrations",
          url: "/vendor/settings/integrations",
        },
      ],
    },
  ],
};

// Fallback user for development
const fallbackUser = {
  fullName: "Vendor User",
  firstName: "Vendor",
  lastName: "User",
  primaryEmailAddress: { emailAddress: "vendor@example.com" },
  imageUrl: "",
};

export function VendorSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Use useEffect to handle client-side only state changes
  const [isClient, setIsClient] = React.useState(false);
  const { user, isLoaded } = useUser();
  
  // Set isClient to true after component mounts to avoid hydration mismatch
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  // Show a loading state during hydration - this ensures server and client render the same initial content
  if (!isClient) {
    return (
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <TeamSwitcher teams={data.stores} teamLabel="Store" />
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.navMain} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser 
            user={{
              name: "Loading...",
              email: "loading@example.com",
              avatar: "",
            }} 
          />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    );
  }

  // After hydration, handle authentication flow
  if (isClient && !isLoaded) {
    return (
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <TeamSwitcher teams={data.stores} teamLabel="Store" />
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.navMain} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser 
            user={{
              name: "Loading...",
              email: "loading@example.com",
              avatar: "",
            }} 
          />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    );
  }

  // If we're in development and there's no user, use the fallback
  const userInfo = user || (process.env.NODE_ENV === 'development' ? fallbackUser : null);
  
  // In development, we'll show the sidebar even without a user
  if (isClient && !userInfo && process.env.NODE_ENV !== 'development') {
    return <RedirectToSignIn />;
  }

  const userDetails = {
    name: userInfo?.fullName ?? userInfo?.firstName + " " + userInfo?.lastName ?? "Vendor User",
    email: userInfo?.primaryEmailAddress?.emailAddress ?? "vendor@example.com",
    avatar: userInfo?.imageUrl ?? "",
  };
  
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.stores} teamLabel="Store" />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userDetails} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
} 
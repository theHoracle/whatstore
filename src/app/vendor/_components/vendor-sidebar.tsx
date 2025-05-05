"use client";

import * as React from "react";
import {
  BarChart3,
  Boxes,
  Building,
  CreditCard,
  MessageSquare,
 
  Settings2,
  ShoppingCart,
  Store,
 
  
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
import { useVendorStores } from "@/hooks/use-vendor-stores";
import { useVendorState } from "@/hooks/use-vendor-state";
import { useAuth } from "@/hooks/use-auth";

// Navigation data
const navigationData = [
  {
    title: "Store Catalog",
    url: "/vendor/catalog",
    icon: Boxes,
    items: [
      {
        title: "Products",
        url: "/vendor/catalog/products",
      },
      {
        title: "Services",
        url: "/vendor/catalog/services",
      },
      {
        title: "Add New",
        url: "/vendor/catalog/new",
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
];


export function VendorSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: user } = useAuth();
  const vendorId = user?.vendor?.id as number;
  const { data: storesData, isLoading: isLoadingStores } = useVendorStores(vendorId);
  const { setVendorState, setActiveStore, getVendorState } = useVendorState();
  const vendorState = getVendorState();
  
  if (!vendorState?.activeStoreId && storesData?.length) {
    setActiveStore(storesData[0]?.id);
  }

  // Update vendor state when auth data changes
  React.useEffect(() => {
    if (user?.vendor) {
      setVendorState(user.vendor);
    }
  }, [user?.vendor, setVendorState]);

  // Transform stores data for TeamSwitcher
  const stores = React.useMemo(() => {
    if (!storesData) return [];
    return storesData.map(store => ({
      id: store.id,
      name: store.name,
      logo: store.storeLogo,
      plan: "Pro",
      isActive: vendorState?.activeStoreId === store.id
    }));
  }, [storesData?.length, vendorState?.activeStoreId]);

  // Handle store selection
  const handleStoreSelect = (storeId: number) => {
    setActiveStore(storeId);
  };

  console.log("storeData", storesData);

  if (isLoadingStores || !vendorId) {
    return (
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <TeamSwitcher teams={[]} onStoreSelect={handleStoreSelect} />
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={navigationData} />
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


 const userDetails = {
  name: user?.name!,
  email: user?.email!,
  avatar: user?.avatarUrl!,
 }
  
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={stores} activeStoreId={vendorState?.activeStoreId} onStoreSelect={handleStoreSelect} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navigationData} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userDetails} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
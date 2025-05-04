"use client";

import { useEffect, useState } from "react";
import { BarChart3, Boxes, CreditCard, ShoppingCart, Users } from "lucide-react";

const DashboardCard = ({
  title,
  value,
  change,
  icon: Icon,
  changeDirection = "up",
  iconColor = "bg-primary",
}: {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
  changeDirection?: "up" | "down";
  iconColor?: string;
}) => (
  <div className="flex flex-col gap-2 rounded-xl border bg-card p-5 shadow-sm">
    <div className="flex justify-between">
      <div className="flex flex-col gap-1">
        <span className="text-sm text-muted-foreground">{title}</span>
        <span className="text-2xl font-bold">{value}</span>
      </div>
      <div className={`${iconColor} flex h-10 w-10 items-center justify-center rounded-lg`}>
        <Icon className="h-5 w-5 text-primary-foreground" />
      </div>
    </div>
    <div className="flex items-center gap-1">
      <span className={`text-sm ${changeDirection === "up" ? "text-green-500" : "text-red-500"}`}>
        {changeDirection === "up" ? "↑" : "↓"} {change}
      </span>
      <span className="text-xs text-muted-foreground">vs previous week</span>
    </div>
  </div>
);

const RecentOrderCard = ({
  id,
  product,
  customer,
  date,
  amount,
  status,
}: {
  id: string;
  product: string;
  customer: string;
  date: string;
  amount: string;
  status: "completed" | "processing" | "refunded";
}) => {
  const statusColors = {
    completed: "text-green-500 bg-green-500/10",
    processing: "text-amber-500 bg-amber-500/10",
    refunded: "text-red-500 bg-red-500/10",
  };

  return (
    <div className="grid grid-cols-6 gap-4 rounded-lg border bg-card p-4 shadow-sm">
      <div className="col-span-2">
        <p className="text-sm font-medium">{product}</p>
        <p className="text-xs text-muted-foreground">#{id}</p>
      </div>
      <div className="col-span-1">
        <p className="text-sm">{customer}</p>
      </div>
      <div className="col-span-1">
        <p className="text-sm">{date}</p>
      </div>
      <div className="col-span-1">
        <p className="text-sm font-medium">{amount}</p>
      </div>
      <div className="col-span-1 flex justify-end">
        <span className={`rounded-full px-2 py-0.5 text-xs ${statusColors[status]}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
    </div>
  );
};

export default function VendorDashboardPage() {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8">
      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl font-bold">Welcome back, Vendor</h1>
        <p className="text-muted-foreground">Here&apos;s an overview of your stores&apos; performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard 
          title="Total Revenue"
          value="$12,543.00"
          change="12.3%"
          icon={CreditCard}
          changeDirection="up"
          iconColor="bg-primary"
        />
        <DashboardCard 
          title="Total Orders"
          value="234"
          change="5.2%"
          icon={ShoppingCart}
          changeDirection="up"
          iconColor="bg-blue-500"
        />
        <DashboardCard 
          title="Total Products"
          value="45"
          change="2.1%"
          icon={Boxes}
          changeDirection="up"
          iconColor="bg-purple-500"
        />
        <DashboardCard 
          title="Total Customers"
          value="1,254"
          change="8.4%"
          icon={Users}
          changeDirection="up"
          iconColor="bg-green-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 rounded-xl border bg-card shadow-sm overflow-hidden">
          <div className="p-4 md:p-6 border-b">
            <h2 className="text-xl font-semibold">Sales Overview</h2>
            <p className="text-sm text-muted-foreground">Monthly revenue and order count</p>
          </div>
          <div className="p-4 md:p-6">
            <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-8 w-8 text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">Chart visualization goes here</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
          <div className="p-4 md:p-6 border-b">
            <h2 className="text-xl font-semibold">Store Performance</h2>
            <p className="text-sm text-muted-foreground">Revenue by store</p>
          </div>
          <div className="p-4 md:p-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">My Digital Store</span>
                  <span className="text-sm font-medium">$8,245.00</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "65%" }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Software Hub</span>
                  <span className="text-sm font-medium">$4,298.00</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: "35%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <div className="p-4 md:p-6 border-b flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Recent Orders</h2>
            <p className="text-sm text-muted-foreground">Your latest 5 orders across all stores</p>
          </div>
          <a href="/vendor/orders" className="text-sm text-primary hover:underline">
            View all
          </a>
        </div>
        <div className="space-y-2 p-4 md:p-6">
          <RecentOrderCard
            id="ORD-2453"
            product="Premium Theme Bundle"
            customer="John Doe"
            date="May 20, 2024"
            amount="$59.99"
            status="completed"
          />
          <RecentOrderCard
            id="ORD-2452"
            product="E-commerce Starter Kit"
            customer="Jane Smith"
            date="May 19, 2024"
            amount="$89.99"
            status="completed"
          />
          <RecentOrderCard
            id="ORD-2451"
            product="UI Component Library"
            customer="Adam Johnson"
            date="May 18, 2024"
            amount="$129.99"
            status="processing"
          />
          <RecentOrderCard
            id="ORD-2450"
            product="Digital Marketing Guide"
            customer="Sarah Williams"
            date="May 17, 2024"
            amount="$49.99"
            status="completed"
          />
          <RecentOrderCard
            id="ORD-2449"
            product="Design System Pro"
            customer="Robert Brown"
            date="May 16, 2024"
            amount="$149.99"
            status="refunded"
          />
        </div>
      </div>
    </div>
  );
}

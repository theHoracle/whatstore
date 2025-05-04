import type { Metadata } from "next";
import { CalendarIcon, Filter, MoreHorizontal, Search } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Orders Management | WhatStore Vendor",
  description: "Track, process, and manage customer orders for your digital products.",
  robots: "noindex, nofollow", // Dashboard pages should be private
  openGraph: {
    title: "Orders Management | WhatStore Vendor",
    description: "Track, process, and manage customer orders for your digital products.",
  }
};

// Sample order data
const orders = [
  {
    id: "ORD-2453",
    customer: {
      name: "John Doe",
      email: "john.doe@example.com",
    },
    product: "Premium Theme Bundle",
    store: "My Digital Store",
    date: "May 20, 2024",
    amount: "$59.99",
    status: "completed",
  },
  {
    id: "ORD-2452",
    customer: {
      name: "Jane Smith",
      email: "jane.smith@example.com",
    },
    product: "E-commerce Starter Kit",
    store: "My Digital Store",
    date: "May 19, 2024",
    amount: "$89.99",
    status: "completed",
  },
  {
    id: "ORD-2451",
    customer: {
      name: "Adam Johnson",
      email: "adam.j@example.com",
    },
    product: "UI Component Library",
    store: "Software Hub",
    date: "May 18, 2024",
    amount: "$129.99",
    status: "processing",
  },
  {
    id: "ORD-2450",
    customer: {
      name: "Sarah Williams",
      email: "sarah.w@example.com",
    },
    product: "Digital Marketing Guide",
    store: "My Digital Store",
    date: "May 17, 2024",
    amount: "$49.99",
    status: "completed",
  },
  {
    id: "ORD-2449",
    customer: {
      name: "Robert Brown",
      email: "robert.b@example.com",
    },
    product: "Design System Pro",
    store: "Software Hub",
    date: "May 16, 2024",
    amount: "$149.99",
    status: "refunded",
  },
  {
    id: "ORD-2448",
    customer: {
      name: "Emily Davis",
      email: "emily.d@example.com",
    },
    product: "Photography Presets Pack",
    store: "My Digital Store",
    date: "May 15, 2024",
    amount: "$29.99",
    status: "processing",
  },
  {
    id: "ORD-2447",
    customer: {
      name: "Michael Wilson",
      email: "michael.w@example.com",
    },
    product: "Social Media Templates",
    store: "My Digital Store",
    date: "May 14, 2024",
    amount: "$19.99",
    status: "completed",
  },
  {
    id: "ORD-2446",
    customer: {
      name: "Jennifer Lee",
      email: "jennifer.l@example.com",
    },
    product: "SEO Strategy Guide",
    store: "My Digital Store",
    date: "May 13, 2024",
    amount: "$44.99",
    status: "pending",
  },
];

export default function OrdersPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Orders</h1>
          <p className="text-muted-foreground">Track and manage customer orders across all stores</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search by order ID, product, or customer..." 
            className="w-full pl-10 h-10 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" 
          />
        </div>
        <button className="inline-flex items-center h-10 px-4 rounded-md border bg-background text-sm hover:bg-muted transition-colors duration-200">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </button>
        <div className="inline-flex items-center h-10 px-4 rounded-md border bg-background text-sm cursor-pointer">
          <CalendarIcon className="mr-2 h-4 w-4" />
          <span>Last 30 days</span>
        </div>
        <select className="h-10 rounded-md border bg-background text-sm px-3 focus:outline-none focus:ring-2 focus:ring-ring appearance-none">
          <option value="all">All Stores</option>
          <option value="digital-store">My Digital Store</option>
          <option value="software-hub">Software Hub</option>
        </select>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="flex flex-col gap-1 rounded-xl border bg-card p-5 shadow-sm">
          <span className="text-sm text-muted-foreground">Total Orders</span>
          <span className="text-2xl font-bold">234</span>
          <span className="text-xs text-muted-foreground">Last 30 days</span>
        </div>
        <div className="flex flex-col gap-1 rounded-xl border bg-card p-5 shadow-sm">
          <span className="text-sm text-muted-foreground">Completed</span>
          <span className="text-2xl font-bold">198</span>
          <span className="text-xs text-green-500">84.6% of total</span>
        </div>
        <div className="flex flex-col gap-1 rounded-xl border bg-card p-5 shadow-sm">
          <span className="text-sm text-muted-foreground">Processing</span>
          <span className="text-2xl font-bold">28</span>
          <span className="text-xs text-amber-500">12% of total</span>
        </div>
        <div className="flex flex-col gap-1 rounded-xl border bg-card p-5 shadow-sm">
          <span className="text-sm text-muted-foreground">Refunded</span>
          <span className="text-2xl font-bold">8</span>
          <span className="text-xs text-red-500">3.4% of total</span>
        </div>
      </div>

      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-muted/40">
              <tr>
                <th className="py-3 px-4 text-left font-medium text-sm text-muted-foreground">Order</th>
                <th className="py-3 px-4 text-left font-medium text-sm text-muted-foreground">Customer</th>
                <th className="py-3 px-4 text-left font-medium text-sm text-muted-foreground">Product</th>
                <th className="py-3 px-4 text-left font-medium text-sm text-muted-foreground">Store</th>
                <th className="py-3 px-4 text-left font-medium text-sm text-muted-foreground">Date</th>
                <th className="py-3 px-4 text-left font-medium text-sm text-muted-foreground">Amount</th>
                <th className="py-3 px-4 text-left font-medium text-sm text-muted-foreground">Status</th>
                <th className="py-3 px-4 text-left font-medium text-sm text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-muted/50 transition-colors">
                  <td className="py-3 px-4">
                    <Link 
                      href={`/vendor/orders/${order.id}`}
                      className="font-medium text-primary hover:underline"
                    >
                      {order.id}
                    </Link>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{order.customer.name}</span>
                      <span className="text-xs text-muted-foreground">{order.customer.email}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm font-medium">{order.product}</td>
                  <td className="py-3 px-4 text-sm">{order.store}</td>
                  <td className="py-3 px-4 text-sm">{order.date}</td>
                  <td className="py-3 px-4 text-sm font-medium">{order.amount}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      order.status === 'completed' ? 'bg-green-500/10 text-green-500' : 
                      order.status === 'processing' ? 'bg-amber-500/10 text-amber-500' :
                      order.status === 'refunded' ? 'bg-red-500/10 text-red-500' :
                      'bg-blue-500/10 text-blue-500'
                    }`}>
                      <span className={`mr-1 h-2 w-2 rounded-full ${
                        order.status === 'completed' ? 'bg-green-500' :
                        order.status === 'processing' ? 'bg-amber-500' :
                        order.status === 'refunded' ? 'bg-red-500' :
                        'bg-blue-500'
                      }`}></span>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-4 py-3 border-t">
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-medium">1</span> to <span className="font-medium">8</span> of <span className="font-medium">234</span> orders
          </div>
          <div className="flex items-center space-x-2">
            <button 
              className="inline-flex items-center justify-center h-8 w-8 rounded-md border bg-background text-sm text-muted-foreground hover:bg-muted"
            >
              &lt;
            </button>
            <button 
              className="inline-flex items-center justify-center h-8 w-8 rounded-md border bg-primary text-primary-foreground text-sm"
            >
              1
            </button>
            <button 
              className="inline-flex items-center justify-center h-8 w-8 rounded-md border bg-background text-sm text-muted-foreground hover:bg-muted"
            >
              2
            </button>
            <button 
              className="inline-flex items-center justify-center h-8 w-8 rounded-md border bg-background text-sm text-muted-foreground hover:bg-muted"
            >
              3
            </button>
            <span className="text-sm text-muted-foreground">...</span>
            <button 
              className="inline-flex items-center justify-center h-8 w-8 rounded-md border bg-background text-sm text-muted-foreground hover:bg-muted"
            >
              30
            </button>
            <button 
              className="inline-flex items-center justify-center h-8 w-8 rounded-md border bg-background text-sm text-muted-foreground hover:bg-muted"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 
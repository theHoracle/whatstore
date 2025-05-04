import type { Metadata } from "next";
import { CheckCircle, Filter, MoreHorizontal, Plus, Search, X } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Products Management | WhatStore Vendor",
  description: "Manage your digital products, add new items, update listings, and track inventory.",
  robots: "noindex, nofollow", // Dashboard pages should be private
  openGraph: {
    title: "Products Management | WhatStore Vendor",
    description: "Manage your digital products, add new items, update listings, and track inventory.",
  }
};

// Sample product data for the table
const products = [
  {
    id: "PROD-001",
    name: "Premium WordPress Theme",
    category: "Website Templates",
    store: "My Digital Store",
    price: "$59.99",
    sales: 124,
    status: "active",
    featured: true,
  },
  {
    id: "PROD-002",
    name: "Digital Marketing Guide",
    category: "E-books",
    store: "My Digital Store",
    price: "$39.99",
    sales: 87,
    status: "active",
    featured: false,
  },
  {
    id: "PROD-003",
    name: "UI Component Library",
    category: "UI Kits",
    store: "Software Hub",
    price: "$79.99",
    sales: 56,
    status: "active",
    featured: true,
  },
  {
    id: "PROD-004",
    name: "Photography Presets Pack",
    category: "Graphics",
    store: "My Digital Store",
    price: "$29.99",
    sales: 215,
    status: "active",
    featured: false,
  },
  {
    id: "PROD-005",
    name: "React Admin Dashboard",
    category: "Web Apps",
    store: "Software Hub",
    price: "$99.99",
    sales: 38,
    status: "draft",
    featured: false,
  },
  {
    id: "PROD-006",
    name: "Social Media Templates",
    category: "Graphics",
    store: "My Digital Store",
    price: "$19.99",
    sales: 182,
    status: "active",
    featured: true,
  },
  {
    id: "PROD-007",
    name: "SEO Strategy Guide",
    category: "E-books",
    store: "My Digital Store",
    price: "$44.99",
    sales: 62,
    status: "active",
    featured: false,
  },
];

export default function ProductsPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-muted-foreground">Manage your digital products across all stores</p>
        </div>
        <Link 
          href="/vendor/products/new"
          className="inline-flex items-center justify-center h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 
          rounded-md text-sm font-medium transition-all duration-200 shadow-sm hover:shadow
          active:scale-[0.98]"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search products..." 
            className="w-full pl-10 h-10 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" 
          />
        </div>
        <button className="inline-flex items-center h-10 px-4 rounded-md border bg-background text-sm hover:bg-muted transition-colors duration-200">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </button>
        <select className="h-10 rounded-md border bg-background text-sm px-3 focus:outline-none focus:ring-2 focus:ring-ring appearance-none">
          <option value="all">All Stores</option>
          <option value="digital-store">My Digital Store</option>
          <option value="software-hub">Software Hub</option>
        </select>
      </div>

      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-muted/40">
              <tr>
                <th className="py-3 px-4 text-left font-medium text-sm text-muted-foreground">Name</th>
                <th className="py-3 px-4 text-left font-medium text-sm text-muted-foreground">Store</th>
                <th className="py-3 px-4 text-left font-medium text-sm text-muted-foreground">Category</th>
                <th className="py-3 px-4 text-left font-medium text-sm text-muted-foreground">Price</th>
                <th className="py-3 px-4 text-left font-medium text-sm text-muted-foreground">Sales</th>
                <th className="py-3 px-4 text-left font-medium text-sm text-muted-foreground">Status</th>
                <th className="py-3 px-4 text-left font-medium text-sm text-muted-foreground">Featured</th>
                <th className="py-3 px-4 text-left font-medium text-sm text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b hover:bg-muted/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded bg-muted flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">{product.id.slice(-3)}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium">{product.name}</span>
                        <span className="text-xs text-muted-foreground">{product.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm">{product.store}</td>
                  <td className="py-3 px-4 text-sm">{product.category}</td>
                  <td className="py-3 px-4 text-sm font-medium">{product.price}</td>
                  <td className="py-3 px-4 text-sm">{product.sales}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      product.status === 'active' 
                        ? 'bg-green-500/10 text-green-500' 
                        : 'bg-amber-500/10 text-amber-500'
                    }`}>
                      {product.status === 'active' ? 
                        <CheckCircle className="mr-1 h-3 w-3" /> : 
                        <span className="mr-1 h-3 w-3 rounded-full bg-amber-500"></span>
                      }
                      {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    {product.featured ? 
                      <span className="text-primary">Yes</span> : 
                      <span className="text-muted-foreground">No</span>
                    }
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
            Showing <span className="font-medium">1</span> to <span className="font-medium">7</span> of <span className="font-medium">7</span> products
          </div>
          <div className="flex items-center space-x-2">
            <button 
              className="inline-flex items-center justify-center h-8 w-8 rounded-md border bg-background text-sm text-muted-foreground hover:bg-muted disabled:opacity-50 disabled:pointer-events-none"
              disabled
            >
              &lt;
            </button>
            <button 
              className="inline-flex items-center justify-center h-8 w-8 rounded-md border bg-primary text-primary-foreground text-sm"
            >
              1
            </button>
            <button 
              className="inline-flex items-center justify-center h-8 w-8 rounded-md border bg-background text-sm text-muted-foreground hover:bg-muted disabled:opacity-50 disabled:pointer-events-none"
              disabled
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 
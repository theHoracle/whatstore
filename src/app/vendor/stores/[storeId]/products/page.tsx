"use client";

import { Filter, MoreHorizontal, Plus, Search } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useStoreCatalog } from "@/hooks/use-vendor-stores";

export default function StoreProductsPage() {
  const params = useParams();
  const storeId = parseInt(params.storeId as string);
  const { data, isLoading, error } = useStoreCatalog(storeId);
  const catalog = data?.data;

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Store Products</h1>
          <p className="text-muted-foreground">Manage products for this store</p>
        </div>
        <Link 
          href={`/vendor/stores/${storeId}/products/new`}
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
            placeholder="Search store products..." 
            className="w-full pl-10 h-10 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" 
          />
        </div>
        <button className="inline-flex items-center h-10 px-4 rounded-md border bg-background text-sm hover:bg-muted transition-colors duration-200">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </button>
      </div>

      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="p-8 text-center text-muted-foreground">Loading products...</div>
          ) : error ? (
            <div className="p-8 text-center text-red-500">
              {error instanceof Error ? error.message : "Failed to load products"}
            </div>
          ) : (
            <table className="w-full">
              <thead className="border-b bg-muted/40">
                <tr>
                  <th className="py-3 px-4 text-left font-medium text-sm text-muted-foreground">Name</th>
                  <th className="py-3 px-4 text-left font-medium text-sm text-muted-foreground">Category</th>
                  <th className="py-3 px-4 text-left font-medium text-sm text-muted-foreground">Price</th>
                  <th className="py-3 px-4 text-left font-medium text-sm text-muted-foreground">Stock</th>
                  <th className="py-3 px-4 text-left font-medium text-sm text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {catalog && (catalog.products.length === 0 && catalog.services.length === 0) ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-muted-foreground">No item found in this store.</td>
                  </tr>
                ) : (
                  catalog?.products?.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex flex-col">
                          <span className="font-medium">{product.name}</span>
                          <span className="text-xs text-muted-foreground">ID: {product.id}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">{product.category}</td>
                      <td className="py-3 px-4 text-sm font-medium">{product.price} {product.currency}</td>
                      <td className="py-3 px-4 text-sm">{product.stock}</td>
                      <td className="py-3 px-4">
                        <button className="text-muted-foreground hover:text-foreground transition-colors">
                          <MoreHorizontal className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
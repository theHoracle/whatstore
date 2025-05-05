"use client";

import { Filter, MoreHorizontal, Package, Plus, Search, Wrench } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useStoreCatalog } from "@/hooks/use-vendor-stores";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function StoreCatalogPage() {
  const params = useParams();
  const storeId = parseInt(params.storeId as string);
  const { data, isLoading, error } = useStoreCatalog(storeId);
  const products = data?.data?.products || [];
  const services = data?.data?.services || [];
  const [activeTab, setActiveTab] = useState<"products" | "services">(
    products.length > 0 ? "products" : "services"
  );

  const showTabs = products.length > 0 && services.length > 0;

  const renderProductsTable = () => (
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
        {products.length === 0 ? (
          <tr>
            <td colSpan={5} className="py-8 text-center text-muted-foreground">No products found in this store.</td>
          </tr>
        ) : (
          products.map((product) => (
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
  );

  const renderServicesTable = () => (
    <table className="w-full">
      <thead className="border-b bg-muted/40">
        <tr>
          <th className="py-3 px-4 text-left font-medium text-sm text-muted-foreground">Name</th>
          <th className="py-3 px-4 text-left font-medium text-sm text-muted-foreground">Description</th>
          <th className="py-3 px-4 text-left font-medium text-sm text-muted-foreground">Rate</th>
          <th className="py-3 px-4 text-left font-medium text-sm text-muted-foreground">Actions</th>
        </tr>
      </thead>
      <tbody>
        {services.length === 0 ? (
          <tr>
            <td colSpan={4} className="py-8 text-center text-muted-foreground">No services found in this store.</td>
          </tr>
        ) : (
          services.map((service) => (
            <tr key={service.id} className="border-b hover:bg-muted/50 transition-colors">
              <td className="py-3 px-4">
                <div className="flex flex-col">
                  <span className="font-medium">{service.name}</span>
                  <span className="text-xs text-muted-foreground">ID: {service.id}</span>
                </div>
              </td>
              <td className="py-3 px-4 text-sm">{service.description}</td>
              <td className="py-3 px-4 text-sm font-medium">{service.rate} {service.currency}</td>
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
  );

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      {isLoading ? (
        <div className="h-[400px] flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-muted-foreground">Loading store catalog...</p>
          </div>
        </div>
      ) : error ? (
        <div className="h-[400px] flex items-center justify-center">
          <div className="flex flex-col items-center gap-2 text-red-500">
            <p className="text-lg font-medium">Failed to load catalog</p>
            <p className="text-sm text-muted-foreground">{error instanceof Error ? error.message : "Please try again later"}</p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Store Catalog</h1>
              <p className="text-muted-foreground">Manage products and services for this store</p>
            </div>
            <Link 
              href={`/vendor/stores/${storeId}/${activeTab === "products" ? "products" : "services"}/new`}
              className="inline-flex items-center justify-center h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 
              rounded-md text-sm font-medium transition-all duration-200 shadow-sm hover:shadow
              active:scale-[0.98]"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add {activeTab === "products" ? "Product" : "Service"}
            </Link>
          </div>

          {showTabs && (
            <Tabs defaultValue={activeTab} className="w-full" onValueChange={(value) => setActiveTab(value as "products" | "services")}>
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="products" className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Products
                </TabsTrigger>
                <TabsTrigger value="services" className="flex items-center gap-2">
                  <Wrench className="h-4 w-4" />
                  Services
                </TabsTrigger>
              </TabsList>

              <TabsContent value="products" className="space-y-4">
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
                </div>

                <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    {renderProductsTable()}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="services" className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input 
                      type="text" 
                      placeholder="Search services..." 
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
                    {renderServicesTable()}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}

          {!showTabs && (
            <>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder={`Search ${products.length > 0 ? 'products' : 'services'}...`}
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
                  {products.length > 0 ? renderProductsTable() : renderServicesTable()}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
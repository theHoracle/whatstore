"use client";
import type { Metadata } from "next";
import { Building, MoreHorizontal, Package, Pencil, Plus, Store, Trash2 } from "lucide-react";
import Link from "next/link";
import { useVendorStores } from "@/hooks/use-vendor-stores";
import { useAuth } from "@/hooks/use-auth";
import { useVendorState } from "@/hooks/use-vendor-state";
import { useEffect } from "react";

export default function StoresPage() {
  const user = useAuth();
  const { data: stores, isLoading, error } = useVendorStores(user.data?.vendor?.id || 1);
  const { setVendorState, setActiveStore } = useVendorState();

  useEffect(() => {
    // Store vendor in localStorage when loaded
    if (user.data?.vendor) {
      setVendorState(user.data.vendor);
    }
  }, [user.data?.vendor]);

  const handleStoreSelect = (storeId: number) => {
    setActiveStore(storeId);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Stores Management</h1>
          <p className="text-muted-foreground">Create and manage your digital storefronts</p>
        </div>
        <Link 
          href="/vendor/stores/new"
          className="inline-flex items-center justify-center h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 
          rounded-md text-sm font-medium transition-all duration-200 shadow-sm hover:shadow
          active:scale-[0.98]"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Store
        </Link>
      </div>

      {isLoading ? (
        <div className="text-center text-muted-foreground">Loading stores...</div>
      ) : error ? (
        <div className="text-center text-red-500">
          {error instanceof Error ? error.message : "Failed to load stores"}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {stores?.map((store) => (
            <div key={store.id} className="rounded-xl border bg-card shadow-sm overflow-hidden">
              <div className="p-5 border-b flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-md flex items-center justify-center bg-primary/10`}>
                    <Store className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{store.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {store.storeUrl}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/vendor/stores/${store.id}/edit`}
                    className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-muted transition-colors"
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <button className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-muted transition-colors">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="p-5">
                <p className="text-sm mb-4">{store.description}</p>
                
                <div className="grid grid-cols-3 gap-2 mb-6">
                  <div className="p-3 bg-muted/40 rounded-lg">
                    <p className="text-xs text-muted-foreground">Catalog Items</p>
                    <div className="flex items-baseline gap-1">
                      <p className="text-lg font-semibold">{(store.products?.length || 0) + (store.services?.length || 0)}</p>
                      <span className="text-xs text-muted-foreground">
                        ({store.products?.length || 0}P/{store.services?.length || 0}S)
                      </span>
                    </div>
                  </div>
                  <div className="p-3 bg-muted/40 rounded-lg">
                    <p className="text-xs text-muted-foreground">Orders</p>
                    <p className="text-lg font-semibold">{store.orders?.length || 0}</p>
                  </div>
                  <div className="p-3 bg-muted/40 rounded-lg">
                    <p className="text-xs text-muted-foreground">Revenue</p>
                    <p className="text-lg font-semibold">${"0.00"}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t pt-4">
                  <div className="flex items-center">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-500/10 text-green-500 mr-3`}>
                      <span className="mr-1 h-2 w-2 rounded-full bg-green-500"></span>
                      {"Active"}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Created on {new Date(store.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Link 
                      href={`/vendor/stores/${store.id}/catalog`}
                      className="flex items-center justify-center h-9 px-3 rounded-md border hover:bg-muted/80 transition-colors text-sm"
                    >
                      <Package className="mr-1 h-4 w-4" />
                      Catalog
                    </Link>
                    <button 
                      onClick={() => handleStoreSelect(store.id)}
                      className="flex items-center justify-center h-9 px-3 rounded-md border bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm"
                    >
                      <Building className="mr-1 h-4 w-4" />
                      Select Store
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="rounded-xl border bg-card p-8 flex flex-col items-center justify-center text-center">
        <div className="h-14 w-14 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
          <Plus className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Create a New Store</h3>
        <p className="text-muted-foreground mb-4 max-w-md">
          Expand your digital business by creating a new specialty store for different product lines or target audiences.
        </p>
        <Link 
          href="/vendor/stores/new"
          className="inline-flex items-center justify-center h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 
          rounded-md text-sm font-medium transition-all duration-200 shadow-sm hover:shadow
          active:scale-[0.98]"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Store
        </Link>
      </div>
    </div>
  );
}
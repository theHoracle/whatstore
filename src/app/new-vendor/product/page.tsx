import { FirstProductForm } from "@/features/vendors/onboarding/components/first-product-form";

export default function ProductPage() {
  return (
    <div className="relative h-lvh">
    
      <h1 className="text-4xl md:text-6xl capitalize leading-tight tracking-tight font-extrabold text-center">
           Add First Product to Your Store
      </h1>
     <div className="p-1 md:p-6 lg:p-8">
        <FirstProductForm />
      </div>     
    </div>
  );
}

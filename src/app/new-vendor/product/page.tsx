import { FirstProductForm } from "@/features/vendors/onboarding/components/first-product-form";

export default function ProductPage() {
  // get storeID from URL
  return (
    <div className="text-slate-100 flex flex-col items-center">
      <div className="">
        <h1 className="text-7xl capitalize leading-tight tracking-tight font-extrabold text-center text-wrap">
          Add your first product
        </h1>
        <div className="size-full py-20">
          <div className="border border-slate-400 bg-slate-900 rounded-2xl px-12 py-8 w-2/3 mx-auto">
            <FirstProductForm />
          </div>
        </div>
      </div>
    </div>
  );
}

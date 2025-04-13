import { VendorInfoForm } from "@/features/vendors/onboarding/components/vendor-info-form";


export default function Page() {
  return (
    <div className="text-slate-100 flex flex-col items-center">
      <div className="">  
      <h1 className="text-4xl md:text-6xl lg:text-7xl capitalize leading-tight tracking-tight font-extrabold text-center">
         Become a Vendor 
        </h1>
        <p className="mt-4 text-lg text-center text-slate-400 max-w-2xl mx-auto">
         Click the button to become a Vendor
        </p>
          <div className="">
            <VendorInfoForm />
          </div> 
      </div>
    </div>
  );
}

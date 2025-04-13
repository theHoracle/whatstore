import { StorePreferencesForm } from "@/features/vendors/onboarding/components/store-preferences-form";

export default function StorePage() {
  return (
    <div className="text-slate-100 flex flex-col items-center">
      <div className="">
        <h1 className="text-7xl capitalize leading-tight tracking-tight font-extrabold text-center text-wrap">
          Setup your store
        </h1>
        <div className="size-full py-8">
        
            <StorePreferencesForm />
        
        </div>
      </div>
    </div>
  );
}

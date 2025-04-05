import { StorePreferencesForm } from "@/features/vendors/onboarding/components/store-preferences-form";

export default function StorePage() {
  return (
    <div className="text-slate-100 flex flex-col items-center">
      <div className="">
        <h1 className="text-7xl capitalize leading-tight tracking-tight font-extrabold text-center text-wrap">
          Setup your store
        </h1>
        <div className="size-full py-20">
          <div className="border border-slate-400 bg-slate-900 rounded-2xl px-12 py-8 w-2/3 mx-auto">
            <StorePreferencesForm />
          </div>
        </div>
      </div>
    </div>
  );
}

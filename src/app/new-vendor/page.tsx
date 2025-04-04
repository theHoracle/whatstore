import { VendorInfoForm } from "@/features/vendors/onboarding/components/vendor-info-form";


export default function Page() {
  return (
    <div className="text-slate-100 flex flex-col items-center">
      <div className="">
        <h1 className="text-7xl capitalize leading-tight tracking-tight font-extrabold text-center text-wrap">
          Create your vendor profile
        </h1>
        <div className="size-full py-20">
          <div className="border border-slate-400 bg-slate-900 rounded-2xl px-12 py-8 w-2/3 mx-auto">
            <VendorInfoForm />
          </div>
        </div>
      </div>
    </div>
  );
}

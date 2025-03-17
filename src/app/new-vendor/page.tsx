import { OnboardingForm } from "@/features/vendors/onboarding/components/onboarding-form";

const NewVendorPage = () => {
  return (
    <div className="text-slate-100 flex flex-col items-center">
      {/* we would have a multi page form or something */}
      <div className="">
        <h1 className="text-7xl capitalize leading-tight tracking-tight font-extrabold text-center text-wrap ">
          Put your business on the internet
        </h1>
        <div className="size-full py-20">
          <div className="border border-slate-400 bg-slate-900 rounded-2xl px-12 py-8 w-2/3 mx-auto">
            <OnboardingForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewVendorPage;

"use client"
import { Progress } from "@/components/ui/progress"
import { useOnboardingStore } from "@/features/vendors/onboarding/store"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

const OnboardingLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const setStep = useOnboardingStore((state) => state.setStep);
  const step = useOnboardingStore((state) => state.step);

  useEffect(() => {
    // Set the step based on the current route
    if (pathname === '/new-vendor') {
      setStep(1);
    } else if (pathname === '/new-vendor/store') {
      setStep(2);
    } else if (pathname === '/new-vendor/product') {
      setStep(3);
    }
  }, [pathname, setStep]);

  return (
    <div className="relative h-lvh">
      <div className="bg-gradient-to-b from-black via-purple-900/20 to-cyan-900/30 absolute inset-0 animate-gradient-pulse">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        <div className="relative z-10">
          <div className="max-w-4xl mx-auto p-4">
            <div className="backdrop-blur-xl mt-14 rounded-xl border border-purple-500/20 shadow-[0_0_30px_rgba(139,92,246,0.2)]">
            
              <div className="relative px-8 py-6">
                <div className="absolute inset-0 bg-black/40 backdrop-blur-xl rounded-t-xl" />
                <div className="relative">
                  <Progress 
                    value={(step / 3) * 100} 
                    className="h-3 overflow-hidden w-full bg-black/75 rounded-full border border-purple-500/20 shadow-[inset_0_1px_4px_rgba(0,0,0,0.4)] backdrop-blur-sm"
                    style={{
                      background: 'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(31,41,55,0.4) 100%)',
                    }}
                  />
            
                  <div className="mt-2 flex justify-between text-xs text-slate-400">
                    <div className={`transition-colors ${step >= 1 ? 'text-cyan-400' : ''}`}>Profile</div>
                    <div className={`transition-colors ${step >= 2 ? 'text-cyan-400' : ''}`}>Store</div>
                    <div className={`transition-colors ${step >= 3 ? 'text-cyan-400' : ''}`}>Product</div>
                  </div>
                </div>
              </div>
              <div className="p-8">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingLayout;

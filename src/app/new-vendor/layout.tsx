"use client"
import { Progress } from "@/components/ui/progress"
import { useOnboardingStore } from "@/features/vendors/onboarding/store"

const OnboardingLayout = ({ children }: { children: React.ReactNode }) => {
  const step = useOnboardingStore((state) => state.step);

  return (
    <div className="relative h-lvh">
      <div className="bg-gradient-to-b from-black via-purple-900/20 to-cyan-900/30 absolute inset-0 animate-gradient-pulse">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        <div className="relative z-10">
          <div className="max-w-4xl mx-auto pt-8 px-4">
            <Progress 
              value={(step / 3) * 100} 
              className="mb-8 h-2 overflow-hidden bg-black/50 border border-purple-500/20 shadow-[0_0_15px_rgba(139,92,246,0.3)]"
            />
            <div className="backdrop-blur-xl bg-black/30 rounded-2xl border border-purple-500/20 p-8 shadow-[0_0_30px_rgba(139,92,246,0.2)]">
              <div className="my-4">
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

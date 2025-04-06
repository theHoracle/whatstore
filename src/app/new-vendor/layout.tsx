"use client"
import { Progress } from "@/components/ui/progress"
import { useOnboardingStore } from "@/features/vendors/onboarding/store"

const OnboardingLayout = ({ children }: { children: React.ReactNode }) => {
  const step = useOnboardingStore((state) => state.step);

  return (
    <div className="relative h-lvh">
      <div className="bg-gradient-to-b from-black via-[#000000] via-[70%] to-[#005c4b] absolute inset-0">
        <div className="max-w-4xl mx-auto pt-8">
          <Progress value={(step / 3) * 100} className="mb-8" />
        </div>
        <div className="my-20 mx-auto font-[family-name:var(--font-geist-sans)]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default OnboardingLayout;

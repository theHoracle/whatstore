const OnboardingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative h-lvh">
      <div className="bg-gradient-to-b from-black via-[#000000] via-[70%] to-[#005c4b] absolute inset-0">
        <div className=" my-20 mx-auto font-[family-name:var(--font-geist-sans)]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default OnboardingLayout;

const OnboardingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen h-screen bg-gradient-to-b from-black via-[#000000] via-[70%] to-[#005c4b] relative">
      <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      <div className="container  my-20 mx-auto font-[family-name:var(--font-geist-sans)]">
        {children}
      </div>
    </div>
  );
};

export default OnboardingLayout;

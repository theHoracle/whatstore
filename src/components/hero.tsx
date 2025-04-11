const Hero = () => {
  return (
    <div className="h-[calc(100lvh-64px)] w-full bg-zinc-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="w-[500px] h-14 px-6 rounded-xl bg-zinc-900 
            shadow-[inset_-2px_-2px_4px_rgba(255,255,255,0.1),inset_2px_2px_4px_rgba(0,0,0,0.5)]
            text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-700
            transition-all duration-300"
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2">
            <svg
              className="w-5 h-5 text-zinc-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
        <a
          href="/become-vendor"
          className="text-zinc-600 hover:text-zinc-500 transition-colors duration-300
          px-6 py-2 rounded-lg
          shadow-[-2px_-2px_4px_rgba(255,255,255,0.1),2px_2px_4px_rgba(0,0,0,0.5)]"
        >
          Become a vendor
        </a>
      </div>
    </div>
  );
};

export default Hero;

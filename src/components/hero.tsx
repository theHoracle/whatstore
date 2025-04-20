import { Search } from "lucide-react";
import MaxWidthWrapper from "./MaxWidthWrapper";

const Hero = () => {
  return (
    <section className="relative w-full h-[calc(100lvh-50px)] -mt-10 overflow-hidden border-b bg-background py-20 sm:py-32">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      
      <MaxWidthWrapper>
        <div className="flex flex-col items-center gap-8 text-center">
          <div className="space-y-4 max-w-[800px]">
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full font-medium">
                Launch Your Digital Store Today
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              Discover Amazing Products
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground text-lg md:text-xl">
              Your one-stop marketplace for digital products. Find software, themes, digital art, and more from trusted vendors worldwide.
            </p>
          </div>
          
          <div className="relative w-full max-w-[500px] group">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full h-12 px-6 rounded-full bg-background/50 
              border border-border shadow-sm
              text-foreground focus:outline-none focus:ring-2 focus:ring-ring
              transition-all duration-300"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
              <Search className="size-5" />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-center z-10">
            <a
              href="/new-vendor"
              className="inline-flex items-center justify-center h-10 px-5 py-2 bg-primary text-primary-foreground hover:bg-primary/90 
              rounded-full text-sm font-medium transition-all duration-200 shadow-sm hover:shadow
              active:scale-[0.98]"
            >
              Become a vendor
            </a>
            <a
              href="/products"
              className="inline-flex items-center justify-center h-10 px-5 py-2
              text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200
              hover:bg-muted rounded-full"
            >
              Browse products
            </a>
          </div>
        </div>
      </MaxWidthWrapper>

      {/* Bottom fade effect */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;

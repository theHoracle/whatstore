import { Terminal, Store, ShoppingCart, Shield, Zap, BarChart3 } from "lucide-react";

const features = [
  {
    title: "Quick Setup",
    description: "Get your online store up and running in minutes with our simple onboarding process.",
    icon: Zap,
    gradient: "from-amber-500 to-orange-500",
  },
  {
    title: "Secure Marketplace",
    description: "Enterprise-grade security protecting both sellers and buyers, with secure payment processing.",
    icon: Shield,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Smart Analytics",
    description: "Comprehensive insights and AI-powered recommendations to grow your business.",
    icon: BarChart3,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Easy Management",
    description: "Powerful tools to manage your products, services, orders, and customer relationships.",
    icon: Terminal,
    gradient: "from-green-500 to-emerald-500",
  },
  {
    title: "Flexible Store",
    description: "Sell anything - physical products, digital goods, or professional services, all in one place.",
    icon: Store,
    gradient: "from-red-500 to-pink-500",
  },
  {
    title: "Customer Experience",
    description: "Create seamless shopping experiences with customizable storefronts and easy checkout.",
    icon: ShoppingCart,
    gradient: "from-indigo-500 to-purple-500",
  },
];

export function Features() {
  return (
    <section id="features" className="container relative py-20 sm:py-32">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 -translate-x-1/2 h-[500px] w-[800px] bg-gradient-to-br from-primary/30 via-purple-500/20 to-blue-500/30 opacity-20 blur-[100px] rounded-full" />
      </div>
      
      <div className="relative">
        <div className="mx-auto max-w-2xl md:text-center">
          <div className="flex items-center justify-center">
            <span className="relative rounded-full px-3 py-1 text-sm leading-6 text-primary ring-1 ring-primary/20 hover:ring-primary/30">
              Everything you need to succeed
            </span>
          </div>
          <h2 className="mt-8 font-bold text-4xl sm:text-5xl lg:text-6xl">
            Powerful features for digital sellers
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            All the tools you need to manage, sell and grow your digital product business
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="relative overflow-hidden rounded-2xl border bg-background p-8 transition-all duration-300 hover:shadow-lg group"
              >
                <div className={`inline-flex rounded-xl p-3 bg-gradient-to-br ${feature.gradient}`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-6 font-semibold text-xl">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground">
                  {feature.description}
                </p>
                <div 
                  className={`absolute inset-0 opacity-0 mix-blend-overlay bg-gradient-to-br ${feature.gradient} transition-opacity duration-500 group-hover:opacity-10`} 
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <a
            href="/docs/features"
            className="inline-flex items-center justify-center h-10 px-5 py-2 bg-primary text-primary-foreground hover:bg-primary/90 
            rounded-full text-sm font-medium transition-all duration-200 shadow-sm hover:shadow
            active:scale-[0.98]"
          >
            View all features
          </a>
        </div>
      </div>
    </section>
  );
}
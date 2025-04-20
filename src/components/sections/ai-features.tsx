import { Brain, Sparkles, Target, Zap } from "lucide-react";

const features = [
  {
    name: "Smart Product Recommendations",
    description:
      "Our AI analyzes customer behavior to suggest products they're most likely to purchase, increasing your conversion rates.",
    icon: Brain,
  },
  {
    name: "Automated Content Generation",
    description:
      "Generate SEO-optimized product descriptions, marketing copy, and social media content with our AI assistant.",
    icon: Sparkles,
  },
  {
    name: "Intelligent Pricing Strategy",
    description:
      "Get AI-powered pricing recommendations based on market trends, competition, and demand patterns.",
    icon: Target,
  },
  {
    name: "Performance Analytics",
    description:
      "Advanced AI analytics provide deep insights into your store's performance and customer behavior.",
    icon: Zap,
  },
];

export function AIFeatures() {
  return (
    <section className="container relative py-20 sm:py-32">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[500px] bg-gradient-to-tr from-primary/30 via-purple-500/30 to-blue-500/30 opacity-20 blur-[100px] rounded-full" />
      </div>
      
      <div className="relative">
        <div className="mx-auto max-w-2xl md:text-center">
          <div className="flex items-center justify-center">
            <span className="relative rounded-full px-3 py-1 text-sm leading-6 text-primary ring-1 ring-primary/20 hover:ring-primary/30">
              AI-Powered Features
            </span>
          </div>
          <h2 className="mt-8 font-bold text-4xl sm:text-5xl lg:text-6xl">
            Smart tools for smart sellers
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Leverage the power of artificial intelligence to optimize your digital store and boost sales
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="relative overflow-hidden rounded-2xl border bg-background p-8 transition-shadow hover:shadow-lg"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-blue-500">
                  <feature.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="mt-6 text-xl font-semibold">{feature.name}</h3>
                <p className="mt-2 text-muted-foreground">
                  {feature.description}
                </p>
                <div className="absolute right-0 bottom-0 h-48 w-48 bg-gradient-to-tl from-purple-500/10 via-blue-500/10 to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100" />
              </div>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <a
              href="/docs/ai-features"
              className="inline-flex items-center justify-center rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"
            >
              Learn more about our AI features
              <Sparkles className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
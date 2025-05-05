import { Bot, Sparkles, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    title: "Smart Product Recommendations",
    description:
      "Our AI analyzes customer behavior to suggest the perfect products and services to the right customers, increasing your sales opportunities.",
    icon: Sparkles,
  },
  {
    title: "Intelligent Inventory Management",
    description:
      "AI-powered forecasting helps you maintain optimal stock levels for physical products and manage service availability efficiently.",
    icon: Bot,
  },
  {
    title: "Automated Customer Support",
    description:
      "Let AI handle common customer queries about your products and services, freeing up your time to focus on growing your business.",
    icon: Zap,
  },
];

export function AIFeatures() {
  return (
    <section className="container relative py-20 sm:py-32">
      <div className="absolute inset-0">
        <div className="absolute left-1/2 -translate-x-1/2 h-[500px] w-[800px] bg-gradient-to-br from-purple-500/30 via-primary/20 to-blue-500/30 opacity-20 blur-[100px] rounded-full" />
      </div>

      <div className="relative">
        <div className="mx-auto max-w-2xl md:text-center">
          <div className="flex items-center justify-center">
            <span className="relative rounded-full px-3 py-1 text-sm leading-6 text-primary ring-1 ring-primary/20 hover:ring-primary/30">
              AI-Powered Growth
            </span>
          </div>
          <h2 className="mt-8 font-bold text-4xl sm:text-5xl lg:text-6xl">
            Smart Tools for Modern Sellers
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Leverage AI to automate tasks, optimize your operations, and boost your sales performance
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="relative overflow-hidden border bg-background p-8"
              >
                <div className="mb-6 inline-flex rounded-xl p-3 bg-gradient-to-br from-purple-500 to-blue-500">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-xl">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
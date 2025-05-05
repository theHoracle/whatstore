import { Check } from "lucide-react";

const tiers = [
  {
    name: "Basic",
    id: "tier-basic",
    price: { monthly: "$0", annually: "$0" },
    description: "Perfect for starting your online selling journey",
    features: [
      "List up to 10 products or services",
      "Basic analytics",
      "Standard support",
      "Simple store customization",
      "Standard transaction fees",
    ],
    cta: "Start for free",
    href: "/signup",
    highlighted: false,
  },
  {
    name: "Pro",
    id: "tier-pro",
    price: { monthly: "$29", annually: "$290" },
    description: "For growing businesses ready to scale",
    features: [
      "Unlimited products and services",
      "Advanced analytics & insights",
      "Priority support",
      "Custom branding",
      "Reduced transaction fees",
      "Booking system for services",
      "Inventory management",
      "Marketing tools",
    ],
    cta: "Get started",
    href: "/signup?plan=pro",
    highlighted: true,
  },
  {
    name: "Enterprise",
    id: "tier-enterprise",
    price: { monthly: "$99", annually: "$990" },
    description: "Custom solutions for large businesses",
    features: [
      "Everything in Pro",
      "Multiple store management",
      "Custom API access",
      "Dedicated account manager",
      "Custom payment terms",
      "Advanced security features",
      "White-label solution",
      "24/7 phone support",
    ],
    cta: "Contact sales",
    href: "/contact-sales",
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="container relative py-20 sm:py-32">
      <div className="absolute inset-0">
        <div className="absolute right-1/2 translate-x-1/2 h-[500px] w-[800px] bg-gradient-to-br from-purple-500/30 via-primary/20 to-blue-500/30 opacity-20 blur-[100px] rounded-full" />
      </div>

      <div className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center">
            <span className="relative rounded-full px-3 py-1 text-sm leading-6 text-primary ring-1 ring-primary/20 hover:ring-primary/30">
              Simple, transparent pricing
            </span>
          </div>
          <h2 className="mt-8 font-bold text-4xl sm:text-5xl lg:text-6xl">
            Choose your plan
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Start for free, upgrade as you grow. All plans come with a 14-day trial.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`relative flex flex-col rounded-2xl border bg-background p-8 shadow-sm transition-shadow hover:shadow-lg
                ${tier.highlighted ? 'border-primary/50 shadow-primary/10' : ''}`}
            >
              <div className="mb-8">
                <h3 className="text-2xl font-semibold leading-7">{tier.name}</h3>
                <p className="mt-4 text-base text-muted-foreground">{tier.description}</p>
                <div className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-5xl font-bold tracking-tight">{tier.price.monthly}</span>
                  <span className="text-sm font-semibold leading-6 text-muted-foreground">/month</span>
                </div>
              </div>

              <ul role="list" className="mb-8 space-y-3 text-sm leading-6">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <Check className="h-5 w-5 flex-none text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={tier.href}
                className={`mt-auto inline-flex items-center justify-center rounded-full px-6 py-3 text-center text-sm font-medium transition-colors
                  ${tier.highlighted 
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                    : 'border border-primary/20 hover:bg-accent hover:text-accent-foreground'
                  }`}
              >
                {tier.cta}
              </a>

              {tier.highlighted && (
                <div 
                  className="absolute -inset-px rounded-2xl border-2 border-primary"
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <a
            href="/pricing/compare"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Compare all features →
          </a>
        </div>
      </div>
    </section>
  );
}
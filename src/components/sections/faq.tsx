import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const categories = {
  general: [
    {
      question: "What can I sell on WhatStore?",
      answer: "You can sell almost anything on WhatStore - physical products, digital goods, or services. This includes clothing, electronics, handmade items, digital downloads, consulting services, online courses, and much more. Of course, all items must comply with our terms of service and legal requirements."
    },
    {
      question: "How do I start selling?",
      answer: "Starting is easy! Sign up for a WhatStore account, complete your store setup with basic information, add your first product or service, and you're ready to start selling. Our onboarding process guides you through each step."
    },
    {
      question: "What are the fees?",
      answer: "WhatStore offers transparent pricing with different plans to suit your needs. Each plan includes features like secure payment processing, customer management, and analytics. Transaction fees vary by plan - view our pricing page for detailed information."
    }
  ],
  payments: [
    {
      question: "How do payments work?",
      answer: "We support multiple payment methods including credit cards, digital wallets, and local payment options. For physical products, payment is processed at checkout. For services, you can choose between upfront payments or custom payment schedules."
    },
    {
      question: "When do I get paid?",
      answer: "Payment processing times vary by country and payment method. Typically, funds are available in your account within 2-7 business days after a successful transaction. You can track all payments in your seller dashboard."
    },
    {
      question: "What payment methods can I accept?",
      answer: "You can accept major credit cards, digital wallets like Apple Pay and Google Pay, and local payment methods depending on your location. We're constantly adding new payment options to help you serve more customers."
    }
  ],
  features: [
    {
      question: "How does the AI assistant help my store?",
      answer: "Our AI helps optimize product listings, manages inventory, automates customer support, and provides insights on sales patterns. It can help write descriptions, suggest pricing strategies, and identify growth opportunities."
    },
    {
      question: "Can I manage multiple stores?",
      answer: "Yes! You can create and manage multiple stores under one account. This is perfect if you want to separate different product lines or create distinct brand experiences for different target audiences."
    },
    {
      question: "What marketing tools are available?",
      answer: "WhatStore provides built-in SEO tools, social media integration, email marketing capabilities, and promotional features. You can also access analytics to track your marketing performance and customer behavior."
    }
  ],
  support: [
    {
      question: "How do I handle shipping for physical products?",
      answer: "WhatStore integrates with major shipping carriers and provides tools to manage shipping rates, print labels, and track deliveries. You can set up flat-rate shipping, calculated rates, or offer free shipping."
    },
    {
      question: "How do I manage service bookings?",
      answer: "Our service booking system lets you set availability, manage appointments, and handle scheduling. Customers can book time slots, and you'll receive notifications. You can also set custom booking rules and cancellation policies."
    },
    {
      question: "What kind of support do sellers get?",
      answer: "We provide 24/7 seller support, detailed documentation, video tutorials, and a community forum. Our seller success team is always ready to help you grow your business on WhatStore."
    }
  ]
};

export function FAQ() {
  return (
    <section id="faq" className="container relative py-20 sm:py-32">
      <div className="absolute inset-0 flex justify-center">
        <div className="w-[1000px] h-[1000px] bg-[conic-gradient(from_0deg,transparent_0_340deg,var(--primary)_360deg)] opacity-20 blur-[100px]" />
      </div>
      
      <div className="relative">
        <div className="mx-auto max-w-2xl md:text-center">
          <h2 className="font-bold text-4xl sm:text-5xl lg:text-6xl">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Find answers to common questions about our digital marketplace platform
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl space-y-10">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">General Questions</h3>
            <Accordion type="single" collapsible className="w-full">
              {categories.general.map((faq, index) => (
                <AccordionItem key={index} value={`general-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Payments</h3>
            <Accordion type="single" collapsible className="w-full">
              {categories.payments.map((faq, index) => (
                <AccordionItem key={index} value={`payments-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Features</h3>
            <Accordion type="single" collapsible className="w-full">
              {categories.features.map((faq, index) => (
                <AccordionItem key={index} value={`features-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Support</h3>
            <Accordion type="single" collapsible className="w-full">
              {categories.support.map((faq, index) => (
                <AccordionItem key={index} value={`support-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="mt-10 text-center">
            <p className="text-base text-muted-foreground">
              Still have questions?{" "}
              <a href="#" className="font-medium text-primary hover:underline">
                Contact our support team
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
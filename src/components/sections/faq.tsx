import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = {
  general: [
    {
      question: "What types of digital products can I sell?",
      answer: "You can sell a wide range of digital products including software, e-books, digital art, music, templates, themes, plugins, and online courses. Any digital file that can be downloaded or accessed online can be sold on our platform."
    },
    {
      question: "How do payouts work?",
      answer: "We process payouts automatically every week for all sales made, minus our platform fee. Payments are made via Stripe to your connected bank account. Enterprise customers can request custom payout schedules."
    },
    {
      question: "Is there a limit to file sizes?",
      answer: "Basic accounts can upload files up to 1GB per product. Pro accounts have a 5GB limit per product, and Enterprise accounts have custom limits. All files are stored securely and delivered via high-speed CDN."
    }
  ],
  aiFeatures: [
    {
      question: "How does the AI assistant help my store?",
      answer: "Our AI assistant helps optimize your product listings, suggests pricing strategies, automates customer support, and provides insights on sales patterns. It can also help manage inventory and create marketing content."
    },
    {
      question: "Can the AI write product descriptions?",
      answer: "Yes! Our AI can generate SEO-optimized product descriptions, marketing copy, and social media content based on your product details and target audience. You can edit and refine the generated content as needed."
    },
    {
      question: "How accurate is the AI customer support?",
      answer: "Our AI customer support is trained on your product catalog and common customer queries. It handles over 80% of customer questions accurately and knows when to escalate to human support for complex issues."
    }
  ],
  business: [
    {
      question: "Can I sell subscription-based products?",
      answer: "Yes! You can set up recurring subscriptions for your digital products. This is perfect for software licenses, member-only content, or any service that requires regular updates or access."
    },
    {
      question: "What kind of analytics do you provide?",
      answer: "We provide detailed analytics including sales trends, customer behavior, traffic sources, conversion rates, and revenue reports. Pro and Enterprise plans get access to advanced analytics with AI-powered insights."
    },
    {
      question: "How do I handle customer support?",
      answer: "You have multiple options: use our AI-powered automated support, handle inquiries manually through our dashboard, or combine both. Enterprise plans include dedicated support staff to help manage customer interactions."
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
              {faqs.general.map((faq, index) => (
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
            <h3 className="text-xl font-semibold">AI Features</h3>
            <Accordion type="single" collapsible className="w-full">
              {faqs.aiFeatures.map((faq, index) => (
                <AccordionItem key={index} value={`ai-${index}`}>
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
            <h3 className="text-xl font-semibold">Business & Analytics</h3>
            <Accordion type="single" collapsible className="w-full">
              {faqs.business.map((faq, index) => (
                <AccordionItem key={index} value={`business-${index}`}>
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
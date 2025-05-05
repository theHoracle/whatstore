import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const shortFaqs = [
  {
    question: "What types of digital products can I sell?",
    answer: "You can sell a wide range of digital products including software, e-books, digital art, music, templates, themes, plugins, and online courses."
  },
  {
    question: "How do payouts work?",
    answer: "We process payouts automatically every week for all sales made, minus our platform fee. Payments are made via Stripe to your connected bank account."
  },
  {
    question: "How does the AI assistant help my store?",
    answer: "Our AI assistant helps optimize your product listings, suggests pricing strategies, automates customer support, and provides insights on sales patterns."
  }
];

export function ShortFAQ() {
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
            Quick answers to common questions
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl">
          <Accordion type="single" collapsible className="w-full">
            {shortFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-10 text-center">
            <Link 
              href="/faq"
              className="text-base font-medium text-primary hover:underline"
            >
              View all FAQs →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
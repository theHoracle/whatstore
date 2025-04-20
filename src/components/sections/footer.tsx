import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";

const navigation = {
  main: [
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "/press" },
    { name: "Partners", href: "/partners" },
    { name: "Legal", href: "/legal" },
  ],
  solutions: [
    { name: "Digital Products", href: "/solutions/digital-products" },
    { name: "E-learning", href: "/solutions/e-learning" },
    { name: "Software", href: "/solutions/software" },
    { name: "Digital Art", href: "/solutions/digital-art" },
  ],
  support: [
    { name: "Documentation", href: "/docs" },
    { name: "Guides", href: "/guides" },
    { name: "API Status", href: "/status" },
    { name: "Help Center", href: "/help" },
  ],
  social: [
    {
      name: "Facebook",
      href: "#",
      icon: Facebook,
    },
    {
      name: "Twitter",
      href: "#",
      icon: Twitter,
    },
    {
      name: "Instagram",
      href: "#",
      icon: Instagram,
    },
    {
      name: "LinkedIn",
      href: "#",
      icon: Linkedin,
    },
    {
      name: "GitHub",
      href: "#",
      icon: Github,
    },
  ],
};

export function Footer() {
  return (
    <footer className="bg-background border-t w-screen">
      <div className=" py-12 md:py-16 lg:py-20">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8 flex flex-col">
          <div className="space-y-8 pl-4 md:pl-10">
            <h2 className="text-2xl font-bold tracking-tight">WhatStore</h2>
            <p className="text-sm text-muted-foreground max-w-xs">
              Your premier marketplace for digital products, connecting creators with customers worldwide.
            </p>
            <div className="flex space-x-5">
              {navigation.social.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 lg:col-span-2 lg:mt-0 pl-4 md:pl-10 lg:pl-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold">Solutions</h3>
                <ul role="list" className="mt-4 space-y-3">
                  {navigation.solutions.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold">Support</h3>
                <ul role="list" className="mt-4 space-y-3">
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold">Company</h3>
                <ul role="list" className="mt-4 space-y-3">
                  {navigation.main.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t">
          <p className="text-center text-muted-foreground ">
            &copy; {new Date().getFullYear()} WhatStore, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
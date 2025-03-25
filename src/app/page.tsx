import Hero from "@/components/hero";
import Navbar from "@/components/nav/default-nav";
import Image from "next/image";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <Hero />
    </div>
  );
}

import Hero from "@/components/hero";
import Navbar from "@/components/nav/default-nav";
import api from "@/lib/axios";


export default function Home() { 
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <Hero />
    </div>
  );
}

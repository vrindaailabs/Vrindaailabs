import Header from "@/components/layout/Header";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import Products from "@/components/home/Products";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Process from "@/components/home/Process";
import Testimonials from "@/components/home/Testimonials";
import CTA from "@/components/home/CTA";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Services />
      <Products />
      <WhyChooseUs />
      <Process />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
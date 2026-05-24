import Nav from '@/components/chrome/Nav';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Services } from '@/components/sections/Services';
import { WhyUs } from '@/components/sections/WhyUs';
import { Process } from '@/components/sections/Process';
import Pricing from '@/components/sections/Pricing';
import { Area } from '@/components/sections/Area';
import { Gallery } from '@/components/sections/Gallery';
import { Testimonials } from '@/components/sections/Testimonials';
import Faq from '@/components/sections/Faq';
import CtaForm from '@/components/sections/CtaForm';
import Footer from '@/components/sections/Footer';

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyUs />
        <Process />
        <Pricing />
        <Area />
        <Gallery />
        <Testimonials />
        <Faq />
        <CtaForm />
        <Footer />
      </main>
    </>
  );
}

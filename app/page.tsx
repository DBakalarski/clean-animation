import Nav from '@/components/chrome/Nav';
import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { Gallery } from '@/components/sections/Gallery';
import { Process } from '@/components/sections/Process';
import { Testimonials } from '@/components/sections/Testimonials';
import Pricing from '@/components/sections/Pricing';
import Faq from '@/components/sections/Faq';
import CtaForm from '@/components/sections/CtaForm';
import Footer from '@/components/sections/Footer';

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
        <Gallery />
        <Process />
        <Testimonials />
        <Pricing />
        <Faq />
        <CtaForm />
        <Footer />
      </main>
    </>
  );
}

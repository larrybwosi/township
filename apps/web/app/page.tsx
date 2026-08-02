import Navbar from "../components/navbar";
import Hero from "../components/hero";
import About from "../components/about";
import Institutions from "../components/institutions";
import Places from "../components/places";
import Services from "../components/services";
import Events from "../components/events";
import Footer from "../components/footer";
import { safeSanityFetch } from "../lib/sanity";
import {
  SanityHomeHero,
  SanityHomeAbout,
  SanityInstitution,
  SanityPlace,
  SanityService,
  SanityStudentGuide,
  SanityEvent,
} from "../lib/sanity";

export default async function Home() {
  const [
    { data: heroData },
    { data: aboutData },
    { data: institutionsData },
    { data: placesData },
    { data: servicesData },
    { data: studentGuideData },
    { data: eventsData },
  ] = await Promise.all([
    safeSanityFetch<SanityHomeHero>('*[_type == "homeHero"][0]'),
    safeSanityFetch<SanityHomeAbout>('*[_type == "homeAbout"][0]'),
    safeSanityFetch<SanityInstitution[]>('*[_type == "institution"]'),
    safeSanityFetch<SanityPlace[]>('*[_type == "place"]'),
    safeSanityFetch<SanityService[]>('*[_type == "service"]'),
    safeSanityFetch<SanityStudentGuide>('*[_type == "studentGuide"][0]'),
    safeSanityFetch<SanityEvent[]>('*[_type == "event"]'),
  ]);

  return (
    <>
      <Navbar />
      <main>
        <Hero initialData={heroData} />
        <About initialData={aboutData} />
        <Institutions initialData={institutionsData} />
        <Places initialData={placesData} />
        <Services initialServices={servicesData} initialGuide={studentGuideData} />
        <Events initialData={eventsData} />
      </main>
      <Footer />
    </>
  );
}

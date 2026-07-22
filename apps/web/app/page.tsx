import Navbar from "../components/navbar";
import Hero from "../components/hero";
import About from "../components/about";
import Institutions from "../components/institutions";
import Places from "../components/places";
import Services from "../components/services";
import Events from "../components/events";
import Footer from "../components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Institutions />
        <Places />
        <Services />
        <Events />
      </main>
      <Footer />
    </>
  );
}

import HomeBanner from "./components/HomeBanner";
import AboutSection from "./components/AboutSection";
import HorizontalResume from "./components/HorizontalResume";
import ContactSection from "./components/ContactSection";


export default function Home() {
  return (
    <main>
      <HomeBanner />
      <AboutSection />
      <HorizontalResume />
      <ContactSection />
    </main>
  );
}

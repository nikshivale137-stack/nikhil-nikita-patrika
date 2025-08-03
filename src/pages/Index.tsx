import Hero from "@/components/Hero";
import PhotoGallery from "@/components/PhotoGallery";
import OurStory from "@/components/OurStory";
import CeremonySchedule from "@/components/CeremonySchedule";
import PatrikaDisplay from "@/components/PatrikaDisplay";
import VenueMap from "@/components/VenueMap";
import ImageTicker from "@/components/ImageTicker";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <PhotoGallery />
      <OurStory />
      <CeremonySchedule />
      <PatrikaDisplay />
      <VenueMap />
      <ImageTicker />
      <Footer />
    </div>
  );
};

export default Index;

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAdminData } from "@/contexts/AdminContext";

const PhotoGallery = () => {
  const { adminData } = useAdminData();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Get slides and labels from admin data
  const slides = adminData?.photoGallery?.slides?.map(slide => slide.src) || [];
  const slideLabels = adminData?.photoGallery?.slides?.map(slide => slide.label) || [];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000); // 3 seconds timing
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToSlide = (index: number) => setCurrentSlide(index);

  return (
    <section className="py-12 md:py-20 px-4 relative overflow-hidden">
      {/* Section Header */}
      <div className="text-center mb-8 md:mb-16 fade-in-up">
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-wedding-gold mb-4 animate-fade-in">
          आमचे सुंदर क्षण
        </h2>
        <div className="w-24 h-1 bg-wedding-maroon mx-auto animate-scale-in"></div>
      </div>

      {/* Responsive Gallery Slider */}
      <div className="relative w-full max-w-6xl mx-auto">
        <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl">
          {/* Main Image Display with improved aspect ratio handling */}
          <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh]">
            <img 
              src={slides[currentSlide]} 
              alt={slideLabels[currentSlide]}
              className="w-full h-full object-contain transition-all duration-700 ease-in-out transform hover:scale-105 bg-gradient-to-br from-wedding-cream/10 to-wedding-maroon/10"
              style={{ objectPosition: 'center' }}
            />
            
            {/* Gradient Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            
            {/* Image Label */}
            <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 z-10">
              <h3 className="text-wedding-cream text-xl md:text-2xl lg:text-3xl font-serif font-bold drop-shadow-lg">
                {slideLabels[currentSlide]}
              </h3>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-wedding-maroon/80 hover:bg-wedding-maroon text-wedding-cream p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110 z-20"
          >
            <ChevronLeft size={20} className="md:w-6 md:h-6" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-wedding-maroon/80 hover:bg-wedding-maroon text-wedding-cream p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110 z-20"
          >
            <ChevronRight size={20} className="md:w-6 md:h-6" />
          </button>

          {/* Dots Navigation */}
          <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 z-20">
            <div className="flex space-x-2 md:space-x-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-wedding-gold scale-125' 
                      : 'bg-wedding-cream/50 hover:bg-wedding-cream/80'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Thumbnail Strip - Hidden on mobile for better UX */}
        <div className="hidden md:flex justify-center mt-4 lg:mt-6 space-x-2">
          {slides.map((slide, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-16 h-16 lg:w-20 lg:h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                index === currentSlide 
                  ? 'ring-4 ring-wedding-gold scale-110' 
                  : 'ring-2 ring-wedding-cream/30 hover:ring-wedding-gold/50'
              }`}
            >
              <img 
                src={slide} 
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-6 md:mt-8 max-w-md mx-auto">
        <div className="w-full bg-wedding-cream/20 rounded-full h-1">
          <div 
            className="bg-wedding-gold h-1 rounded-full transition-all duration-300"
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          ></div>
        </div>
        <p className="text-center text-wedding-cream/70 text-sm mt-2">
          {currentSlide + 1} / {slides.length}
        </p>
      </div>
    </section>
  );
};

export default PhotoGallery;
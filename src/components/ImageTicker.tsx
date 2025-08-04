import A1 from "@/assets/A1.jpeg";
import A3 from "@/assets/A3.jpeg";
import A5 from "@/assets/A5.jpeg";

const ImageTicker = () => {
  // Array of uploaded family photos (A1-A7)
  const tickerImages = [
    { src: "/lovable-uploads/5c428a5c-c2ef-4e45-8db7-280fd1b73f9a.png", alt: "A1" },
    { src: "/lovable-uploads/01ec1ee2-d371-4dfc-bfde-496e9ebc05c0.png", alt: "A2" },
    { src: "/lovable-uploads/4473b6f3-4ca0-451a-a418-7c6920959e07.png", alt: "A3" },
    { src: "/lovable-uploads/8a1ee7d2-0804-44bf-8318-391a29ae51cd.png", alt: "A4" },
    { src: "/lovable-uploads/95e79806-c7a8-408d-956d-8b899753e6ef.png", alt: "A5" },
    { src: "/lovable-uploads/3a1a3a0e-b664-4ad0-909d-81c9f381a2f5.png", alt: "A6" },
    { src: "/lovable-uploads/eefb8c97-f310-4283-90b9-8fcdd7215ea8.png", alt: "A7" },
  ];

  return (
    <section className="w-full py-6 sm:py-8 md:py-10 bg-gradient-to-r from-wedding-deep-maroon via-wedding-maroon to-wedding-deep-maroon overflow-hidden">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="font-kavi text-2xl sm:text-3xl md:text-4xl text-wedding-gold mb-2 animate-fade-in">
          किलबिल परिवार
        </h2>
        <div className="w-16 sm:w-20 h-1 bg-wedding-gold mx-auto animate-scale-in"></div>
      </div>

      {/* Horizontal Scrolling Ticker */}
      <div className="relative w-full overflow-hidden">
        <div className="ticker-container">
          {/* First set of images */}
          {tickerImages.map((image, index) => (
            <div
              key={`set1-${index}`}
              className="ticker-item"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover rounded-lg"
                loading="lazy"
                onError={(e) => {
                  console.log('Image failed to load:', image.src);
                }}
              />
            </div>
          ))}
          {/* Second set of images for seamless loop */}
          {tickerImages.map((image, index) => (
            <div
              key={`set2-${index}`}
              className="ticker-item"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover rounded-lg"
                loading="lazy"
              />
            </div>
          ))}
          {/* Third set for wider screens */}
          {tickerImages.map((image, index) => (
            <div
              key={`set3-${index}`}
              className="ticker-item"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover rounded-lg"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Gradient Overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 md:w-16 bg-gradient-to-r from-wedding-deep-maroon to-transparent pointer-events-none z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 md:w-16 bg-gradient-to-l from-wedding-deep-maroon to-transparent pointer-events-none z-10"></div>
      </div>
    </section>
  );
};

export default ImageTicker;
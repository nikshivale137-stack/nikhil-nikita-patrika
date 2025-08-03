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
    { src: A1, alt: "Traditional A1" },
    { src: A3, alt: "Traditional A3" },
    { src: A5, alt: "Traditional A5" },
  ];

  // Create a seamless infinite loop by duplicating the array multiple times
  const duplicatedImages = [...tickerImages, ...tickerImages, ...tickerImages, ...tickerImages];

  return (
    <section className="w-full py-4 sm:py-6 md:py-8 bg-gradient-to-r from-wedding-deep-maroon via-wedding-maroon to-wedding-deep-maroon overflow-hidden">
      <div className="text-center mb-4 sm:mb-6">
        <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-wedding-gold mb-2 animate-fade-in">
          किलबिल परिवार
        </h2>
        <div className="w-12 sm:w-16 h-1 bg-wedding-gold mx-auto animate-scale-in"></div>
      </div>

      {/* Horizontal Scrolling Ticker */}
      <div className="relative w-full overflow-hidden">
        <div className="flex animate-scroll-infinite whitespace-nowrap">
          {duplicatedImages.map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 mx-2 sm:mx-3 md:mx-4 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              style={{ minWidth: 'fit-content' }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-contain bg-gradient-to-br from-wedding-cream/10 to-wedding-maroon/10"
                loading="lazy"
                onError={(e) => {
                  console.log('Image failed to load:', image.src);
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Gradient Overlays for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 md:w-16 bg-gradient-to-r from-wedding-deep-maroon to-transparent pointer-events-none z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 md:w-16 bg-gradient-to-l from-wedding-deep-maroon to-transparent pointer-events-none z-10"></div>
    </section>
  );
};

export default ImageTicker;
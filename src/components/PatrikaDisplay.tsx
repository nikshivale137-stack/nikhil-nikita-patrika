import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const PatrikaDisplay = () => {
  // Track mouse position relative to card
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Add spring smoothing to mouse positions
  const springConfig = { stiffness: 300, damping: 20 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Map mouse positions to rotation degrees
  const rotateX = useTransform(springY, [0, 1], [15, -15]);
  const rotateY = useTransform(springX, [0, 1], [-15, 15]);

  // Mouse move handler to set relative positions between 0 and 1
  function handleMouseMove(event: React.MouseEvent) {
    const rect = event.currentTarget.getBoundingClientRect();
    const posX = (event.clientX - rect.left) / rect.width;
    const posY = (event.clientY - rect.top) / rect.height;

    x.set(posX);
    y.set(posY);
  }

  // Reset tilt on mouse leave
  function handleMouseLeave() {
    x.set(0.5);
    y.set(0.5);
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in-up">
          <h2 className="font-serif text-4xl md:text-5xl text-wedding-gold mb-4">
            पत्रिका
          </h2>
          <div className="w-24 h-1 bg-wedding-maroon mx-auto mb-4"></div>
          <p className="text-wedding-cream/80 font-sans">
            पारंपरिक विवाह निमंत्रण पत्रिका
          </p>
        </div>

        {/* Enhanced Tilt Card Patrika */}
        <div className="flex justify-center fade-in-up">
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX,
              rotateY,
              perspective: 1000,
              transformStyle: "preserve-3d",
            }}
            className="cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="glass-card p-6 max-w-2xl shadow-2xl border border-wedding-gold/20 hover:border-wedding-gold/40 transition-all duration-300">
              <div className="relative overflow-hidden rounded-lg">
                <img 
                  src="/lovable-uploads/430abb7b-7071-4d9e-806a-bdde3cc0ea19.png" 
                  alt="निखिल आणि निकिता विवाह पत्रिका" 
                  className="w-full rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <p className="text-wedding-cream/90 text-sm mt-4 text-center font-serif italic">
                श्री गणेशजीच्या आशीर्वादाने - निखिल आणि निकिता यांचे शुभ विवाह
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PatrikaDisplay;
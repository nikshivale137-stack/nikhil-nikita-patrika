import * as motion from "motion/react-client"
import type { Variants } from "motion/react"

const ImageTicker = () => {
  // Array of uploaded family photos (A1-A7) with wedding theme colors
  const familyImages: [string, number, number][] = [
    ["/lovable-uploads/5c428a5c-c2ef-4e45-8db7-280fd1b73f9a.png", 340, 10], // A1
    ["/lovable-uploads/01ec1ee2-d371-4dfc-bfde-496e9ebc05c0.png", 20, 40],   // A2
    ["/lovable-uploads/4473b6f3-4ca0-451a-a418-7c6920959e07.png", 60, 90],   // A3
    ["/lovable-uploads/8a1ee7d2-0804-44bf-8318-391a29ae51cd.png", 80, 120],  // A4
    ["/lovable-uploads/95e79806-c7a8-408d-956d-8b899753e6ef.png", 100, 140], // A5
    ["/lovable-uploads/3a1a3a0e-b664-4ad0-909d-81c9f381a2f5.png", 205, 245], // A6
    ["/lovable-uploads/eefb8c97-f310-4283-90b9-8fcdd7215ea8.png", 260, 290], // A7
  ];

  return (
    <section className="w-full py-6 sm:py-8 md:py-10 bg-gradient-to-r from-wedding-deep-maroon via-wedding-maroon to-wedding-deep-maroon overflow-hidden">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="font-kavi text-2xl sm:text-3xl md:text-4xl text-wedding-gold mb-2 animate-fade-in">
          किलबिल परिवार
        </h2>
        <div className="w-16 sm:w-20 h-1 bg-wedding-gold mx-auto animate-scale-in"></div>
      </div>

      <div style={container}>
        {familyImages.map(([imageSrc, hueA, hueB], i) => (
          <Card i={i} imageSrc={imageSrc} hueA={hueA} hueB={hueB} key={imageSrc} />
        ))}
      </div>
    </section>
  );
};

interface CardProps {
  imageSrc: string
  hueA: number
  hueB: number
  i: number
}

function Card({ imageSrc, hueA, hueB, i }: CardProps) {
  const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`

  return (
    <motion.div
      className={`card-container-${i}`}
      style={cardContainer}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0.8 }}
    >
      <div style={{ ...splash, background }} />
      <motion.div style={card} variants={cardVariants} className="card">
        <img
          src={imageSrc}
          alt={`Family Photo ${i + 1}`}
          style={imageStyle}
          onError={(e) => {
            console.log('Image failed to load:', imageSrc);
          }}
        />
      </motion.div>
    </motion.div>
  )
}

const cardVariants: Variants = {
  offscreen: {
    y: 300,
  },
  onscreen: {
    y: 50,
    rotate: -10,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
}

const hue = (h: number) => `hsl(${h}, 100%, 50%)`

const container: React.CSSProperties = {
  margin: "50px auto",
  maxWidth: 500,
  paddingBottom: 100,
  width: "100%",
}

const cardContainer: React.CSSProperties = {
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  paddingTop: 20,
  marginBottom: -120,
}

const splash: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
}

const card: React.CSSProperties = {
  width: 300,
  height: 430,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 20,
  background: "#f5f5f5",
  boxShadow:
    "0 0 1px hsl(0deg 0% 0% / 0.075), 0 0 2px hsl(0deg 0% 0% / 0.075), 0 0 4px hsl(0deg 0% 0% / 0.075), 0 0 8px hsl(0deg 0% 0% / 0.075), 0 0 16px hsl(0deg 0% 0% / 0.075)",
  transformOrigin: "10% 60%",
  overflow: "hidden",
}

const imageStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: 20,
}

export default ImageTicker;
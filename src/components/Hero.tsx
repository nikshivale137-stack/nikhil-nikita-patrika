import { Heart, Calendar, MapPin, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import Countdown from "react-countdown";
import { useAdminData } from "@/contexts/AdminContext";
import mandalaPattern from "@/assets/mandala-pattern.png";
import ganpatiImage from "@/assets/ganpati-new.png";

const Hero = () => {
  const { adminData } = useAdminData();
  const targetDate = new Date("2025-08-14T16:56:00+05:30"); // 4:56 PM IST

  const countdownRenderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) {
      return <span className="text-wedding-gold text-3xl font-bold animate-pulse">शुभ विवाह!</span>;
    }
    return (
      <div className="flex flex-wrap gap-4 justify-center text-center">
        <div className="glass-card px-4 py-3 min-w-[80px] animate-scale-in">
          <div className="text-2xl md:text-3xl font-bold text-wedding-gold">{days}</div>
          <div className="text-xs md:text-sm text-wedding-cream font-medium">दिवस</div>
        </div>
        <div className="glass-card px-4 py-3 min-w-[80px] animate-scale-in delay-75">
          <div className="text-2xl md:text-3xl font-bold text-wedding-gold">{hours}</div>
          <div className="text-xs md:text-sm text-wedding-cream font-medium">तास</div>
        </div>
        <div className="glass-card px-4 py-3 min-w-[80px] animate-scale-in delay-150">
          <div className="text-2xl md:text-3xl font-bold text-wedding-gold">{minutes}</div>
          <div className="text-xs md:text-sm text-wedding-cream font-medium">मिनिटे</div>
        </div>
        <div className="glass-card px-4 py-3 min-w-[80px] animate-scale-in delay-200">
          <div className="text-2xl md:text-3xl font-bold text-wedding-gold">{seconds}</div>
          <div className="text-xs md:text-sm text-wedding-cream font-medium">सेकंद</div>
        </div>
      </div>
    );
  };

  if (!adminData) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-wedding-gold"></div>
          <p className="mt-4 text-wedding-gold">Loading...</p>
        </div>
      </section>
    );
  }

  const heroData = adminData.hero;

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-8">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${mandalaPattern})` }}
      />
      
      {/* Ganpati Blessing at Top */}
      <div className="relative z-20 text-center mb-8 animate-fade-in">
        <img src={ganpatiImage} alt="श्री गणेशजी" className="w-20 h-20 mx-auto mb-3 rounded-full shadow-lg" />
        
        {/* Swastik Icon with Lamps */}
        <div className="flex justify-center items-center mb-3 space-x-6">
          {/* Left Lamp */}
          <img src="/lovable-uploads/8e190c86-1bc8-4e9d-a0e4-16a0680eb577.png" alt="दिवा" className="w-16 h-16 animate-pulse" />
          
          {/* Swastik Icon */}
          <img src="/lovable-uploads/swastik-new.png" alt="स्वस्तिक" className="w-20 h-20 animate-pulse" />
          
          {/* Right Lamp */}
          <img src="/lovable-uploads/8e190c86-1bc8-4e9d-a0e4-16a0680eb577.png" alt="दिवा" className="w-16 h-16 animate-pulse delay-100" />
        </div>
        
        <p 
          className="font-serif text-xl font-bold tracking-wide drop-shadow-lg"
          style={{ color: heroData.primaryColor }}
        >
          ॥ श्री गणेशाय नमः ॥
        </p>
        
        {/* Haldi Kunku Circles */}
        <div className="flex justify-center mt-4 space-x-4">
          <div className="w-8 h-8 bg-red-500 rounded-full animate-pulse shadow-lg"></div>
          <div className="w-8 h-8 bg-yellow-400 rounded-full animate-pulse delay-150 shadow-lg"></div>
        </div>
      </div>
      
      {/* Main Hero Card */}
      <div className="glass-hero max-w-4xl w-full relative z-10 fade-in-up animate-scale-in">
        {/* Names */}
        <div className="mb-8 text-center">
          <h1 
            className={`text-5xl md:text-7xl lg:text-8xl mb-8 animate-fade-in font-bold tracking-wider drop-shadow-2xl ${heroData.fontFamily}`}
            style={{ color: heroData.primaryColor }}
          >
            {heroData.groomName}
          </h1>
          
          {/* Kalash and Samai/Jyoti Animation */}
          <div className="flex items-center justify-center my-8 animate-fade-in delay-300">
            <div 
              className="w-20 h-px"
              style={{ background: `linear-gradient(to right, transparent, ${heroData.primaryColor}, transparent)` }}
            ></div>
            
            {/* Animated Samai/Jyoti */}
            <div className="flex items-center space-x-4 mx-6">
              <div className="flame-container">
                <div className="flame flame-1"></div>
                <div className="flame-base"></div>
              </div>
              
              {/* Kalash Image */}
              <img src={heroData.kalashImage} alt="कलश" className="w-16 h-16 mx-4 animate-pulse" />
              
              <div className="flame-container">
                <div className="flame flame-2"></div>
                <div className="flame-base"></div>
              </div>
            </div>
            
            <div 
              className="w-20 h-px"
              style={{ background: `linear-gradient(to left, transparent, ${heroData.primaryColor}, transparent)` }}
            ></div>
          </div>
          
          <h1 
            className={`text-5xl md:text-7xl lg:text-8xl mb-8 animate-fade-in delay-500 font-bold tracking-wider drop-shadow-2xl ${heroData.fontFamily}`}
            style={{ color: heroData.primaryColor }}
          >
            {heroData.brideName}
          </h1>
        </div>

        {/* Wedding Details */}
        <div className="space-y-6 animate-fade-in delay-700" style={{ color: heroData.secondaryColor }}>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3 text-center">
            <Calendar className="animate-bounce" size={28} style={{ color: heroData.primaryColor }} />
            <span className={`font-serif text-lg md:text-xl lg:text-2xl font-semibold text-shadow ${heroData.fontFamily}`}>
              {heroData.weddingDate}
            </span>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3 text-center">
            <Clock className="animate-bounce delay-100" size={28} style={{ color: heroData.primaryColor }} />
            <span className={`font-serif text-lg md:text-xl lg:text-2xl font-semibold text-shadow ${heroData.fontFamily}`}>
              {heroData.weddingTime}
            </span>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3 text-center">
            <MapPin className="animate-bounce delay-200" size={28} style={{ color: heroData.primaryColor }} />
            <a 
              href={heroData.venueLink}
              target="_blank" 
              rel="noopener noreferrer"
              className={`font-serif text-base md:text-lg lg:text-xl font-semibold text-shadow hover:transition-colors duration-300 underline decoration-current/50 hover:decoration-current ${heroData.fontFamily}`}
              style={{ 
                color: heroData.secondaryColor,
                textDecorationColor: `${heroData.primaryColor}50`
              }}
            >
              {heroData.venue}
            </a>
          </div>
        </div>

        {/* Countdown Timer */}
        {adminData.settings.showCountdown && (
          <div className="mt-10 mb-8 animate-fade-in delay-1000">
            <h3 
              className={`font-serif text-xl md:text-2xl mb-6 text-center font-bold ${heroData.fontFamily}`}
              style={{ color: heroData.primaryColor }}
            >
              विवाहासाठी उरलेला वेळ
            </h3>
            <Countdown date={targetDate} renderer={countdownRenderer} />
          </div>
        )}

        {/* Marathi Blessing */}
        <div className="mt-8 p-6 glass rounded-xl animate-fade-in delay-1200">
          <p 
            className={`text-xl md:text-2xl text-center font-bold tracking-wide ${heroData.fontFamily}`}
            style={{ color: heroData.primaryColor }}
          >
            श्री गणेशाय नमः
          </p>
          <p 
            className={`text-sm md:text-base text-center mt-3 leading-relaxed ${heroData.fontFamily}`}
            style={{ color: heroData.secondaryColor }}
          >
            श्री गणेशजीच्या आशीर्वादाने आम्ही आमच्या मिलनाचा उत्सव साजरा करण्यासाठी तुम्हाला आमंत्रित करतो
          </p>
        </div>

      </div>
    </section>
  );
};

export default Hero;
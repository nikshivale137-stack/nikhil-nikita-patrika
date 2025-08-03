import { Clock, Flower, Music, Users } from "lucide-react";
const CeremonySchedule = () => {
  const ceremonies = [{
    icon: Flower,
    name: "साखरपुडा",
    time: "सकाळी ११:०० वाजता",
    description: "सगाई समारंभ - दोन्ही कुटुंबांचे पवित्र मिलन आणि साखर पुडा विधी"
  }, {
    icon: Users,
    name: "भोजन",
    time: "दुपारी १२:०० ते ३:०० पर्यंत",
    description: "सर्व पाहुण्यांसाठी स्वादिष्ट महाराष्ट्रीयन जेवण"
  }, {
    icon: Flower,
    name: "हळदी समारंभ",
    time: "दुपारी १:२५ वाजता",
    description: "पारंपरिक हळदी विधी - वधू-वराच्या सुंदरतेसाठी"
  }, {
    icon: Music,
    name: "मुख्य विवाह समारंभ",
    time: "संध्याकाळी ४:५६ वाजता",
    description: "कन्यादान, सप्तपदी आणि मंगलाष्टके - पवित्र अग्निसाक्षीने विवाह"
  }, {
    icon: Users,
    name: "आशीर्वाद आणि उत्सव",
    time: "संध्याकाळी ६:०० वाजता",
    description: "सर्व नातेवाईक आणि मित्रांचे आशीर्वाद आणि आनंदोत्सव"
  }];
  return <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in-up">
          <h2 className="font-serif text-4xl md:text-5xl text-wedding-gold mb-4">
            विवाह कार्यक्रम
          </h2>
          <div className="w-24 h-1 bg-wedding-maroon mx-auto mb-4"></div>
          <p className="text-wedding-cream/80 font-sans">
            या शुभ दिवशी पारंपरिक विधींसह आमच्यासोबत उत्सव साजरा करा
          </p>
        </div>

        {/* Timeline */}
        <div className="relative space-y-8 md:space-y-16">
          {/* Central Line for Desktop */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-wedding-gold opacity-30"></div>
          
          {ceremonies.map((ceremony, index) => {
            const Icon = ceremony.icon;
            const isEven = index % 2 === 0;
            
            return (
              <div key={index} className="relative fade-in-up">
                {/* Central Icon for Desktop */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 -translate-y-4 w-16 h-16 bg-wedding-maroon rounded-full items-center justify-center border-4 border-wedding-gold z-10 shadow-lg">
                  <Icon className="text-wedding-gold" size={24} />
                </div>
                
                {/* Content Card with proper positioning */}
                <div className={`glass-card w-full mx-4 md:mx-0 md:w-80 lg:w-96 ${
                  isEven 
                    ? 'md:mr-auto md:mr-[calc(50%+2rem)]' 
                    : 'md:ml-auto md:ml-[calc(50%+2rem)]'
                }`}>
                  {/* Mobile Layout */}
                  <div className="md:hidden mb-4">
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 bg-wedding-maroon rounded-full flex items-center justify-center border-3 border-wedding-gold mr-4 shadow-lg">
                        <Icon className="text-wedding-gold" size={20} />
                      </div>
                      <div>
                        <h3 className="font-serif text-lg text-wedding-cream font-semibold">
                          {ceremony.name}
                        </h3>
                        <span className="font-serif text-sm text-wedding-gold">
                          {ceremony.time}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Desktop Layout */}
                  <div className="hidden md:block">
                    <div className="flex items-center mb-4">
                      <Clock className="text-wedding-gold mr-3" size={20} />
                      <span className="font-serif text-lg text-wedding-gold font-semibold">
                        {ceremony.time}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl text-wedding-cream mb-3 font-semibold">
                      {ceremony.name}
                    </h3>
                  </div>
                  
                  <p className="text-wedding-cream/90 text-sm md:text-base leading-relaxed">
                    {ceremony.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Important Note */}
        <div className="mt-16 glass-card text-center">
          <h3 className="font-serif text-xl text-wedding-gold mb-2">
            श्री गणेशाय नमः
          </h3>
          <p className="text-wedding-cream/80 text-sm">
            सर्व वेळापत्रक अंदाजे आहे आणि मुहूर्त व पारंपरिक रीतिरिवाजांनुसार बदलू शकते
          </p>
        </div>
      </div>
    </section>;
};
export default CeremonySchedule;
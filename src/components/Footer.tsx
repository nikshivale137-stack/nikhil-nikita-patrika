import { Heart, Calendar } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-16 px-4 border-t border-wedding-gold/20">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Quote */}
        <div className="glass-card mb-8">
          <h3 className="font-script text-3xl md:text-4xl text-wedding-gold mb-4">
            निखिल ♥ निकिता
          </h3>
          <blockquote className="font-serif text-lg md:text-xl text-wedding-cream italic mb-4">
            "यत्र नार्यस्तु पूज्यन्ते रमन्ते तत्र देवताः"
          </blockquote>
          <p className="text-wedding-cream/80 text-sm">
            जिथे स्त्रियांचा सन्मान होतो तिथे देवता निवास करतात
          </p>
        </div>

        {/* Wedding Date Reminder */}
        <div className="flex items-center justify-center space-x-2 mb-8 text-wedding-cream/80">
          <Calendar className="text-wedding-gold" size={20} />
          <span className="font-serif">गुरुवार, १४ ऑगस्ट २०२५ | संध्याकाळी ४:५६ वाजता</span>
        </div>

        {/* Contact Information */}
        <div className="glass-card max-w-md mx-auto mb-8">
          <h4 className="font-serif text-xl text-wedding-gold mb-4 text-center">
            संपर्क माहिती
          </h4>
          <div className="space-y-2 text-wedding-cream text-center">
            <p className="font-semibold">रामदास शिवले: ९८६०६३९३४८</p>
            <p className="font-semibold">निखिल शिवले: ७२७६६१११००</p>
          </div>
        </div>

        {/* Shivale Family Welcome */}
        <div className="glass-card max-w-2xl mx-auto mb-8">
          <h4 className="font-serif text-xl text-wedding-gold mb-3 text-center">
            शिवले परिवारातर्फे आपले स्वागत आहे!
          </h4>
          <p className="font-serif text-wedding-cream/90 leading-relaxed">
            आमचा एकत्रचा प्रवास अनंत प्रेम, आनंद आणि समृद्धीने भरलेला असावा. 
            आमच्या विशेष दिवसाचा भाग होण्याबद्दल आणि आमच्या आनंदात सहभागी झाल्याबद्दल धन्यवाद.
          </p>
        </div>

        {/* Hearts Decoration */}
        <div className="flex items-center justify-center space-x-4 mb-6">
          <Heart className="text-wedding-maroon" size={16} fill="currentColor" />
          <Heart className="text-wedding-gold" size={20} fill="currentColor" />
          <Heart className="text-wedding-maroon" size={16} fill="currentColor" />
        </div>

        {/* Swastik Symbol */}
        <div className="flex justify-center mb-8">
          <div className="glass-card p-6 max-w-xs">
            <img 
              src="/lovable-uploads/7dfe42c5-11dd-4c21-afed-9975d6094abb.png" 
              alt="स्वस्तिक" 
              className="w-16 h-16 mx-auto mb-3 animate-pulse"
            />
            <p className="text-wedding-gold text-center font-serif text-sm">
              ॐ स्वस्ति न इन्द्रो वृद्धश्रवाः
            </p>
            <p className="text-wedding-cream/80 text-center text-xs mt-1">
              शुभ लाभ
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-wedding-cream/60 text-xs">
          <p>© २०२५ निखिल आणि निकिता विवाह. प्रेम आणि आशीर्वादाने तयार केले.</p>
          <p className="mt-1">श्री गणेशजीच्या कृपेने निर्मित</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
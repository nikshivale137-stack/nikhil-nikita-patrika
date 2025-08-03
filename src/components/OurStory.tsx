import { Users, Heart, Star } from "lucide-react";
const OurStory = () => {
  return <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in-up">
          <h2 className="font-serif text-4xl md:text-5xl text-wedding-gold mb-4">
            आमची प्रेमकहाणी
          </h2>
          <div className="w-24 h-1 bg-wedding-maroon mx-auto"></div>
        </div>

        {/* Story Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* First Meeting */}
          <div className="glass-card fade-in-up">
            <div className="flex items-center mb-4">
              <Users className="text-wedding-gold mr-3" size={28} />
              <h3 className="font-serif text-2xl text-wedding-gold text-slate-100">पहिली भेट</h3>
            </div>
            <p className="text-wedding-cream/90 leading-relaxed">
              आमचे मार्ग एका सामाईक मित्राच्या सणात छेडले, जिथे नशिबाची स्वतःची योजना होती. 
              जे एक साधे संभाषण म्हणून सुरू झाले ते तासनतास बोलणे, हसणे आणि आमच्यातील 
              सुंदर जोडणी शोधण्यात बदलले.
            </p>
          </div>

          {/* The Proposal */}
          <div className="glass-card fade-in-up">
            <div className="flex items-center mb-4">
              <Heart className="text-wedding-gold mr-3" size={28} fill="currentColor" />
              <h3 className="font-serif text-2xl text-wedding-gold text-slate-100">प्रस्ताव</h3>
            </div>
            <p className="text-wedding-cream/90 leading-relaxed">
              तारांनी भरलेल्या आकाशाखाली, कुटुंबीयांच्या आशीर्वादाच्या उष्णतेने वेढलेले, 
              निखिलने निकिताला चिरंतन प्रेम, आदर आणि एकत्र सुंदर आठवणींच्या 
              आयुष्यभराच्या वचनांसह प्रस्ताव दिला.
            </p>
          </div>

          {/* Our Journey */}
          <div className="glass-card fade-in-up md:col-span-2">
            <div className="flex items-center mb-4">
              <Star className="text-wedding-gold mr-3" size={28} fill="currentColor" />
              <h3 className="font-serif text-2xl text-wedding-gold text-slate-100">आमचा एकत्रचा प्रवास</h3>
            </div>
            <p className="text-wedding-cream/90 leading-relaxed text-center">
              सामायिक स्वप्ने, असंख्य संभाषणे आणि आमच्या कुटुंबांच्या आशीर्वादाद्वारे, 
              आम्ही शोधून काढले आहे की प्रेम हे केवळ एक भावना नाही, तर आम्ही दररोज घेतलेली 
              एक निवड आहे. आमच्या आयुष्यातील या नवीन प्रकरणात पाऊल ठेवताना, आम्ही आमची 
              गोष्ट एकत्र लिहिण्यास उत्सुक आहोत, परंपरा, मूल्ये आणि अनंत प्रेमाची सुंदर भरतकाम तयार करत आहोत.
            </p>
          </div>
        </div>

        {/* Quote */}
        <div className="mt-16 text-center">
          <div className="glass-card max-w-2xl mx-auto">
            <blockquote className="font-serif text-xl md:text-2xl text-wedding-gold italic">
              "सत्यम् शिवम् सुन्दरम्"
            </blockquote>
            <p className="mt-2 text-wedding-cream/80">
              सत्य, कल्याण आणि सौंदर्य - आमच्या मिलनाचा पाया
            </p>
          </div>
        </div>
      </div>
    </section>;
};
export default OurStory;
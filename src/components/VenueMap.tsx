import { MapPin, Navigation, Phone, Clock } from "lucide-react";
const VenueMap = () => {
  return <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in-up">
          <h2 className="font-serif text-4xl md:text-5xl text-wedding-gold mb-4">
            विवाह स्थळ
          </h2>
          <div className="w-24 h-1 bg-wedding-maroon mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Venue Details */}
          <div className="space-y-6 fade-in-up">
            <div className="glass-card">
              <div className="flex items-center mb-4">
                <MapPin className="text-wedding-gold mr-3" size={28} />
                <h3 className="font-serif text-2xl text-wedding-maroon text-amber-200">कोऱ्हाळे लॉन्स</h3>
              </div>
              <p className="text-wedding-cream/90 leading-relaxed mb-4">
                उरुळी कांचन, पुणे येथील आमच्या सुंदर विवाह स्थळावर आमच्यासोबत सामील व्हा, 
                जिथे परंपरा आणि शोभा यांचा मेळ आहे. हे ठिकाण आमच्या विशेष दिवसासाठी 
                कुटुंब आणि मित्रांच्या आशीर्वादाने वेढलेले एक परिपूर्ण वातावरण देण्यासाठी 
                काळजीपूर्वक निवडले गेले आहे.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center text-wedding-cream/80">
                  <Clock className="mr-2 text-wedding-gold" size={18} />
                  <span>विवाह समारंभ संध्याकाळी ४:५६ वाजता सुरू होईल</span>
                </div>
                <div className="flex items-center text-wedding-cream/80">
                  <Navigation className="mr-2 text-wedding-gold" size={18} />
                  <span>सहज पोहोचण्यासाठी पुरेशी पार्किंग सुविधा</span>
                </div>
                <div className="flex items-center text-wedding-cream/80">
                  <Phone className="mr-2 text-wedding-gold" size={18} />
                  <span>दिशानिर्देशांसाठी संपर्क: ७२७६६१११०० - निखिल शिवले</span>
                </div>
              </div>
            </div>

            <div className="glass-card">
              <h4 className="font-serif text-xl text-wedding-maroon mb-3 text-amber-200">
                प्रवास माहिती
              </h4>
              <ul className="space-y-2 text-wedding-cream/80 text-sm">
                <li>• सर्व पाहुण्यांसाठी मोफत पार्किंग उपलब्ध</li>
                <li>• पारंपरिक सजावटीसह वातानुकूलित मंडप</li>
                <li>• प्रेमाने तयार केलेले शुद्ध शाकाहारी जेवण</li>
                <li>• फोटोग्राफी आणि व्हिडिओग्राफीची व्यवस्था</li>
              </ul>
            </div>
          </div>

          {/* Google Map Embed */}
          <div className="fade-in-up">
            <div className="glass-card p-2">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3785.0123456789!2d73.9876543!3d18.5432109!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c0123456789:0x987654321!2sF4PW%2BPG8%2C%20Uruli%20Kanchan%2C%20Maharashtra%20412202!5e0!3m2!1sen!2sin!4v1645123456789!5m2!1sen!2sin" width="100%" height="400" style={{
              border: 0,
              borderRadius: '12px'
            }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="कोऱ्हाळे लॉन्स - Wedding Venue Location" className="rounded-xl" />
            </div>
            
            <div className="mt-4 text-center">
              <a href="https://maps.app.goo.gl/yeZgTUWEhBRYoHCCA" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 bg-wedding-maroon text-wedding-cream rounded-full hover:bg-wedding-deep-maroon transition-colors font-sans font-medium">
                <Navigation className="mr-2" size={18} />
                दिशानिर्देश घ्या
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default VenueMap;
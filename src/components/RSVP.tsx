import { useState } from "react";
import { Send, Heart, Users, Phone, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RSVP = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "1",
    attendance: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would submit to a backend
    toast({
      title: "RSVP Submitted! 🎉",
      description: "Thank you for confirming your attendance. We can't wait to celebrate with you!",
      duration: 5000,
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      guests: "1",
      attendance: "",
      message: ""
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in-up">
          <h2 className="font-serif text-4xl md:text-5xl text-wedding-gold mb-4">
            RSVP
          </h2>
          <div className="w-24 h-1 bg-wedding-maroon mx-auto mb-4"></div>
          <p className="text-wedding-cream/80 font-sans">
            Your presence will make our special day even more beautiful
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* RSVP Form */}
          <div className="glass-card fade-in-up">
            <div className="flex items-center mb-6">
              <Heart className="text-wedding-gold mr-3" size={24} fill="currentColor" />
              <h3 className="font-serif text-2xl text-wedding-maroon">Confirm Your Attendance</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-wedding-cream/90 font-sans text-sm mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-wedding-gold/30 rounded-lg text-wedding-cream placeholder-wedding-cream/50 focus:outline-none focus:border-wedding-gold transition-colors"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-wedding-cream/90 font-sans text-sm mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-wedding-gold/30 rounded-lg text-wedding-cream placeholder-wedding-cream/50 focus:outline-none focus:border-wedding-gold transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-wedding-cream/90 font-sans text-sm mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-wedding-gold/30 rounded-lg text-wedding-cream placeholder-wedding-cream/50 focus:outline-none focus:border-wedding-gold transition-colors"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-wedding-cream/90 font-sans text-sm mb-2">
                    Number of Guests
                  </label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-wedding-gold/30 rounded-lg text-wedding-cream focus:outline-none focus:border-wedding-gold transition-colors"
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5+">5+ Guests</option>
                  </select>
                </div>

                <div>
                  <label className="block text-wedding-cream/90 font-sans text-sm mb-2">
                    Will you attend? *
                  </label>
                  <select
                    name="attendance"
                    value={formData.attendance}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-wedding-gold/30 rounded-lg text-wedding-cream focus:outline-none focus:border-wedding-gold transition-colors"
                  >
                    <option value="">Please select</option>
                    <option value="yes">Yes, I'll be there!</option>
                    <option value="no">Sorry, can't make it</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-wedding-cream/90 font-sans text-sm mb-2">
                  Special Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-wedding-gold/30 rounded-lg text-wedding-cream placeholder-wedding-cream/50 focus:outline-none focus:border-wedding-gold transition-colors resize-none"
                  placeholder="Share your blessings and wishes for the couple..."
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center px-6 py-3 bg-wedding-maroon text-wedding-cream rounded-lg hover:bg-wedding-deep-maroon transition-colors font-sans font-medium"
              >
                <Send className="mr-2" size={18} />
                Submit RSVP
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6 fade-in-up">
            <div className="glass-card">
              <div className="flex items-center mb-4">
                <Users className="text-wedding-gold mr-3" size={24} />
                <h3 className="font-serif text-2xl text-wedding-maroon">Contact Us</h3>
              </div>
              <p className="text-wedding-cream/90 mb-6">
                Have questions about the wedding? Need directions or special accommodations? 
                We're here to help make your experience wonderful.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="text-wedding-gold mr-3" size={20} />
                  <div>
                    <p className="text-wedding-cream font-medium">Nikhil's Family</p>
                    <p className="text-wedding-cream/80 text-sm">+91 XXXXX XXXXX</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Phone className="text-wedding-gold mr-3" size={20} />
                  <div>
                    <p className="text-wedding-cream font-medium">Nikita's Family</p>
                    <p className="text-wedding-cream/80 text-sm">+91 XXXXX XXXXX</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Mail className="text-wedding-gold mr-3" size={20} />
                  <div>
                    <p className="text-wedding-cream font-medium">Email</p>
                    <p className="text-wedding-cream/80 text-sm">wedding@nikhilnikita.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card text-center">
              <h4 className="font-serif text-xl text-wedding-gold mb-2">
                "अतिथि देवो भव:"
              </h4>
              <p className="text-wedding-cream/80 text-sm">
                Our guests are our gods. Your presence is the greatest gift to us.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RSVP;
// API service for Lovable integration and admin data management

interface UploadResponse {
  url: string;
  id: string;
}

interface FontData {
  id: string;
  name: string;
  url: string;
  category: 'system' | 'marathi' | 'custom';
  isActive: boolean;
}

interface AdminData {
  hero: {
    groomName: string;
    brideName: string;
    weddingDate: string;
    weddingTime: string;
    venue: string;
    venueLink: string;
    ganpatiImage: string;
    kalashImage: string;
    swastikImage: string;
    leftLampImage: string;
    rightLampImage: string;
    fontFamily: string;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };

  photoGallery: {
    slides: {
      id: string;
      src: string;
      label: string;
    }[];
  };
  story: {
    title: string;
    content: string;
    images: string[];
    cards: {
      id: string;
      title: string;
      content: string;
      image: string;
      fontFamily: string;
      textColor: string;
      backgroundColor: string;
    }[];
    fontFamily: string;
    textColor: string;
    backgroundColor: string;
  };
  schedule: {
    events: {
      id: string;
      time: string;
      event: string;
      description: string;
    }[];
    fontFamily: string;
    textColor: string;
    backgroundColor: string;
  };
  patrika: {
    title: string;
    content: string;
    images: string[];
    fontFamily: string;
    textColor: string;
    backgroundColor: string;
  };
  venue: {
    name: string;
    address: string;
    mapLink: string;
    images: string[];
    fontFamily: string;
    textColor: string;
    backgroundColor: string;
  };
  fonts: FontData[];
  settings: {
    isLive: boolean;
    showCountdown: boolean;
    showRSVP: boolean;
    adminPassword: string;
  };
}

// API Configuration - Using a simple public API for real-time data sharing
const API_BASE_URL = 'https://api.jsonbin.io/v3';
const PROJECT_ID = 'f2c02011-3905-49a7-ba0a-9fda3179f2f1';
const API_KEY = '$2a$10$8Lb6U.06682SYnqVMwsuYOIfw2r6h3wm8/7PMI/RZUYqnXSwQAoQi'; // This will be replaced with a real key

class ApiService {
  private static instance: ApiService;
  private adminData: AdminData | null = null;
  private binId: string | null = null;

  static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  // Upload image to backend storage
  async uploadImage(file: File): Promise<UploadResponse> {
    try {
      // For demo purposes, convert to base64
      // In production, you'd upload to a real storage service like AWS S3, Cloudinary, etc.
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve({
            url: e.target?.result as string,
            id: Date.now().toString()
          });
        };
        reader.readAsDataURL(file);
      });
    } catch (error) {
      console.log('Using fallback upload method:', error);
      
      // Fallback: convert to base64 for demo
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve({
            url: e.target?.result as string,
            id: Date.now().toString()
          });
        };
        reader.readAsDataURL(file);
      });
    }
  }

  // Upload font to backend storage
  async uploadFont(file: File): Promise<UploadResponse> {
    try {
      // For demo purposes, convert to base64
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve({
            url: e.target?.result as string,
            id: Date.now().toString()
          });
        };
        reader.readAsDataURL(file);
      });
    } catch (error) {
      console.log('Using fallback font upload method:', error);
      
      // Fallback: convert to base64 for demo
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve({
            url: e.target?.result as string,
            id: Date.now().toString()
          });
        };
        reader.readAsDataURL(file);
      });
    }
  }

  // Save admin data to backend API for real-time sharing
  async saveAdminData(data: AdminData): Promise<void> {
    try {
      // Save to a public API that others can access
      const response = await fetch(`${API_BASE_URL}/b`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': API_KEY,
        },
        body: JSON.stringify({
          projectId: PROJECT_ID,
          data: data,
          timestamp: new Date().toISOString(),
          version: '1.0'
        })
      });

      if (response.ok) {
        const result = await response.json();
        this.binId = result.metadata.id;
        console.log('Admin data saved to backend successfully. Bin ID:', this.binId);
        
        // Save the bin ID for future access
        localStorage.setItem('weddingBinId', this.binId);
      } else {
        throw new Error(`Save failed: ${response.statusText}`);
      }
      
      // Also save to localStorage as backup
      localStorage.setItem('weddingAdminData', JSON.stringify(data));
    } catch (error) {
      console.error('Backend save failed, using localStorage:', error);
      
      // Fallback to localStorage
      localStorage.setItem('weddingAdminData', JSON.stringify(data));
      console.log('Admin data saved to localStorage as fallback');
    }
  }

  // Load admin data from backend API
  async loadAdminData(): Promise<AdminData> {
    try {
      // Try to load from the saved bin ID first
      const savedBinId = localStorage.getItem('weddingBinId');
      if (savedBinId) {
        const response = await fetch(`${API_BASE_URL}/b/${savedBinId}`, {
          method: 'GET',
          headers: {
            'X-Master-Key': API_KEY,
          }
        });

        if (response.ok) {
          const result = await response.json();
          this.adminData = this.mergeWithDefaults(result.record.data);
          console.log('Admin data loaded from backend successfully');
          return this.adminData;
        }
      }

      throw new Error('No saved data found');
    } catch (error) {
      console.error('Backend load failed, trying localStorage:', error);
      
      // Try localStorage as fallback
      try {
        const localData = localStorage.getItem('weddingAdminData');
        if (localData) {
          const parsedData = JSON.parse(localData);
          this.adminData = this.mergeWithDefaults(parsedData);
          console.log('Admin data loaded from localStorage');
          return this.adminData;
        }
      } catch (localError) {
        console.error('localStorage load error:', localError);
      }

      // Return default data and save it
      const defaultData = this.getDefaultAdminData();
      this.adminData = defaultData;
      await this.saveAdminData(defaultData);
      console.log('Using default admin data');
      return defaultData;
    }
  }

  // Helper function to merge localStorage data with defaults
  private mergeWithDefaults(localData: any): AdminData {
    const defaultData = this.getDefaultAdminData();
    return {
      ...defaultData,
      ...localData,
      hero: { ...defaultData.hero, ...localData.hero },
      photoGallery: { ...defaultData.photoGallery, ...localData.photoGallery },
      story: { 
        ...defaultData.story, 
        ...localData.story,
        cards: localData.story?.cards || defaultData.story.cards
      },
      schedule: { ...defaultData.schedule, ...localData.schedule },
      patrika: { ...defaultData.patrika, ...localData.patrika },
      venue: { ...defaultData.venue, ...localData.venue },
      fonts: localData.fonts || defaultData.fonts,
      settings: { ...defaultData.settings, ...localData.settings }
    };
  }

  // Get current admin data
  getCurrentAdminData(): AdminData | null {
    return this.adminData;
  }

  // Update admin data
  updateAdminData(data: Partial<AdminData>): void {
    if (this.adminData) {
      this.adminData = { ...this.adminData, ...data };
    }
  }

  // Reset admin data to defaults
  resetToDefaults(): void {
    const defaultData = this.getDefaultAdminData();
    this.adminData = defaultData;
    this.saveAdminData(defaultData);
    console.log('Admin data reset to defaults');
  }

  // Get default admin data
  getDefaultAdminData(): AdminData {
    return {
      hero: {
        groomName: "निखिल",
        brideName: "निकिता",
        weddingDate: "गुरुवार, १४ ऑगस्ट २०२५",
        weddingTime: "संध्याकाळी ४:५६ वाजता",
        venue: "कोऱ्हाळे लॉन्स, उरुळी कांचन, पुणे",
        venueLink: "https://maps.app.goo.gl/yeZgTUWEhBRYoHCCA",
        ganpatiImage: "/lovable-uploads/b31c4c2d-6820-47f8-93e9-3dcd437a9e0f.png",
        kalashImage: "/lovable-uploads/212d81c3-bf2c-4917-b1cd-11dabc29500b.png",
        swastikImage: "/lovable-uploads/swastik.svg",
        leftLampImage: "/lovable-uploads/lamp-icon-left.svg",
        rightLampImage: "/lovable-uploads/lamp-icon-right.svg",
        fontFamily: "font-kavi",
        primaryColor: "#D4AF37",
        secondaryColor: "#F5F5DC",
        accentColor: "#8B4513"
      },
      photoGallery: {
        slides: [
          { id: "1", src: "/lovable-uploads/62454a95-bb52-42f4-81b4-c75f03fce9f4.png", label: "निखिल आणि निकिता" },
          { id: "2", src: "/lovable-uploads/pic1.JPG", label: "निखिल" },
          { id: "3", src: "/lovable-uploads/pic2.jpeg", label: "निकिता" },
          { id: "4", src: "/lovable-uploads/pic3.JPG", label: "आमचे क्षण" },
          { id: "5", src: "/lovable-uploads/5b2c07c4-30b9-4ede-9bc6-b7fa6ff07ed7.png", label: "एकत्र" },
          { id: "6", src: "/lovable-uploads/ca7b32d9-0af9-47c8-8cac-c64fa1788014.png", label: "आनंदाचे क्षण" },
          { id: "7", src: "/lovable-uploads/22b31577-6312-4006-9da1-0079d97c0c49.png", label: "प्रेमाचे क्षण" },
          { id: "8", src: "/lovable-uploads/973b8290-cf06-46fc-8bee-5ba35f35be3a.png", label: "आमचे फोटो" }
        ]
      },
      story: {
        title: "आमची प्रेमकहाणी",
        content: "श्री गणेशजीच्या आशीर्वादाने आम्ही आमच्या मिलनाचा उत्सव साजरा करण्यासाठी तुम्हाला आमंत्रित करतो",
        images: ["/src/assets/bride.jpg", "/src/assets/groom.jpg"],
        cards: [
          {
            id: "1",
            title: "प्रेमाचे क्षण",
            content: "श्री गणेशजीच्या आशीर्वादाने आम्ही आमच्या मिलनाचा उत्सव साजरा करण्यासाठी तुम्हाला आमंत्रित करतो",
            image: "/src/assets/A1.jpeg",
            fontFamily: "font-kavi",
            textColor: "#2C1810",
            backgroundColor: "#FEFEFE"
          },
          {
            id: "2",
            title: "आनंदाचे क्षण",
            content: "श्री गणेशजीच्या आशीर्वादाने आम्ही आमच्या मिलनाचा उत्सव साजरा करण्यासाठी तुम्हाला आमंत्रित करतो",
            image: "/src/assets/A2.JPG",
            fontFamily: "font-serif",
            textColor: "#2C1810",
            backgroundColor: "#FEFEFE"
          },
          {
            id: "3",
            title: "एकत्र",
            content: "श्री गणेशजीच्या आशीर्वादाने आम्ही आमच्या मिलनाचा उत्सव साजरा करण्यासाठी तुम्हाला आमंत्रित करतो",
            image: "/src/assets/A3.jpeg",
            fontFamily: "font-serif",
            textColor: "#2C1810",
            backgroundColor: "#FEFEFE"
          }
        ],
        fontFamily: "font-serif",
        textColor: "#2C1810",
        backgroundColor: "#FEFEFE"
      },
      schedule: {
        events: [
          { id: "1", time: "4:00 PM", event: "गणेश पूजा", description: "श्री गणेशजीची पूजा" },
          { id: "2", time: "4:30 PM", event: "मंगलाष्टक", description: "मंगलाष्टक वाचन" },
          { id: "3", time: "5:00 PM", event: "कन्यादान", description: "कन्यादान संस्कार" },
          { id: "4", time: "5:30 PM", event: "विवाह", description: "सप्तपदी संस्कार" },
          { id: "5", time: "6:00 PM", event: "मंगलाष्टक", description: "मंगलाष्टक वाचन" },
          { id: "6", time: "6:30 PM", event: "अक्षत", description: "अक्षत वर्षाव" }
        ],
        fontFamily: "font-serif",
        textColor: "#2C1810",
        backgroundColor: "#FEFEFE"
      },
      patrika: {
        title: "विवाह पत्रिका",
        content: "श्री गणेशजीच्या आशीर्वादाने आम्ही आमच्या मिलनाचा उत्सव साजरा करण्यासाठी तुम्हाला आमंत्रित करतो",
        images: [
          "/src/assets/A1.jpeg",
          "/src/assets/A2.JPG",
          "/src/assets/A3.jpeg",
          "/src/assets/A4.JPG",
          "/src/assets/A5.jpeg"
        ],
        fontFamily: "font-kavi",
        textColor: "#2C1810",
        backgroundColor: "#FEFEFE"
      },
      venue: {
        name: "कोऱ्हाळे लॉन्स",
        address: "उरुळी कांचन, पुणे",
        mapLink: "https://maps.app.goo.gl/yeZgTUWEhBRYoHCCA",
        images: ["/src/assets/ganpati.jpg"],
        fontFamily: "font-serif",
        textColor: "#2C1810",
        backgroundColor: "#FEFEFE"
      },
      fonts: [
        { id: "1", name: "Kavi (Traditional)", url: "", category: "system", isActive: true },
        { id: "2", name: "Serif", url: "", category: "system", isActive: true },
        { id: "3", name: "Sans Serif", url: "", category: "system", isActive: true },
        { id: "4", name: "Monospace", url: "", category: "system", isActive: true },
        { id: "5", name: "Display", url: "", category: "system", isActive: true },
        { id: "6", name: "Ams", url: "", category: "marathi", isActive: true },
        { id: "7", name: "Kruti Dev", url: "", category: "marathi", isActive: true },
        { id: "8", name: "DevLys", url: "", category: "marathi", isActive: true },
        { id: "9", name: "Mangal", url: "", category: "marathi", isActive: true },
        { id: "10", name: "Nirmala UI", url: "", category: "marathi", isActive: true }
      ],
      settings: {
        isLive: true,
        showCountdown: true,
        showRSVP: true,
        adminPassword: "admin123"
      }
    };
  }

  // Get available fonts
  getAvailableFonts(): FontData[] {
    return this.adminData?.fonts || [];
  }

  // Add custom font
  async addCustomFont(file: File, name: string): Promise<FontData> {
    const result = await this.uploadFont(file);
    const newFont: FontData = {
      id: Date.now().toString(),
      name,
      url: result.url,
      category: 'custom',
      isActive: true
    };

    if (this.adminData) {
      this.adminData.fonts.push(newFont);
    }

    return newFont;
  }
}

export const apiService = ApiService.getInstance();
export type { AdminData, UploadResponse, FontData }; 
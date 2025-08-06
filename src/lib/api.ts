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

// Lovable API endpoints (these would be your actual Lovable project endpoints)
const LOVABLE_API_BASE = 'https://lovable.dev/api';
const PROJECT_ID = 'f2c02011-3905-49a7-ba0a-9fda3179f2f1'; // Your project ID

class ApiService {
  private static instance: ApiService;
  private adminData: AdminData | null = null;

  static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  // Upload image to Lovable storage
  async uploadImage(file: File): Promise<UploadResponse> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('projectId', PROJECT_ID);

      // For demo purposes, we'll simulate the upload and use fallback
      console.log('Simulating upload for demo purposes');
      throw new Error('Using fallback upload method');
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

  // Upload font to Lovable storage
  async uploadFont(file: File): Promise<UploadResponse> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('projectId', PROJECT_ID);
      formData.append('type', 'font');

      // For demo purposes, using fallback
      console.log('Simulating font upload for demo purposes');
      throw new Error('Using fallback font upload method');
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

  // Save admin data to localStorage (demo mode)
  async saveAdminData(data: AdminData): Promise<void> {
    try {
      // For demo purposes, save directly to localStorage
      localStorage.setItem('weddingAdminData', JSON.stringify(data));
      console.log('Admin data saved to localStorage');
    } catch (error) {
      console.error('Save error:', error);
      throw error;
    }
  }

  // Load admin data from localStorage (demo mode)
  async loadAdminData(): Promise<AdminData> {
    try {
      // Check localStorage first
      const localData = localStorage.getItem('weddingAdminData');
      if (localData) {
        this.adminData = JSON.parse(localData);
        console.log('Admin data loaded from localStorage');
        return this.adminData;
      }
    } catch (error) {
      console.error('Load error:', error);
    }

    // Return default data and save it
    const defaultData = this.getDefaultAdminData();
    this.adminData = defaultData;
    await this.saveAdminData(defaultData);
    console.log('Using default admin data');
    return defaultData;
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
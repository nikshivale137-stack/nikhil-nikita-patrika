import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Upload, 
  Trash2, 
  Edit, 
  Save, 
  Eye, 
  Settings, 
  Image, 
  FileText,
  Calendar,
  MapPin,
  Clock,
  Users,
  Heart,
  LogOut,
  Palette,
  Type,
  RefreshCw
} from "lucide-react";
import { toast } from "sonner";
import AdminLogin from "@/components/AdminLogin";
import { useAdminData } from "@/contexts/AdminContext";
import { apiService } from "@/lib/api";

const Admin = () => {
  const { adminData, isLoading, updateAdminData, saveAdminData, refreshAdminData } = useAdminData();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("hero");
  const [uploadingImage, setUploadingImage] = useState<string | null>(null);
  const [isAddSlideModalOpen, setIsAddSlideModalOpen] = useState(false);
  const [newSlideData, setNewSlideData] = useState({
    label: "",
    src: ""
  });

  const handleLogin = (password: string) => {
    setIsAuthenticated(true);
    localStorage.setItem('adminAuthenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuthenticated');
    toast.success("Logged out successfully!");
  };

  useEffect(() => {
    const authenticated = localStorage.getItem('adminAuthenticated');
    if (authenticated) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleImageUpload = async (field: string, file: File) => {
    try {
      setUploadingImage(field);
      const result = await apiService.uploadImage(file);
      
      updateAdminData({
        hero: {
          ...adminData!.hero,
          [field]: result.url
        }
      });
      
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setUploadingImage(null);
    }
  };

  const handleSave = async () => {
    await saveAdminData();
    setIsEditing(false);
  };



  const handlePhotoGalleryUpload = async (id: string, file: File) => {
    try {
      setUploadingImage(id);
      const result = await apiService.uploadImage(file);
      
      const updatedSlides = adminData!.photoGallery.slides.map(slide => 
        slide.id === id ? { ...slide, src: result.url } : slide
      );
      
      updateAdminData({ 
        photoGallery: { 
          ...adminData.photoGallery, 
          slides: updatedSlides 
        } 
      });
      toast.success("Photo Gallery image uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload Photo Gallery image");
    } finally {
      setUploadingImage(null);
    }
  };

  const handleDeletePhotoGallerySlide = (id: string) => {
    const updatedSlides = adminData!.photoGallery.slides.filter(slide => slide.id !== id);
    updateAdminData({ 
      photoGallery: { 
        ...adminData.photoGallery, 
        slides: updatedSlides 
      } 
    });
    toast.success("Photo Gallery slide deleted successfully!");
  };

  const handleAddPhotoGallerySlide = () => {
    setIsAddSlideModalOpen(true);
  };

  const handleSubmitNewSlide = async () => {
    if (!newSlideData.label.trim() || !newSlideData.src.trim()) {
      toast.error("Please fill in both label and image");
      return;
    }

    const newSlide = {
      id: Date.now().toString(),
      src: newSlideData.src,
      label: newSlideData.label
    };
    
    const updatedSlides = [...adminData!.photoGallery.slides, newSlide];
    updateAdminData({ 
      photoGallery: { 
        ...adminData.photoGallery, 
        slides: updatedSlides 
      } 
    });

    // Reset form and close modal
    setNewSlideData({ label: "", src: "" });
    setIsAddSlideModalOpen(false);
    toast.success("New slide added successfully!");
  };

  const handleNewSlideImageUpload = async (file: File) => {
    try {
      const result = await apiService.uploadImage(file);
      setNewSlideData(prev => ({ ...prev, src: result.url }));
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload image");
    }
  };

  const fontOptions = [
    { value: "font-kavi", label: "Kavi (Traditional)" },
    { value: "font-serif", label: "Serif" },
    { value: "font-sans", label: "Sans Serif" },
    { value: "font-mono", label: "Monospace" },
    { value: "font-display", label: "Display" }
  ];

  const colorOptions = [
    { value: "#D4AF37", label: "Gold" },
    { value: "#8B4513", label: "Brown" },
    { value: "#2C1810", label: "Dark Brown" },
    { value: "#F5F5DC", label: "Cream" },
    { value: "#FEFEFE", label: "White" },
    { value: "#FFD700", label: "Bright Gold" },
    { value: "#CD853F", label: "Sandy Brown" },
    { value: "#DEB887", label: "Burlywood" },
    { value: "#F4A460", label: "Sandy Brown" },
    { value: "#D2691E", label: "Chocolate" }
  ];

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  if (isLoading || !adminData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-50 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <RefreshCw className="w-6 h-6 animate-spin" />
          <span>Loading admin data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Wedding Admin Panel</h1>
              <p className="text-gray-600">Manage your wedding website content and styling</p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant={isEditing ? "destructive" : "outline"}
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Cancel" : "Edit Mode"}
              </Button>
              {isEditing && (
                <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              )}
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="hero" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Hero
            </TabsTrigger>

            <TabsTrigger value="photoGallery" className="flex items-center gap-2">
              <Image className="w-4 h-4" />
              Photo Gallery
            </TabsTrigger>
            <TabsTrigger value="story" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Story
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Schedule
            </TabsTrigger>
            <TabsTrigger value="patrika" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Patrika
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Hero Section */}
          <TabsContent value="hero" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Hero Section Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Content Management */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="groomName">Groom Name</Label>
                      <Input
                        id="groomName"
                        value={adminData.hero.groomName}
                        onChange={(e) => updateAdminData({
                          hero: { ...adminData.hero, groomName: e.target.value }
                        })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="brideName">Bride Name</Label>
                      <Input
                        id="brideName"
                        value={adminData.hero.brideName}
                        onChange={(e) => updateAdminData({
                          hero: { ...adminData.hero, brideName: e.target.value }
                        })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="weddingDate">Wedding Date</Label>
                      <Input
                        id="weddingDate"
                        value={adminData.hero.weddingDate}
                        onChange={(e) => updateAdminData({
                          hero: { ...adminData.hero, weddingDate: e.target.value }
                        })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="weddingTime">Wedding Time</Label>
                      <Input
                        id="weddingTime"
                        value={adminData.hero.weddingTime}
                        onChange={(e) => updateAdminData({
                          hero: { ...adminData.hero, weddingTime: e.target.value }
                        })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="venue">Venue</Label>
                      <Input
                        id="venue"
                        value={adminData.hero.venue}
                        onChange={(e) => updateAdminData({
                          hero: { ...adminData.hero, venue: e.target.value }
                        })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="venueLink">Venue Link</Label>
                      <Input
                        id="venueLink"
                        value={adminData.hero.venueLink}
                        onChange={(e) => updateAdminData({
                          hero: { ...adminData.hero, venueLink: e.target.value }
                        })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>

                {/* Styling Options */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    Styling Options
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>Font Family</Label>
                      <Select
                        value={adminData.hero.fontFamily}
                        onValueChange={(value) => updateAdminData({
                          hero: { ...adminData.hero, fontFamily: value }
                        })}
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {fontOptions.map((font) => (
                            <SelectItem key={font.value} value={font.value}>
                              {font.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Primary Color</Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={adminData.hero.primaryColor}
                          onChange={(e) => updateAdminData({
                            hero: { ...adminData.hero, primaryColor: e.target.value }
                          })}
                          disabled={!isEditing}
                          className="w-16 h-10"
                        />
                        <Select
                          value={adminData.hero.primaryColor}
                          onValueChange={(value) => updateAdminData({
                            hero: { ...adminData.hero, primaryColor: value }
                          })}
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {colorOptions.map((color) => (
                              <SelectItem key={color.value} value={color.value}>
                                {color.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label>Secondary Color</Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={adminData.hero.secondaryColor}
                          onChange={(e) => updateAdminData({
                            hero: { ...adminData.hero, secondaryColor: e.target.value }
                          })}
                          disabled={!isEditing}
                          className="w-16 h-10"
                        />
                        <Select
                          value={adminData.hero.secondaryColor}
                          onValueChange={(value) => updateAdminData({
                            hero: { ...adminData.hero, secondaryColor: value }
                          })}
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {colorOptions.map((color) => (
                              <SelectItem key={color.value} value={color.value}>
                                {color.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Image Management */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Image className="w-5 h-5" />
                    Image Management
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries({
                      ganpatiImage: "Ganpati Image",
                      kalashImage: "Kalash Image", 
                      swastikImage: "Swastik Image",
                      leftLampImage: "Left Lamp",
                      rightLampImage: "Right Lamp"
                    }).map(([key, label]) => (
                      <div key={key} className="space-y-2">
                        <Label>{label}</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            value={adminData.hero[key as keyof typeof adminData.hero]}
                            onChange={(e) => updateAdminData({
                              hero: { ...adminData.hero, [key]: e.target.value }
                            })}
                            disabled={!isEditing}
                          />
                          {isEditing && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const input = document.createElement('input');
                                input.type = 'file';
                                input.accept = 'image/*';
                                input.onchange = (e) => {
                                  const file = (e.target as HTMLInputElement).files?.[0];
                                  if (file) handleImageUpload(key, file);
                                };
                                input.click();
                              }}
                              disabled={uploadingImage === key}
                            >
                              {uploadingImage === key ? (
                                <RefreshCw className="w-4 h-4 animate-spin" />
                              ) : (
                                <Upload className="w-4 h-4" />
                              )}
                            </Button>
                          )}
                        </div>
                        {adminData.hero[key as keyof typeof adminData.hero] && (
                          <img 
                            src={adminData.hero[key as keyof typeof adminData.hero]} 
                            alt={label}
                            className="w-20 h-20 object-cover rounded border"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>



          {/* Photo Gallery Section */}
          <TabsContent value="photoGallery" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Image className="w-5 h-5" />
                  Photo Gallery Slides Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing && (
                  <Dialog open={isAddSlideModalOpen} onOpenChange={setIsAddSlideModalOpen}>
                    <DialogTrigger asChild>
                      <Button onClick={handleAddPhotoGallerySlide} className="mb-4">
                        <Upload className="w-4 h-4 mr-2" />
                        Add New Slide
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Add New Photo Gallery Slide</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="slide-label">Slide Label</Label>
                          <Input
                            id="slide-label"
                            value={newSlideData.label}
                            onChange={(e) => setNewSlideData(prev => ({ ...prev, label: e.target.value }))}
                            placeholder="Enter slide label (e.g., निखिल आणि निकिता)"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="slide-image">Slide Image</Label>
                          <div className="flex items-center gap-2">
                            <Input
                              id="slide-image"
                              value={newSlideData.src}
                              onChange={(e) => setNewSlideData(prev => ({ ...prev, src: e.target.value }))}
                              placeholder="Image URL or upload file"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const input = document.createElement('input');
                                input.type = 'file';
                                input.accept = 'image/*';
                                input.onchange = (e) => {
                                  const file = (e.target as HTMLInputElement).files?.[0];
                                  if (file) handleNewSlideImageUpload(file);
                                };
                                input.click();
                              }}
                            >
                              <Upload className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        {newSlideData.src && (
                          <div className="grid gap-2">
                            <Label>Preview</Label>
                            <img 
                              src={newSlideData.src} 
                              alt="Preview"
                              className="w-full h-32 object-cover rounded"
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsAddSlideModalOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleSubmitNewSlide}>
                          Add Slide
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {adminData.photoGallery.slides.map((slide) => (
                    <div key={slide.id} className="border rounded-lg p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <Input
                          value={slide.label}
                          onChange={(e) => {
                            const updatedSlides = adminData.photoGallery.slides.map(s => 
                              s.id === slide.id ? { ...s, label: e.target.value } : s
                            );
                            updateAdminData({ 
                              photoGallery: { 
                                ...adminData.photoGallery, 
                                slides: updatedSlides 
                              } 
                            });
                          }}
                          disabled={!isEditing}
                          placeholder="Slide label"
                        />
                        {isEditing && (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeletePhotoGallerySlide(slide.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Input
                          value={slide.src}
                          onChange={(e) => {
                            const updatedSlides = adminData.photoGallery.slides.map(s => 
                              s.id === slide.id ? { ...s, src: e.target.value } : s
                            );
                            updateAdminData({ 
                              photoGallery: { 
                                ...adminData.photoGallery, 
                                slides: updatedSlides 
                              } 
                            });
                          }}
                          disabled={!isEditing}
                          placeholder="Image URL"
                        />
                        {isEditing && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const input = document.createElement('input');
                              input.type = 'file';
                              input.accept = 'image/*';
                              input.onchange = (e) => {
                                const file = (e.target as HTMLInputElement).files?.[0];
                                if (file) handlePhotoGalleryUpload(slide.id, file);
                              };
                              input.click();
                            }}
                            disabled={uploadingImage === slide.id}
                          >
                            {uploadingImage === slide.id ? (
                              <RefreshCw className="w-4 h-4 animate-spin" />
                            ) : (
                              <Upload className="w-4 h-4" />
                            )}
                          </Button>
                        )}
                      </div>
                      {slide.src && (
                        <img 
                          src={slide.src} 
                          alt={slide.label}
                          className="w-full h-32 object-cover rounded"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Story Section */}
          <TabsContent value="story" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Our Story Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="storyTitle">Story Title</Label>
                  <Input
                    id="storyTitle"
                    value={adminData.story.title}
                    onChange={(e) => updateAdminData({
                      story: { ...adminData.story, title: e.target.value }
                    })}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="storyContent">Story Content</Label>
                  <Textarea
                    id="storyContent"
                    value={adminData.story.content}
                    onChange={(e) => updateAdminData({
                      story: { ...adminData.story, content: e.target.value }
                    })}
                    disabled={!isEditing}
                    rows={6}
                  />
                </div>

                {/* Story Styling */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    Story Styling
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>Font Family</Label>
                      <Select
                        value={adminData.story.fontFamily}
                        onValueChange={(value) => updateAdminData({
                          story: { ...adminData.story, fontFamily: value }
                        })}
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {fontOptions.map((font) => (
                            <SelectItem key={font.value} value={font.value}>
                              {font.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Text Color</Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={adminData.story.textColor}
                          onChange={(e) => updateAdminData({
                            story: { ...adminData.story, textColor: e.target.value }
                          })}
                          disabled={!isEditing}
                          className="w-16 h-10"
                        />
                        <Select
                          value={adminData.story.textColor}
                          onValueChange={(value) => updateAdminData({
                            story: { ...adminData.story, textColor: value }
                          })}
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {colorOptions.map((color) => (
                              <SelectItem key={color.value} value={color.value}>
                                {color.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label>Background Color</Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={adminData.story.backgroundColor}
                          onChange={(e) => updateAdminData({
                            story: { ...adminData.story, backgroundColor: e.target.value }
                          })}
                          disabled={!isEditing}
                          className="w-16 h-10"
                        />
                        <Select
                          value={adminData.story.backgroundColor}
                          onValueChange={(value) => updateAdminData({
                            story: { ...adminData.story, backgroundColor: value }
                          })}
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {colorOptions.map((color) => (
                              <SelectItem key={color.value} value={color.value}>
                                {color.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Story Images</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    {adminData.story.images.map((image, index) => (
                      <div key={index} className="space-y-2">
                        <Input
                          value={image}
                          onChange={(e) => {
                            const newImages = [...adminData.story.images];
                            newImages[index] = e.target.value;
                            updateAdminData({
                              story: { ...adminData.story, images: newImages }
                            });
                          }}
                          disabled={!isEditing}
                        />
                        {image && (
                          <img 
                            src={image} 
                            alt={`Story image ${index + 1}`}
                            className="w-full h-32 object-cover rounded"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Schedule Section */}
          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Ceremony Schedule Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing && (
                  <Button 
                    onClick={() => {
                      const newEvent = {
                        id: Date.now().toString(),
                        time: "",
                        event: "",
                        description: ""
                      };
                      const updatedEvents = [...adminData.schedule.events, newEvent];
                      updateAdminData({
                        schedule: { ...adminData.schedule, events: updatedEvents }
                      });
                    }}
                    className="mb-4"
                  >
                    Add New Event
                  </Button>
                )}

                {/* Schedule Styling */}
                <div className="space-y-4 mb-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    Schedule Styling
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>Font Family</Label>
                      <Select
                        value={adminData.schedule.fontFamily}
                        onValueChange={(value) => updateAdminData({
                          schedule: { ...adminData.schedule, fontFamily: value }
                        })}
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {fontOptions.map((font) => (
                            <SelectItem key={font.value} value={font.value}>
                              {font.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Text Color</Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={adminData.schedule.textColor}
                          onChange={(e) => updateAdminData({
                            schedule: { ...adminData.schedule, textColor: e.target.value }
                          })}
                          disabled={!isEditing}
                          className="w-16 h-10"
                        />
                        <Select
                          value={adminData.schedule.textColor}
                          onValueChange={(value) => updateAdminData({
                            schedule: { ...adminData.schedule, textColor: value }
                          })}
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {colorOptions.map((color) => (
                              <SelectItem key={color.value} value={color.value}>
                                {color.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label>Background Color</Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={adminData.schedule.backgroundColor}
                          onChange={(e) => updateAdminData({
                            schedule: { ...adminData.schedule, backgroundColor: e.target.value }
                          })}
                          disabled={!isEditing}
                          className="w-16 h-10"
                        />
                        <Select
                          value={adminData.schedule.backgroundColor}
                          onValueChange={(value) => updateAdminData({
                            schedule: { ...adminData.schedule, backgroundColor: value }
                          })}
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {colorOptions.map((color) => (
                              <SelectItem key={color.value} value={color.value}>
                                {color.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {adminData.schedule.events.map((event, index) => (
                    <div key={event.id} className="border rounded-lg p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">Event {index + 1}</h4>
                        {isEditing && (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              const updatedEvents = adminData.schedule.events.filter(e => e.id !== event.id);
                              updateAdminData({
                                schedule: { ...adminData.schedule, events: updatedEvents }
                              });
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label>Time</Label>
                          <Input
                            value={event.time}
                            onChange={(e) => {
                              const updatedEvents = [...adminData.schedule.events];
                              updatedEvents[index] = { ...event, time: e.target.value };
                              updateAdminData({
                                schedule: { ...adminData.schedule, events: updatedEvents }
                              });
                            }}
                            disabled={!isEditing}
                          />
                        </div>
                        <div>
                          <Label>Event</Label>
                          <Input
                            value={event.event}
                            onChange={(e) => {
                              const updatedEvents = [...adminData.schedule.events];
                              updatedEvents[index] = { ...event, event: e.target.value };
                              updateAdminData({
                                schedule: { ...adminData.schedule, events: updatedEvents }
                              });
                            }}
                            disabled={!isEditing}
                          />
                        </div>
                        <div>
                          <Label>Description</Label>
                          <Input
                            value={event.description}
                            onChange={(e) => {
                              const updatedEvents = [...adminData.schedule.events];
                              updatedEvents[index] = { ...event, description: e.target.value };
                              updateAdminData({
                                schedule: { ...adminData.schedule, events: updatedEvents }
                              });
                            }}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Patrika Section */}
          <TabsContent value="patrika" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Patrika Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="patrikaTitle">Patrika Title</Label>
                  <Input
                    id="patrikaTitle"
                    value={adminData.patrika.title}
                    onChange={(e) => updateAdminData({
                      patrika: { ...adminData.patrika, title: e.target.value }
                    })}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="patrikaContent">Patrika Content</Label>
                  <Textarea
                    id="patrikaContent"
                    value={adminData.patrika.content}
                    onChange={(e) => updateAdminData({
                      patrika: { ...adminData.patrika, content: e.target.value }
                    })}
                    disabled={!isEditing}
                    rows={6}
                  />
                </div>

                {/* Patrika Styling */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    Patrika Styling
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>Font Family</Label>
                      <Select
                        value={adminData.patrika.fontFamily}
                        onValueChange={(value) => updateAdminData({
                          patrika: { ...adminData.patrika, fontFamily: value }
                        })}
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {fontOptions.map((font) => (
                            <SelectItem key={font.value} value={font.value}>
                              {font.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Text Color</Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={adminData.patrika.textColor}
                          onChange={(e) => updateAdminData({
                            patrika: { ...adminData.patrika, textColor: e.target.value }
                          })}
                          disabled={!isEditing}
                          className="w-16 h-10"
                        />
                        <Select
                          value={adminData.patrika.textColor}
                          onValueChange={(value) => updateAdminData({
                            patrika: { ...adminData.patrika, textColor: value }
                          })}
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {colorOptions.map((color) => (
                              <SelectItem key={color.value} value={color.value}>
                                {color.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label>Background Color</Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={adminData.patrika.backgroundColor}
                          onChange={(e) => updateAdminData({
                            patrika: { ...adminData.patrika, backgroundColor: e.target.value }
                          })}
                          disabled={!isEditing}
                          className="w-16 h-10"
                        />
                        <Select
                          value={adminData.patrika.backgroundColor}
                          onValueChange={(value) => updateAdminData({
                            patrika: { ...adminData.patrika, backgroundColor: value }
                          })}
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {colorOptions.map((color) => (
                              <SelectItem key={color.value} value={color.value}>
                                {color.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Patrika Images</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                    {adminData.patrika.images.map((image, index) => (
                      <div key={index} className="space-y-2">
                        <Input
                          value={image}
                          onChange={(e) => {
                            const newImages = [...adminData.patrika.images];
                            newImages[index] = e.target.value;
                            updateAdminData({
                              patrika: { ...adminData.patrika, images: newImages }
                            });
                          }}
                          disabled={!isEditing}
                        />
                        {image && (
                          <img 
                            src={image} 
                            alt={`Patrika image ${index + 1}`}
                            className="w-full h-32 object-cover rounded"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Section */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Website Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Website Live</Label>
                      <p className="text-sm text-gray-600">Make the website publicly accessible</p>
                    </div>
                    <Switch
                      checked={adminData.settings.isLive}
                      onCheckedChange={(checked) => updateAdminData({
                        settings: { ...adminData.settings, isLive: checked }
                      })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Show Countdown</Label>
                      <p className="text-sm text-gray-600">Display the wedding countdown timer</p>
                    </div>
                    <Switch
                      checked={adminData.settings.showCountdown}
                      onCheckedChange={(checked) => updateAdminData({
                        settings: { ...adminData.settings, showCountdown: checked }
                      })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Show RSVP</Label>
                      <p className="text-sm text-gray-600">Enable RSVP functionality</p>
                    </div>
                    <Switch
                      checked={adminData.settings.showRSVP}
                      onCheckedChange={(checked) => updateAdminData({
                        settings: { ...adminData.settings, showRSVP: checked }
                      })}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="adminPassword">Admin Password</Label>
                  <Input
                    id="adminPassword"
                    type="password"
                    value={adminData.settings.adminPassword}
                    onChange={(e) => updateAdminData({
                      settings: { ...adminData.settings, adminPassword: e.target.value }
                    })}
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin; 
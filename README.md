# Nikhil & Nikita Wedding Website

A beautiful wedding invitation website with a comprehensive admin panel for managing content, images, and styling.

## 🚀 Features

### For Visitors
- **Beautiful Hero Section** with animated countdown
- **Photo Gallery** with auto-sliding carousel
- **Our Story** section with dynamic content
- **Schedule** of wedding events
- **Patrika** section with wedding details
- **Responsive Design** for all devices

### For Administrators
- **Complete Admin Panel** at `/admin`
- **Real-time Content Management** - changes appear instantly
- **Photo Gallery Management** - add, edit, delete photos
- **Story Management** - edit story cards and content
- **Styling Options** - change fonts, colors, backgrounds
- **Image Upload** - upload new images directly
- **Settings Management** - control website features

## 🔧 Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Set up Real-time Data Sharing

To enable real-time data sharing so others can see your changes:

#### Option A: Using JSONBin.io (Free)
1. Go to [JSONBin.io](https://jsonbin.io)
2. Create a free account
3. Get your API key
4. Update the API key in `src/lib/api.ts`:
```typescript
const API_KEY = 'your-jsonbin-api-key-here';
```

#### Option B: Using Firebase (Recommended)
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable Firestore Database
4. Get your Firebase config
5. Replace the API service with Firebase integration

#### Option C: Using Your Own Backend
1. Set up a simple backend (Node.js/Express, Python/Flask, etc.)
2. Create API endpoints for saving/loading data
3. Update the API service to use your backend

### 3. Run the Development Server
```bash
npm run dev
```

### 4. Access Admin Panel
- Go to `http://localhost:5173/admin`
- Login with any password (demo mode)
- Start managing your wedding website!

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Hero.tsx        # Main hero section
│   ├── PhotoGallery.tsx # Photo carousel
│   ├── OurStory.tsx    # Story section
│   └── ImageTicker.tsx # Scrolling images
├── pages/
│   └── Admin.tsx       # Admin panel
├── contexts/
│   └── AdminContext.tsx # Global state management
├── lib/
│   └── api.ts          # API service
└── assets/             # Images and assets
```

## 🎨 Customization

### Adding New Photos
1. Go to Admin Panel → Photo Gallery
2. Click "Add New Slide"
3. Enter label and upload image
4. Save changes

### Changing Colors and Fonts
1. Go to Admin Panel → Hero/Story/Schedule
2. Use color pickers and font selectors
3. Changes apply instantly

### Editing Content
1. Go to Admin Panel → any section
2. Edit text content directly
3. Save changes to see updates

## 🌐 Deployment

### Deploy to Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Deploy automatically

### Deploy to Netlify
1. Build: `npm run build`
2. Upload `dist` folder to Netlify

### Deploy to Lovable
1. Connect your GitHub repository
2. Deploy through Lovable dashboard

## 🔐 Security Notes

- Admin panel uses simple password authentication (demo mode)
- For production, implement proper authentication
- API keys should be stored in environment variables
- Consider rate limiting for API endpoints

## 📱 Mobile Responsive

The website is fully responsive and works great on:
- 📱 Mobile phones
- 📱 Tablets
- 💻 Desktop computers
- 🖥️ Large screens

## 🎯 Real-time Updates

When you make changes in the admin panel:
1. ✅ Changes save to backend API
2. ✅ All visitors see updates immediately
3. ✅ No page refresh needed
4. ✅ Works across all devices

## 🛠️ Troubleshooting

### Admin Panel Not Working
- Check browser console for errors
- Ensure API key is configured correctly
- Try clearing browser cache

### Images Not Loading
- Check image URLs in admin panel
- Ensure images are publicly accessible
- Try uploading new images

### Changes Not Visible to Others
- Verify API configuration
- Check network connectivity
- Ensure backend service is running

## 📞 Support

For issues or questions:
1. Check the browser console for errors
2. Verify API configuration
3. Test with different browsers
4. Check network connectivity

## 🎉 Happy Wedding!

This website will help you share your special day with friends and family. The admin panel makes it easy to keep everything updated and beautiful!

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**

# WebBuzz - React Vite Business Website

This project is a modern, responsive business website built with React, Vite, and TailwindCSS. The website includes multiple sections like home, about, services, and contact with a clean, professional design optimized for performance and accessibility.

## Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Modern UI**: Clean, professional design with smooth animations
- **Performance Optimized**: Fast loading with optimized assets
- **Accessibility**: WCAG compliant with keyboard navigation support
- **SEO Friendly**: Properly structured with meta tags
- **Firebase Integration**: Contact form with Firebase backend
- **Dark Mode Support**: Seamless light and dark theme switching

## Logo Usage

The WebBuzz logo is implemented in multiple places throughout the website:

1. **Navbar**: A prominent logo display in the navigation bar
2. **Hero Section**: Larger version in the top section for brand recognition
3. **Footer**: Consistent branding at the bottom of the site
4. **Favicon**: Browser tab icon for brand visibility

All logo variants are automatically optimized for performance via the `optimize-logo.js` script. When updating the logo:

1. Replace the source logo file at `/src/assets/webbuzz-logo.png`
2. Run `npm run optimize-logo` to generate optimized variants
3. The build script automatically runs logo optimization

## Firebase Configuration

This project uses Firebase Firestore for data storage. Follow these steps to set up Firebase:

1. **Create a Firebase Project**:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Add project" and follow the setup wizard
   - Enter your project name and accept the terms

2. **Enable Firestore**:
   - In your Firebase project, go to "Firestore Database" in the left sidebar
   - Click "Create database"
   - Start in production or test mode as needed
   - Choose a location for your Firestore database

3. **Get Your Firebase Configuration**:
   - Click on the gear icon (⚙️) next to "Project Overview" and select "Project settings"
   - Scroll down to "Your apps" section
   - If you don't have an app, click the web icon (`</>`) to create one
   - Register your app with a nickname (no need to set up Firebase Hosting)
   - Copy the `firebaseConfig` object

4. **Set Up Environment Variables**:
   - Create a `.env` file in the project root (copy from `.env.example`)
   - Fill in the values from your Firebase configuration:
     ```
     VITE_FIREBASE_API_KEY=your_api_key
     VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
     VITE_FIREBASE_PROJECT_ID=your_project_id
     VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
     VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
     VITE_FIREBASE_APP_ID=your_app_id
     VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
     ```
   - Never commit the `.env` file with real credentials to version control

5. **Start Using Firestore**:
   - Import the `db` object from `src/firebase.js` to interact with Firestore
   - Example usage:
     ```js
     import { collection, getDocs } from 'firebase/firestore';
     import { db } from '../firebase';

     // Get all documents from a collection
     const querySnapshot = await getDocs(collection(db, 'your-collection'));
     querySnapshot.forEach((doc) => {
       console.log(doc.id, " => ", doc.data());
     });
     ```

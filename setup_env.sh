#!/bin/bash
echo "Setting up Vercel Environment Variables..."

# Function to add env var
add_env() {
  echo -n "$2" | vercel env add $1 production
}

add_env NEXT_PUBLIC_FIREBASE_API_KEY AIzaSyBcS7Q0A3Pr2-0wc_SIDU1MAKm1jlXbuF8
add_env NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN goldenwalk-mvp.firebaseapp.com
add_env NEXT_PUBLIC_FIREBASE_PROJECT_ID goldenwalk-mvp
add_env NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET goldenwalk-mvp.firebasestorage.app
add_env NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID 374002680942
add_env NEXT_PUBLIC_FIREBASE_APP_ID 1:374002680942:web:d3d11130d161eb4513927f

echo "Done! All environment variables added."

'use client';
import { CommunityProvider } from '../context/CommunityContext';

export default function CommunityLayout({ children }) {
  return (
    <CommunityProvider>
      {children}
    </CommunityProvider>
  );
}

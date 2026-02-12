'use client';

import { 
  Home, Map, ShoppingBag, Heart, User, 
  MapPin, Phone, Camera, Mic, Volume2, 
  Battery, Search, Menu, X, ChevronRight, 
  Calendar, Clock, Award, TrendingUp, 
  Activity, Users, AlertTriangle, CheckCircle 
} from 'lucide-react';

const icons = {
  Home, Map, ShoppingBag, Heart, User,
  MapPin, Phone, Camera, Mic, Volume2,
  Battery, Search, Menu, X, ChevronRight,
  Calendar, Clock, Award, TrendingUp,
  Activity, Users, AlertTriangle, CheckCircle
};

export default function Icon({ name, size = 24, className = "" }) {
  const LucideIcon = icons[name] || Home;
  return <LucideIcon size={size} className={className} />;
}

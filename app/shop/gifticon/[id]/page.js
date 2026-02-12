import { gifticons } from '../../../data/gifticons';
import GifticonDetailClient from './GifticonDetailClient';

// Required for static export with dynamic routes
export async function generateStaticParams() {
  return gifticons.map((item) => ({
    id: item.id,
  }));
}

export default function GifticonDetail({ params }) {
  return <GifticonDetailClient params={params} />;
}

import { Noto_Sans_KR } from 'next/font/google';
import "./globals.css";
import { VitalityProvider } from "./context/VitalityContext";
import { DeviceProvider } from "./context/DeviceContext";
import { AccessibilityProvider } from "./context/AccessibilityContext";
import Analytics from "./components/Analytics";
import { Toaster } from 'react-hot-toast';

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--font-noto',
  display: 'swap',
});

export const metadata = {
  title: "GoldenWalk 마실 — AI 시니어 헬스케어 플랫폼",
  description: "부모님의 건강한 걸음을 AI가 응원합니다. 실시간 가족 소통, 맞춤형 혜택, 그리고 감동적인 보이스 코칭을 경험하세요.",
  keywords: ["시니어 헬스케어", "만보기", "부모님 선물", "AI 코칭", "가족 안심", "GoldenWalk"],
  authors: [{ name: "GoldenWalk Team" }],
  openGraph: {
    type: "website",
    siteName: "GoldenWalk 마실",
    title: "GoldenWalk 마실 — 건강한 걸음을 위한 AI 동행",
    description: "부모님의 활력을 지키는 스마트한 방법. AI가 함께하는 건강 관리 플랫폼.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gold enWalk 마실 — AI 시니어 헬스케어",
    description: "부모님의 건강한 걸음을 AI가 응원합니다.",
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Masil",
  },
  formatDetection: {
    telephone: false,
  },
  themeColor: "#0066FF",
};

import AdaptiveContainer from "./components/AdaptiveContainer";
import VoiceAssistant from "./components/VoiceAssistant";
import BottomBar from "./components/BottomBar"; // Import added

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={notoSansKr.variable}>
      <body className="font-sans antialiased">
        <AccessibilityProvider>
          <DeviceProvider>
            <VitalityProvider>
              <div className="app-shell">
                <Analytics />
                <Toaster 
                  position="bottom-center" 
                  toastOptions={{
                    style: {
                      background: '#333',
                      color: '#fff',
                      fontSize: '16px',
                      borderRadius: '50px',
                      padding: '16px 24px',
                      zIndex: 9999,
                    }
                  }} 
                />
                <AdaptiveContainer>
                  {children}
                </AdaptiveContainer>
                <VoiceAssistant />
                <BottomBar /> {/* Globally integrated */}
              </div>
            </VitalityProvider>
          </DeviceProvider>
        </AccessibilityProvider>
      </body>
    </html>
  );
}

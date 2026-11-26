import { useEffect } from 'react';
import { MotionConfig } from 'motion/react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { GlobalModals } from './components/Modals';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { SeoHead } from './components/SeoHead';
import { HomePage } from './pages/HomePage';
import { PackagesPage } from './pages/PackagesPage';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { DownloadPage } from './pages/DownloadPage';
import { CrmDetailPage } from './pages/CrmDetailPage';
import { LegalPage } from './pages/LegalPage';
import { NotFoundPage } from './pages/NotFoundPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <AppProvider>
          <ScrollToTop />
          <SeoHead />
          <div className="flex min-h-screen flex-col bg-white">
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-[#5B21B6] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
            >
              Skip to main content
            </a>
            <Header />
            <main id="main-content" className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/crms/:crmId" element={<CrmDetailPage />} />
                <Route path="/packages" element={<PackagesPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/download" element={<DownloadPage />} />
                <Route path="/privacy-policy" element={<LegalPage type="privacy" />} />
                <Route path="/terms" element={<LegalPage type="terms" />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
            <GlobalModals />
            <FloatingWhatsApp />
          </div>
        </AppProvider>
      </BrowserRouter>
    </MotionConfig>
  );
}

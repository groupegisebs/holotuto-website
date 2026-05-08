import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CalendlyModal from './components/CalendlyModal'
import { CalendlyProvider } from './contexts/CalendlyContext'
import HeroSection from './sections/HeroSection'
import ProblemSection from './sections/ProblemSection'
import SolutionSection from './sections/SolutionSection'
import HowItWorksSection from './sections/HowItWorksSection'
import AISection from './sections/AISection'
import ResultsSection from './sections/ResultsSection'
import GamificationSection from './sections/GamificationSection'
import ParentsSection from './sections/ParentsSection'
import SchoolsSection from './sections/SchoolsSection'
import ReassuranceSection from './sections/ReassuranceSection'
import FAQSection from './sections/FAQSection'
import CTAFinalSection from './sections/CTAFinalSection'
import PrivacyPolicy from './pages/PrivacyPolicy'
import AccountDeletion from './pages/AccountDeletion'
import TermsOfUse from './pages/TermsOfUse'
import LegalNotice from './pages/LegalNotice'
import BillingSubscriptions from './pages/BillingSubscriptions'
import ChildrenDataProtection from './pages/ChildrenDataProtection'
import Contact from './pages/Contact'
import CookiesPolicy from './pages/CookiesPolicy'

function LandingPage() {
  return (
    <CalendlyProvider>
      <div className="min-h-screen bg-white font-inter">
        <Navbar />
        <main>
          <HeroSection />
          <ProblemSection />
          <SolutionSection />
          <HowItWorksSection />
          <AISection />
          <ResultsSection />
          <GamificationSection />
          <ParentsSection />
          <SchoolsSection />
          <ReassuranceSection />
          <FAQSection />
          <CTAFinalSection />
        </main>
        <Footer />
        <CalendlyModal />
      </div>
    </CalendlyProvider>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/account-deletion" element={<AccountDeletion />} />
      <Route path="/terms-of-use" element={<TermsOfUse />} />
      <Route path="/legal-notice" element={<LegalNotice />} />
      <Route path="/billing-subscriptions" element={<BillingSubscriptions />} />
      <Route path="/children-data-protection" element={<ChildrenDataProtection />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/cookies-policy" element={<CookiesPolicy />} />
    </Routes>
  )
}

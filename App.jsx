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

export default function App() {
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

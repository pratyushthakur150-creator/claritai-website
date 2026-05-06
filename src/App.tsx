import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimationProvider } from './components/AnimationProvider';
import Home from './pages/Home';
import SiaChatbot from './pages/SiaChatbot';
import VoiceAI from './pages/VoiceAI';
import CRMDashboard from './pages/CRMDashboard';
import Contact from './pages/Contact';
import About from './pages/About';
import BookDemo from './pages/BookDemo';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import InteractiveCursor from './components/InteractiveCursor';
import ChatBot from './components/ChatBot';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <AnimationProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-white cursor-none">
          <InteractiveCursor />
          <ScrollProgress />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sia-chatbot" element={<SiaChatbot />} />
            <Route path="/voice-ai" element={<VoiceAI />} />
            <Route path="/crm-dashboard" element={<CRMDashboard />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/book-demo" element={<BookDemo />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          <Footer />
          <ChatBot />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: { background: '#1F2937', color: '#fff', borderRadius: '12px', padding: '14px 20px', fontSize: '14px' },
              success: { iconTheme: { primary: '#10B981', secondary: '#fff' } },
              error: { iconTheme: { primary: '#EF4444', secondary: '#fff' } },
            }}
          />
        </div>
      </Router>
    </AnimationProvider>
  );
}

export default App;

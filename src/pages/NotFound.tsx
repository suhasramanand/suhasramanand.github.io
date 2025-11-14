import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import CrazyMenu from '@/components/CrazyMenu';
import AnimatedBackground from '@/components/AnimatedBackground';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <AnimatedBackground />
      <CrazyMenu />
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="section-container text-center">
          <h1 className="text-6xl sm:text-8xl font-serif font-bold text-black mb-4">404</h1>
          <p className="text-2xl sm:text-3xl font-serif text-ink-gray mb-2">Page Not Found</p>
          <p className="text-body text-ink-gray mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/')}
              className="minimal-button flex items-center justify-center gap-2"
            >
              <Home size={18} />
              <span>Go Home</span>
            </button>
            <button
              onClick={() => navigate(-1)}
              className="minimal-button-outline flex items-center justify-center gap-2"
            >
              <ArrowLeft size={18} />
              <span>Go Back</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;

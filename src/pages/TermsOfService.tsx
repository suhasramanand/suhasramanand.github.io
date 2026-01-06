import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import CrazyMenu from '@/components/CrazyMenu';
import AnimatedBackground from '@/components/AnimatedBackground';

const TermsOfService = () => {
  const navigate = useNavigate();

  return (
    <>
      <AnimatedBackground />
      <CrazyMenu />
      <div className="min-h-screen pt-16 pb-24">
        <div className="section-container max-w-4xl mx-auto">
          <div className="mb-8">
            <button
              onClick={() => navigate(-1)}
              className="minimal-button-outline flex items-center gap-2 mb-6"
            >
              <ArrowLeft size={18} />
              <span>Go Back</span>
            </button>
            <h1 className="section-title">Terms of Service</h1>
            <p className="text-muted mb-4">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>

          <div className="paper-card space-y-6">
            <section>
              <h2 className="text-2xl font-serif font-semibold text-black dark:text-foreground mb-4">1. Acceptance of Terms</h2>
              <p className="text-body">
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-semibold text-black dark:text-foreground mb-4">2. Use License</h2>
              <p className="text-body mb-4">
                Permission is granted to temporarily download one copy of the materials on Suhas Reddy's website for personal, 
                non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside text-body space-y-2 ml-4">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-semibold text-black dark:text-foreground mb-4">3. Disclaimer</h2>
              <p className="text-body">
                The materials on Suhas Reddy's website are provided on an 'as is' basis. Suhas Reddy makes no warranties, 
                expressed or implied, and hereby disclaims and negates all other warranties including without limitation, 
                implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement 
                of intellectual property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-semibold text-black dark:text-foreground mb-4">4. Limitations</h2>
              <p className="text-body">
                In no event shall Suhas Reddy or its suppliers be liable for any damages (including, without limitation, 
                damages for loss of data or profit, or due to business interruption) arising out of the use or inability 
                to use the materials on Suhas Reddy's website, even if Suhas Reddy or a Suhas Reddy authorized representative 
                has been notified orally or in writing of the possibility of such damage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-semibold text-black dark:text-foreground mb-4">5. Revisions</h2>
              <p className="text-body">
                Suhas Reddy may revise these terms of service for its website at any time without notice. By using this website 
                you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-semibold text-black dark:text-foreground mb-4">6. Contact Information</h2>
              <p className="text-body">
                If you have any questions about these Terms of Service, please contact me at{' '}
                <a href="mailto:reachsuhasreddy@gmail.com" className="text-black dark:text-foreground underline hover:opacity-80">
                  reachsuhasreddy@gmail.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsOfService;


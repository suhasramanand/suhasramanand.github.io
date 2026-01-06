import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import CrazyMenu from '@/components/CrazyMenu';
import AnimatedBackground from '@/components/AnimatedBackground';

const PrivacyPolicy = () => {
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
            <h1 className="section-title">Privacy Policy</h1>
            <p className="text-muted mb-4">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>

          <div className="paper-card space-y-6">
            <section>
              <h2 className="text-2xl font-serif font-semibold text-black dark:text-foreground mb-4">1. Information We Collect</h2>
              <p className="text-body mb-4">
                This website is a personal portfolio and does not actively collect personal information. However, we may collect:
              </p>
              <ul className="list-disc list-inside text-body space-y-2 ml-4">
                <li>Information you voluntarily provide through contact forms or email communications</li>
                <li>Automatically collected information such as IP addresses, browser type, and usage data through analytics tools</li>
                <li>Cookies and similar tracking technologies to enhance your browsing experience</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-semibold text-black dark:text-foreground mb-4">2. How We Use Your Information</h2>
              <p className="text-body mb-4">
                The information we collect may be used to:
              </p>
              <ul className="list-disc list-inside text-body space-y-2 ml-4">
                <li>Respond to your inquiries and provide customer support</li>
                <li>Improve the website's functionality and user experience</li>
                <li>Analyze website traffic and usage patterns</li>
                <li>Send periodic emails regarding updates or responses to your inquiries</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-semibold text-black dark:text-foreground mb-4">3. Data Protection</h2>
              <p className="text-body">
                We implement appropriate security measures to protect your personal information. However, no method of transmission 
                over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to 
                protect your personal information, we cannot guarantee its absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-semibold text-black dark:text-foreground mb-4">4. Third-Party Services</h2>
              <p className="text-body mb-4">
                This website may use third-party services for analytics, hosting, and other functions. These services may collect 
                information about your use of the website. We are not responsible for the privacy practices of these third-party services.
              </p>
              <p className="text-body">
                Third-party services used may include:
              </p>
              <ul className="list-disc list-inside text-body space-y-2 ml-4">
                <li>Google Analytics for website analytics</li>
                <li>Email service providers for contact form submissions</li>
                <li>Hosting services for website deployment</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-semibold text-black dark:text-foreground mb-4">5. Cookies</h2>
              <p className="text-body">
                This website may use cookies to enhance user experience. You can choose to accept or decline cookies. Most web browsers 
                automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-semibold text-black dark:text-foreground mb-4">6. Your Rights</h2>
              <p className="text-body mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-body space-y-2 ml-4">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate personal information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of certain data collection practices</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-semibold text-black dark:text-foreground mb-4">7. Changes to This Privacy Policy</h2>
              <p className="text-body">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy 
                on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-semibold text-black dark:text-foreground mb-4">8. Contact Information</h2>
              <p className="text-body">
                If you have any questions about this Privacy Policy, please contact me at{' '}
                <a href="mailto:reachsuhasreddy@gmail.com" className="text-black dark:text-foreground underline hover:opacity-80 transition-opacity">
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

export default PrivacyPolicy;


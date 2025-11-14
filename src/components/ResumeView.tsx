import React, { useEffect } from 'react';
import { X, Share2 } from 'lucide-react';

interface ResumeViewProps {
  onClose: () => void;
}

const ResumeView: React.FC<ResumeViewProps> = ({ onClose }) => {
  useEffect(() => {
    const isResumeRoute = window.location.pathname === '/resume';
    
    // Only hide website elements if we're NOT on the /resume route (i.e., modal view)
    if (!isResumeRoute) {
      const mainElement = document.querySelector('main');
      const navElement = document.querySelector('nav');
      const floatingButtons = document.querySelectorAll('[class*="fixed"]');
      
      if (mainElement) mainElement.style.display = 'none';
      if (navElement) navElement.style.display = 'none';
      
      floatingButtons.forEach((el) => {
        const element = el as HTMLElement;
        // Don't hide the resume container itself
        if (!element.closest('[class*="z-[9999]"]') && 
            !element.id?.includes('resume-content')) {
          element.style.display = 'none';
        }
      });
    }
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    return () => {
      // Restore elements when resume is closed (only if we were in modal mode)
      if (!isResumeRoute) {
        const mainElement = document.querySelector('main');
        const navElement = document.querySelector('nav');
        const floatingButtons = document.querySelectorAll('[class*="fixed"]');
        
        if (mainElement) mainElement.style.display = '';
        if (navElement) navElement.style.display = '';
        floatingButtons.forEach((el) => {
          (el as HTMLElement).style.display = '';
        });
      }
      document.body.style.overflow = '';
    };
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-paper-cream overflow-auto">
      {/* Close button - top left */}
      <button
        onClick={onClose}
        className="fixed top-2 left-2 sm:top-4 sm:left-4 z-[10000] w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black text-paper-cream border border-black shadow-md hover:bg-white hover:text-black transition-all duration-200 flex items-center justify-center group print:hidden"
        aria-label="Close resume"
      >
        <X size={16} className="sm:w-[18px] sm:h-[18px] transition-colors" />
      </button>

      {/* Minimal Print button - top right */}
      <button
        onClick={handlePrint}
        className="fixed top-2 right-2 sm:top-4 sm:right-4 z-[10000] px-3 py-2 sm:px-6 sm:py-3 bg-black text-paper-cream border border-black hover:bg-white hover:text-black transition-all duration-200 flex items-center gap-1 sm:gap-2 group print:hidden font-serif"
        aria-label="Print or download resume"
      >
        <Share2 size={16} className="sm:w-[18px] sm:h-[18px] transition-colors" />
        <span className="text-xs sm:text-sm font-serif">Print / Download</span>
      </button>

             {/* Resume Content - A4 Format */}
             <div id="resume-content" className="max-w-[210mm] mx-auto bg-paper-cream p-4 sm:p-6 md:p-[20mm] my-4 sm:my-8 border border-black/20 print:shadow-none print:my-0 print:mx-auto print:p-[8mm] print:max-w-[100%] print:border-0" style={{ minHeight: '297mm', fontFamily: "'Cormorant Garamond', Georgia, 'Times New Roman', serif" }}>
        {/* Header */}
        <div className="text-center mb-4 border-b-2 border-black pb-2 print:mb-2 print:pb-1">
          <h1 className="text-4xl font-serif font-bold text-black mb-2 print:text-2xl print:mb-1">Suhas Reddy</h1>
          <p className="text-lg font-serif text-black mb-2 print:text-sm print:mb-1">Software Engineer & Cloud Specialist</p>
          <div className="flex flex-wrap justify-center gap-2 text-xs text-black print:text-[10px] print:gap-1 print:flex-nowrap font-serif">
            <a href="mailto:reachsuhasreddy@gmail.com" className="hover:underline print:text-black print:no-underline">Mail</a>
            <span className="hidden sm:inline print:inline">|</span>
            <a href="https://linkedin.com/in/suhasreddybr" target="_blank" rel="noopener noreferrer" className="hover:underline print:text-black print:no-underline">LinkedIn</a>
            <span className="hidden sm:inline print:inline">|</span>
            <a href="https://github.com/suhasramanand" target="_blank" rel="noopener noreferrer" className="hover:underline print:text-black print:no-underline">Github</a>
          </div>
        </div>

        {/* Summary */}
        <section className="mb-4 print:mb-2">
          <h2 className="text-xl font-serif font-bold text-black uppercase border-b border-black mb-3 print:text-sm print:mb-1">Summary</h2>
          <p className="text-sm font-serif text-black leading-relaxed print:text-[10px] print:leading-tight">
            Software Engineer and Cloud Specialist pursuing Master's in Computer Software Engineering at Northeastern University. 
            Specialized in Site Reliability Engineering (SRE), cloud infrastructure automation, and DevOps practices with hands-on experience. 
            Expertise in AWS, GCP, Kubernetes, Terraform, and CI/CD pipelines. Passionate about building resilient, 
            scalable infrastructure and automating complex systems to improve reliability and operational efficiency.
          </p>
        </section>

        {/* Experience */}
        <section className="mb-4 print:mb-2">
          <h2 className="text-xl font-serif font-bold text-black uppercase border-b border-black mb-3 print:text-sm print:mb-1">Work Experience</h2>
          
          <div className="mb-3 print:mb-1.5">
            <div className="flex justify-between items-start mb-1 print:mb-0.5">
              <div>
                <h3 className="text-base font-serif font-bold text-black print:text-xs">Software Engineer, Cloud</h3>
                <p className="text-sm font-serif font-semibold text-black print:text-[10px]">Calix Inc</p>
              </div>
              <div className="text-sm font-serif text-black text-right print:text-[10px]">
                <p>Jun 2025 - Aug 2025</p>
                <p>Remote | Internship</p>
              </div>
            </div>
            <ul className="text-sm font-serif text-black list-disc list-inside space-y-1 ml-2 print:text-[9px] print:space-y-0.5 print:ml-1">
              <li>Automated AlloyDB database deployments using Liquibase and Bash scripts, integrated with Cloud Build triggers and Bamboo pipelines, reducing manual provisioning time by 35%</li>
              <li>Developed monitoring scripts to detect deployment inconsistencies and package drift, reducing incident frequency and improving reliability KPIs</li>
              <li>Hardened CI/CD pipelines with Bitbucket pipelines, implementing automated testing, secret management, and compliance checks</li>
              <li>Collaborated with SRE and engineering teams to troubleshoot issues, enforce least-privilege IAM policies, and ensure smooth production deployments</li>
            </ul>
          </div>

          <div className="mb-3 print:mb-1.5">
            <div className="flex justify-between items-start mb-1 print:mb-0.5">
              <div>
                <h3 className="text-base font-serif font-bold text-black print:text-xs">Software Engineer</h3>
                <p className="text-sm font-serif font-semibold text-black print:text-[10px]">Elanco</p>
              </div>
              <div className="text-sm font-serif text-black text-right print:text-[10px]">
                <p>Oct 2023 - Jul 2024</p>
                <p>Bangalore, India | Full-time</p>
              </div>
            </div>
            <ul className="text-sm font-serif text-black list-disc list-inside space-y-1 ml-2 print:text-[9px] print:space-y-0.5 print:ml-1">
              <li>Engineered full stack enterprise SaaS applications with the FERN stack (Firebase, Express, React, Node.js), with a microservices architecture ensuring seamless integration between front-end and back-end for optimal performance</li>
              <li>Developed front-end features using React, improving UI responsiveness and creating a smooth user experience while building back-end services with Express and Node.js, handling API logic and server-side operations</li>
              <li>Automated infrastructure monitoring using Ansible and Shell scripting, streamlining backend processes and reducing downtime by 15%</li>
              <li>Implemented CI/CD pipelines using GitHub Actions and Docker, automating builds, testing, and deployments while integrating version control with Git for efficient collaboration and reliable software releases</li>
            </ul>
          </div>

          <div className="mb-3 print:mb-1.5">
            <div className="flex justify-between items-start mb-1 print:mb-0.5">
              <div>
                <h3 className="text-base font-serif font-bold text-black print:text-xs">Project Trainee</h3>
                <p className="text-sm font-serif font-semibold text-black print:text-[10px]">Bosch Global Software Technologies</p>
              </div>
              <div className="text-sm font-serif text-black text-right print:text-[10px]">
                <p>Jan 2023 - May 2023</p>
                <p>Bangalore, India | Internship</p>
              </div>
            </div>
            <ul className="text-sm font-serif text-black list-disc list-inside space-y-1 ml-2 print:text-[9px] print:space-y-0.5 print:ml-1">
              <li>Developed a scalable website using React and TypeScript, incorporating activity tracking and reward systems to improve multi-device engagement by 40%</li>
              <li>Optimized RESTful APIs with Python FastAPI, implementing asynchronous processing to accelerate response times by 30% and boost system throughput</li>
              <li>Improved Azure SQL database performance with indexing, caching, and query optimizations, reducing data retrieval times by 25%</li>
            </ul>
          </div>
        </section>

        {/* Education */}
        <section className="mb-4 print:mb-2">
          <h2 className="text-xl font-serif font-bold text-black uppercase border-b border-black mb-3 print:text-sm print:mb-1">Education</h2>
          
          <div className="mb-2 print:mb-1">
            <div className="flex justify-between items-start mb-1 print:mb-0.5">
              <div>
                <h3 className="text-base font-serif font-bold text-black print:text-xs">Master of Science, Computer Software Engineering</h3>
                <p className="text-sm font-serif font-semibold text-black print:text-[10px]">Northeastern University</p>
              </div>
              <div className="text-sm font-serif text-black text-right print:text-[10px]">
                <p>Expected May 2026</p>
                <p>Boston, MA</p>
                <p>GPA: 3.8</p>
              </div>
            </div>
            <p className="text-sm font-serif text-black print:text-[9px]">Coursework: Application Engineering & Development, Data Science Engineering Methods & Tools, Program Structure & Algorithms, Web Design and User Experience Engineering, Network Structures & Cloud Computing, Prompt Engineering & AI</p>
          </div>

          <div className="mb-2 print:mb-1">
            <div className="flex justify-between items-start mb-1 print:mb-0.5">
              <div>
                <h3 className="text-base font-serif font-bold text-black print:text-xs">Bachelor of Technology, Computer Science & Engineering</h3>
                <p className="text-sm font-serif font-semibold text-black print:text-[10px]">REVA University</p>
              </div>
              <div className="text-sm font-serif text-black text-right print:text-[10px]">
                <p>Aug 2023</p>
                <p>Bangalore, India</p>
                <p>GPA: 3.6</p>
              </div>
            </div>
            <p className="text-sm font-serif text-black print:text-[9px]">Coursework: Object Oriented Programming, Probability and Statistics, Data Structures, Java, Digital Logic Design, Database Management System, Computer Organization and Architecture, Embedded System Design, Computer Networks, Python for Data Analysis, Cloud Computing and Big Data, Machine Learning for Data Analytics, Artificial Intelligence, Mobile Application Development, Cryptography and Network Security, Augmented and Virtual Reality, Data Science using R</p>
          </div>
        </section>

        {/* Skills */}
        <section className="mb-4 print:mb-2">
          <h2 className="text-xl font-serif font-bold text-black uppercase border-b border-black mb-3 print:text-sm print:mb-1">Technical Skills</h2>
          <div className="grid grid-cols-2 gap-4 text-sm font-serif text-black print:gap-2 print:text-[9px]">
            <div>
              <h4 className="font-serif font-bold mb-1 print:mb-0.5 print:text-[10px]">Programming Languages:</h4>
              <p className="font-serif">JavaScript/TypeScript, Python, Java, C++, SQL</p>
            </div>
            <div>
              <h4 className="font-serif font-bold mb-1 print:mb-0.5 print:text-[10px]">Frontend:</h4>
              <p className="font-serif">React, Next.js, Angular, Material UI, Tailwind CSS</p>
            </div>
            <div>
              <h4 className="font-serif font-bold mb-1 print:mb-0.5 print:text-[10px]">Backend:</h4>
              <p className="font-serif">Node.js, Express, FastAPI, Django, REST APIs</p>
            </div>
            <div>
              <h4 className="font-serif font-bold mb-1 print:mb-0.5 print:text-[10px]">Databases:</h4>
              <p className="font-serif">MongoDB, MySQL, PostgreSQL, Firebase</p>
            </div>
            <div>
              <h4 className="font-serif font-bold mb-1 print:mb-0.5 print:text-[10px]">DevOps & Cloud:</h4>
              <p className="font-serif">AWS, Azure, GCP, Docker, Kubernetes, Terraform</p>
            </div>
            <div>
              <h4 className="font-serif font-bold mb-1 print:mb-0.5 print:text-[10px]">Tools & Workflow:</h4>
              <p className="font-serif">Git, CI/CD, Agile/Scrum, JIRA</p>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="mb-4 print:mb-2">
          <h2 className="text-xl font-serif font-bold text-black uppercase border-b border-black mb-3 print:text-sm print:mb-1">Key Projects</h2>
          
          <div className="mb-2 print:mb-1">
            <div className="flex justify-between items-start mb-1 print:mb-0.5">
              <h3 className="text-base font-serif font-bold text-black print:text-xs">
                <a href="https://github.com/suhasramanand/scalable-infrastructure-deployment" target="_blank" rel="noopener noreferrer" className="hover:underline print:text-black print:no-underline font-serif">Scalable Infrastructure Deployment | HCL, Terraform, Kubernetes, AWS EKS, Docker, CI/CD</a>
              </h3>
            </div>
            <p className="text-sm font-serif text-black mb-1 print:text-[9px] print:mb-0.5">Scalable Infrastructure Deployment with Terraform, Kubernetes (AWS EKS), and CI/CD pipelines for microservices architecture.</p>
          </div>

          <div className="mb-2 print:mb-1">
            <div className="flex justify-between items-start mb-1 print:mb-0.5">
              <h3 className="text-base font-serif font-bold text-black print:text-xs">
                <a href="https://github.com/suhasramanand/CodeReviewer.AI" target="_blank" rel="noopener noreferrer" className="hover:underline print:text-black print:no-underline font-serif">CodeReviewer.AI | Python, AI, GitHub API, Security, Automation</a>
              </h3>
            </div>
            <p className="text-sm font-serif text-black mb-1 print:text-[9px] print:mb-0.5">AI-powered pull request review bot that leverages artificial intelligence to analyze and provide suggestions on code changes.</p>
          </div>

          <div className="mb-2 print:mb-1">
            <div className="flex justify-between items-start mb-1 print:mb-0.5">
              <h3 className="text-base font-serif font-bold text-black print:text-xs">
                <a href="https://github.com/suhasramanand/streaming-analytics-platform" target="_blank" rel="noopener noreferrer" className="hover:underline print:text-black print:no-underline font-serif">Streaming Analytics Platform | Python, Kafka, Spark, Trino, Kubernetes, Iceberg</a>
              </h3>
            </div>
            <p className="text-sm font-serif text-black mb-1 print:text-[9px] print:mb-0.5">Complete end-to-end real-time streaming analytics platform with Kafka, Spark, Trino, and Iceberg on Kubernetes.</p>
          </div>

          <div className="mb-2 print:mb-1">
            <div className="flex justify-between items-start mb-1 print:mb-0.5">
              <h3 className="text-base font-serif font-bold text-black print:text-xs">
                <a href="https://github.com/suhasramanand/evalstack" target="_blank" rel="noopener noreferrer" className="hover:underline print:text-black print:no-underline font-serif">EvalStack - AI Pipeline Platform | Python, AI/ML, LLMs, RAG, Monitoring</a>
              </h3>
            </div>
            <p className="text-sm font-serif text-black mb-1 print:text-[9px] print:mb-0.5">Production-grade platform for evaluating, observing, and optimizing Generative AI pipelines (LLMs, RAG, Agents).</p>
          </div>

          <div className="mb-2 print:mb-1">
            <div className="flex justify-between items-start mb-1 print:mb-0.5">
              <h3 className="text-base font-serif font-bold text-black print:text-xs">
                <a href="https://github.com/suhasramanand/jobhunt" target="_blank" rel="noopener noreferrer" className="hover:underline print:text-black print:no-underline font-serif">JobHunt - Automated Job Aggregator | Python, Web Scraping, Data Processing, Automation</a>
              </h3>
            </div>
            <p className="text-sm font-serif text-black mb-1 print:text-[9px] print:mb-0.5">Automated job aggregator for entry-level software engineering positions with visa sponsorship. Built intelligent web scraping and filtering system.</p>
          </div>

          <div className="mb-2 print:mb-1">
            <div className="flex justify-between items-start mb-1 print:mb-0.5">
              <h3 className="text-base font-serif font-bold text-black print:text-xs">
                <a href="https://github.com/suhasramanand/high-performance-cache" target="_blank" rel="noopener noreferrer" className="hover:underline print:text-black print:no-underline font-serif">High-Performance C++ Cache System | C++, Memory Management, Multi-threading, TCP Server</a>
              </h3>
            </div>
            <p className="text-sm font-serif text-black mb-1 print:text-[9px] print:mb-0.5">High-Performance C++ Caching System with LRU eviction, custom memory allocator, and multi-threaded TCP server.</p>
          </div>
        </section>

        {/* Certifications */}
        <section className="mb-4 print:mb-2">
          <h2 className="text-xl font-serif font-bold text-black uppercase border-b border-black mb-3 print:text-sm print:mb-1">Certifications</h2>
          
          <div className="mb-2 print:mb-1">
            <div className="flex justify-between items-start mb-1 print:mb-0.5">
              <div>
                <h3 className="text-base font-serif font-bold text-black print:text-xs">AWS Certified DevOps Engineer - Professional</h3>
                <p className="text-sm font-serif text-black print:text-[10px]">Amazon Web Services</p>
              </div>
            </div>
          </div>

          <div className="mb-2 print:mb-1">
            <div className="flex justify-between items-start mb-1 print:mb-0.5">
              <div>
                <h3 className="text-base font-serif font-bold text-black print:text-xs">AZ-900: Microsoft Azure Fundamentals</h3>
                <p className="text-sm font-serif text-black print:text-[10px]">Microsoft</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          
          body * {
            visibility: hidden;
          }
          
          #resume-content,
          #resume-content * {
            visibility: visible;
          }
          
          #resume-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0;
            padding: 6mm !important;
            box-shadow: none;
            font-size: 9px !important;
            line-height: 1.25 !important;
            background: #F5F1E8 !important;
            font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif !important;
          }
          
          #resume-content h1 {
            font-size: 20px !important;
            margin-bottom: 3px !important;
          }
          
          #resume-content h2 {
            font-size: 12px !important;
            margin-bottom: 3px !important;
            padding-bottom: 1px !important;
            margin-top: 4px !important;
          }
          
          #resume-content h3 {
            font-size: 10px !important;
            margin-bottom: 1px !important;
          }
          
          #resume-content h4 {
            font-size: 9px !important;
            margin-bottom: 1px !important;
          }
          
          #resume-content p,
          #resume-content li,
          #resume-content span {
            font-size: 8px !important;
            line-height: 1.3 !important;
          }
          
          #resume-content section {
            margin-bottom: 5px !important;
          }
          
          #resume-content .mb-4,
          #resume-content .mb-3,
          #resume-content .mb-2 {
            margin-bottom: 4px !important;
          }
          
          #resume-content .mb-1 {
            margin-bottom: 2px !important;
          }
          
          #resume-content ul {
            margin-top: 2px !important;
            margin-bottom: 2px !important;
          }
          
          #resume-content li {
            margin-bottom: 1px !important;
          }
          
          #resume-content .border-b-2 {
            border-bottom-width: 1px !important;
          }
          
          #resume-content .pb-2 {
            padding-bottom: 1px !important;
          }
          
          #resume-content .mb-4.print\\:mb-2 {
            margin-bottom: 4px !important;
          }
          
          .print\\:hidden {
            display: none !important;
            visibility: hidden !important;
          }
          
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          
          .print\\:my-0 {
            margin-top: 0 !important;
            margin-bottom: 0 !important;
          }
          
          .print\\:mx-auto {
            margin-left: auto !important;
            margin-right: auto !important;
          }
          
          .print\\:p-\\[8mm\\] {
            padding: 6mm !important;
          }
          
          .print\\:max-w-\\[100\\%\\] {
            max-width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ResumeView;


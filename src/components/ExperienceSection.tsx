import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, MapPin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  location: string;
  logo: string;
  points: string[];
  tag?: string; // Optional tag like "Internship" or "Full-time"
}

    // CALIX EXPERIENCE WITH OFFICIAL LOGO - REBUILD FOR LOGO
    // Logo now in public directory - should display correctly
    const experiences: ExperienceItem[] = [
  {
    title: "Software Engineer, Cloud",
    company: "Calix Inc",
    period: "Jun 2025 - Aug 2025",
    location: "Remote",
    tag: "Internship",
    logo: "/images/companies/Calix.png",
    points: [
      "Automated AlloyDB database deployments using Liquibase and Bash scripts, integrated with Cloud Build triggers and Bamboo pipelines, reducing manual provisioning time by 35%",
      "Developed monitoring scripts to detect deployment inconsistencies and package drift, reducing incident frequency and improving reliability KPIs",
      "Hardened CI/CD pipelines with Bitbucket pipelines, implementing automated testing, secret management, and compliance checks",
      "Collaborated with SRE and engineering teams to troubleshoot issues, enforce least-privilege IAM policies, and ensure smooth production deployments",
    ],
  },
  {
    title: "Software Engineer",
    company: "Elanco",
    period: "Oct 2023 - Jul 2024",
    location: "Bangalore, India",
    tag: "Full-time",
    logo: "/images/companies/Elanco.png",
    points: [
      "Engineered full stack enterprise SaaS applications with the FERN stack (Firebase, Express, React, Node.js), with a microservices architecture ensuring seamless integration between front-end and back-end for optimal performance.",
      "Developed front-end features using React, improving UI responsiveness and creating a smooth user experience while building back-end services with Express and Node.js, handling API logic and server-side operations.",
      "Automated infrastructure monitoring using Ansible and Shell scripting, streamlining backend processes and reducing downtime by 15%.",
      "Implemented CI/CD pipelines using GitHub Actions and Docker, automating builds, testing, and deployments while integrating version control with Git for efficient collaboration and reliable software releases.",
    ],
  },
  {
    title: "Project Trainee",
    company: "Bosch Global Software Technologies",
    period: "Jan 2023 - May 2023",
    location: "Bangalore, India",
    tag: "Internship",
    logo: "/images/companies/Bosch.png",
    points: [
      "Developed a scalable website using React and TypeScript, incorporating activity tracking and reward systems to improve multi-device engagement by 40%.",
      "Optimized RESTful APIs with Python FastAPI, implementing asynchronous processing to accelerate response times by 30% and boost system throughput.",
      "Improved Azure SQL database performance with indexing, caching, and query optimizations, reducing data retrieval times by 25%.",
    ],
  },
];

const ExperienceSection: React.FC = React.memo(() => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const timelineItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Removed scroll-triggered animations for instant display
  useEffect(() => {
    // Set all elements to be visible immediately
    if (headingRef.current) {
      gsap.set(headingRef.current, { opacity: 1, y: 0 });
    }
    timelineItemsRef.current.forEach((item) => {
      if (item) {
        gsap.set(item, { opacity: 1, y: 0 });
      }
    });
  }, []);

  return (
    <section
      id="experience"
      className="py-16 sm:py-20 md:py-24 relative"
      ref={sectionRef}
    >
      <div className="section-container">
        <h2 ref={headingRef} className="section-title">
          Work Experience
        </h2>

        <div className="space-y-12 md:space-y-16 mt-12">
          {experiences.map((exp, index) => (
            <div
              key={index}
              ref={(el) => (timelineItemsRef.current[index] = el)}
              className="relative"
            >
              <div className="paper-card">
                <div className="mb-6 pb-6 border-b border-ink-light-gray/30">
                  <div className="flex flex-wrap items-start gap-4 mb-3">
                    <img
                      src={exp.logo}
                      alt={`${exp.company} logo`}
                      className="h-8 w-auto object-contain opacity-80"
                      loading="lazy"
                    />
                    <div>
                      <h3 className="text-xl sm:text-2xl font-serif font-semibold text-black mb-1">
                        {exp.title}
                      </h3>
                      <h4 className="text-lg sm:text-xl font-serif font-medium text-ink-gray italic">
                        {exp.company}
                      </h4>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-ink-gray mt-3">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-ink-light-gray" />
                      <span className="font-serif text-ink-gray">{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-ink-light-gray" />
                      <span className="font-serif text-ink-gray">{exp.location}</span>
                    </div>
                    {exp.tag && (
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-ink-gray">{exp.tag}</span>
                      </div>
                    )}
                  </div>
                </div>

                <ul className="space-y-3 text-body">
                  {exp.points.map((point, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="text-black mt-1.5 flex-shrink-0 font-serif">—</span>
                      <span className="font-serif">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

ExperienceSection.displayName = 'ExperienceSection';

export default ExperienceSection;

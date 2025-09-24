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
}

// Updated experiences with Calix
const experiences: ExperienceItem[] = [
  {
    title: "Software Engineering Intern, Cloud",
    company: "Calix Inc",
    period: "Jun 2025 - Aug 2025",
    location: "Remote",
    logo: "/Calix.png",
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
    logo: "/Elanco.png",
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
    logo: "/Bosch.png",
    points: [
      "Developed a scalable website using React and TypeScript, incorporating activity tracking and reward systems to improve multi-device engagement by 40%.",
      "Optimized RESTful APIs with Python FastAPI, implementing asynchronous processing to accelerate response times by 30% and boost system throughput.",
      "Improved Azure SQL database performance with indexing, caching, and query optimizations, reducing data retrieval times by 25%.",
    ],
  },
];

const ExperienceSection: React.FC = () => {
  console.log("ExperienceSection loaded with Calix experience");
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const timelineItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate heading
      gsap.from(headingRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Animate each timeline item with a staggered effect
      timelineItemsRef.current.forEach((item, index) => {
        gsap.from(item, {
          x: index % 2 === 0 ? -50 : 50,
          opacity: 0,
          duration: 0.8,
          delay: 0.2 + index * 0.1,
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      });
    });

    return () => ctx.revert(); // Clean up animations
  }, []);

  return (
    <section
      id="experience"
      className="py-20 bg-gray-50 relative overflow-hidden"
      ref={sectionRef}
    >
      <div className="section-container">
        <h2 ref={headingRef} className="section-title text-center">
          Work Experience
        </h2>

        <div className="relative mt-16">
          {/* Timeline connector */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-groww-purple/20 transform -translate-x-1/2 hidden md:block"></div>

          {/* Timeline items */}
          {experiences.map((exp, index) => (
            <div
              key={index}
              ref={(el) => (timelineItemsRef.current[index] = el)}
              className={`relative mb-16 md:mb-24 ${
                index % 2 === 0
                  ? "md:pl-12 md:ml-auto md:mr-auto md:pr-0"
                  : "md:pr-12 md:mr-auto md:ml-auto md:pl-0"
              } md:w-1/2`}
            >
              {/* Timeline dot */}
              <div className="absolute left-1/2 top-0 w-5 h-5 rounded-full bg-groww-purple shadow-lg transform -translate-x-1/2 hidden md:block"></div>

              <div className="apple-card hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-groww-dark-gray">
                    {exp.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <img
                      src={exp.logo}
                      alt={`${exp.company} logo`}
                      className="h-6 w-auto object-contain"
                    />
                    <h4 className="text-lg font-semibold text-groww-purple">
                      {exp.company}
                    </h4>
                  </div>

                  <div className="flex items-center gap-4 text-gray-600 mt-2">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span className="text-sm">{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={16} />
                      <span className="text-sm">{exp.location}</span>
                    </div>
                  </div>
                </div>

                <ul className="space-y-2 text-gray-700">
                  {exp.points.map((point, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-groww-purple mt-1">•</span>
                      <span>{point}</span>
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
};

export default ExperienceSection;

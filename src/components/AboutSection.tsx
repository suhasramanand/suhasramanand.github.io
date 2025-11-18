import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Terminal from "./Terminal";

gsap.registerPlugin(ScrollTrigger);

const AboutSection: React.FC = React.memo(() => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const fullText1 = "I'm a Software Engineer and Cloud Specialist currently pursuing my Master's in Computer Software Engineering at Northeastern University. My passion lies in building resilient, scalable infrastructure and automating complex systems in the cloud.";
  const fullText2 = "Through my experience at Calix, Elanco, and Bosch, I've specialized in Site Reliability Engineering (SRE), cloud infrastructure automation, and DevOps practices. I work extensively with AWS, GCP, Kubernetes, Terraform, and CI/CD pipelines to design systems that are both reliable and efficient.";
  const fullText3 = "What excites me most is solving infrastructure challenges—whether it's automating database deployments, hardening CI/CD pipelines, or designing monitoring systems that prevent incidents before they happen. I'm always exploring new cloud technologies and contributing to infrastructure-as-code projects that make systems more maintainable and scalable.";
  
  // Combine all text with line breaks
  const fullText = `${fullText1}\n\n${fullText2}\n\n${fullText3}`;

  const typeText = (text: string, setText: (text: string) => void) => {
    let currentIndex = 0;
    const typingSpeed = 15; // milliseconds per character

    const type = () => {
      if (currentIndex < text.length) {
        setText(text.substring(0, currentIndex + 1));
        currentIndex++;
        setTimeout(type, typingSpeed);
      }
    };

    type();
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal animation for the heading
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

      // Reveal animation for the image
      gsap.from(imageRef.current, {
        x: 50,
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      // Typing animation trigger
      ScrollTrigger.create({
        trigger: contentRef.current,
        start: "top 75%",
        onEnter: () => {
          if (!isTyping) {
            setIsTyping(true);
            typeText(fullText, setDisplayedText);
          }
        },
        once: true
      });
    });

    return () => ctx.revert(); 
  }, [isTyping]);

  return (
    <section
      id="about"
      className="py-16 sm:py-20 md:py-24 relative"
      ref={sectionRef}
    >
      <div className="section-container">
        <h2 ref={headingRef} className="section-title">
          About Me
        </h2>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          <div ref={contentRef} className="order-2 md:order-1">
            <div className="relative">
              {/* Hidden full text to reserve space and prevent layout shift */}
              {/* Matches terminal structure exactly: header (32px) + body padding (16px) + content */}
              <div className="invisible" aria-hidden="true">
                <div className="bg-black/90 border border-black/30 rounded-lg overflow-hidden shadow-lg">
                  {/* Terminal header */}
                  <div className="bg-black/95 border-b border-black/50 px-4 py-2 flex items-center h-8"></div>
                  {/* Terminal body with matching padding */}
                  <div className="bg-black/90 p-4">
                    <div className="text-sm leading-relaxed" style={{ fontFamily: "'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', monospace" }}>
                      <span className="text-green-400 mr-2">$</span>
                      <span className="text-gray-100 whitespace-pre-wrap word-wrap break-word" style={{ fontFamily: "'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', monospace" }}>
                        {fullText}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Visible typing text overlay */}
              <div className="absolute top-0 left-0 w-full">
                <Terminal 
                  prompt="$" 
                  showCursor={displayedText.length < fullText.length}
                  className="w-full"
                >
                  {displayedText}
                </Terminal>
              </div>
            </div>
          </div>

          <div ref={imageRef} className="flex justify-center order-1 md:order-2 sticky top-20">
            <div className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 overflow-hidden border-2 border-black rounded-full">
              <img
                src="/images/profile/profile-pic.jpg"
                alt="Suhas Reddy - Software Engineer & Cloud Specialist"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

AboutSection.displayName = 'AboutSection';

export default AboutSection;

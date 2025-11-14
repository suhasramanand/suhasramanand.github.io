
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Linkedin, Github, Send, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import emailjs from '@emailjs/browser';

gsap.registerPlugin(ScrollTrigger);

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" })
});

type FormValues = z.infer<typeof formSchema>;

const ContactSection: React.FC = React.memo(() => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const contactItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const formRef = useRef<HTMLDivElement>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  // EmailJS Configuration
  const EMAILJS_SERVICE_ID = 'service_4fj0nwr';
  const EMAILJS_TEMPLATE_ID = 'template_p4072bl';
  const EMAILJS_PUBLIC_KEY = 'IxFZkVYjMHJ1IUwuo';
  const RECIPIENT_EMAIL = 'reachsuhasreddy@gmail.com';

  // Initialize EmailJS - lazy initialization
  useEffect(() => {
    // Only initialize when component is in viewport or form is interacted with
    const initEmailJS = () => {
      if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
      }
    };
    
    // Initialize on form interaction or after a delay
    const timer = setTimeout(initEmailJS, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        message: data.message,
        to_email: RECIPIENT_EMAIL,
        reply_to: data.email, // Add reply_to for better email handling
      };

      const response = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
      
      setFormSubmitted(true);
      form.reset();
      
      // After 5 seconds, reset the submission status
      setTimeout(() => {
        setFormSubmitted(false);
      }, 5000);
    } catch (error: any) {
      // Only log errors in development
      if (import.meta.env.DEV) {
        console.error('EmailJS error:', error);
      }
      
      let errorMessage = "Failed to send message. Please try again or contact me directly via email.";
      
      if (error?.status === 400) {
        errorMessage = "Invalid email template or service configuration. Please contact me directly via email.";
      } else if (error?.status === 403) {
        errorMessage = "Email service access denied. Please contact me directly via email.";
      } else if (error?.text) {
        errorMessage = `Email service error: ${error.text}. Please contact me directly via email.`;
      }
      
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate heading - faster
      gsap.from(headingRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.3,
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true
        }
      });
      
      // Animate cards - faster
      gsap.from(cardRef.current, {
        scale: 0.95,
        opacity: 0,
        duration: 0.3,
        delay: 0.1,
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true
        }
      });
      
      // Animate form - faster
      gsap.from(formRef.current, {
        scale: 0.95,
        opacity: 0,
        duration: 0.3,
        delay: 0.1,
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true
        }
      });
      
      // Animate contact items - faster
      gsap.from(contactItemsRef.current, {
        x: -20,
        opacity: 0,
        duration: 0.3,
        stagger: 0.05,
        delay: 0.1,
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true
        }
      });
    });
    
    return () => ctx.revert(); // Clean up animations
  }, []);

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-24 relative" ref={sectionRef}>
      <div className="section-container">
        <h2 ref={headingRef} className="section-title">Get In Touch</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mt-12">
          {/* Contact Info */}
          <div ref={cardRef} className="paper-card">
            <div className="mb-8">
              <p className="text-body mb-8">
                I'm currently open to new opportunities and collaborations. 
                Feel free to reach out if you'd like to connect!
              </p>
              
              {/* Social Icons */}
              <div className="flex justify-center gap-6 mb-8">
                <a href="https://github.com/suhasramanand" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center text-black hover:text-ink-gray transition-colors">
                  <Github size={20} />
                </a>
                <a href="https://linkedin.com/in/suhasreddybr/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center text-black hover:text-ink-gray transition-colors">
                  <Linkedin size={20} />
                </a>
                <a href="mailto:reachsuhasreddy@gmail.com" className="w-10 h-10 flex items-center justify-center text-black hover:text-ink-gray transition-colors">
                  <Mail size={20} />
                </a>
              </div>
            </div>
            
            <div className="space-y-4">
              <a 
                ref={el => (contactItemsRef.current[0] = el)}
                href="mailto:reachsuhasreddy@gmail.com"
                className="flex items-center p-4 border border-ink-light-gray/30 hover:border-black transition-colors"
              >
                <div className="w-10 h-10 flex items-center justify-center text-black mr-4">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-xs text-ink-gray font-serif">Email</div>
                  <div className="text-body font-serif break-all">reachsuhasreddy@gmail.com</div>
                </div>
              </a>
              
              <a 
                ref={el => (contactItemsRef.current[1] = el)}
                href="https://linkedin.com/in/suhasreddybr/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 border border-ink-light-gray/30 hover:border-black transition-colors"
              >
                <div className="w-10 h-10 flex items-center justify-center text-black mr-4">
                  <Linkedin size={20} />
                </div>
                <div>
                  <div className="text-xs text-ink-gray font-serif">LinkedIn</div>
                  <div className="text-body font-serif">linkedin.com/in/suhasreddybr</div>
                </div>
              </a>
              
              <a 
                ref={el => (contactItemsRef.current[2] = el)}
                href="https://github.com/suhasramanand"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 border border-ink-light-gray/30 hover:border-black transition-colors"
              >
                <div className="w-10 h-10 flex items-center justify-center text-black mr-4">
                  <Github size={20} />
                </div>
                <div>
                  <div className="text-xs text-ink-gray font-serif">GitHub</div>
                  <div className="text-body font-serif">github.com/suhasramanand</div>
                </div>
              </a>
            </div>
          </div>
          
          {/* Contact Form */}
          <div ref={formRef} className="paper-card">
            <h3 className="text-2xl font-serif font-semibold text-black mb-8">Send me a message</h3>
            
            {formSubmitted ? (
              <div className="border border-black p-6 text-center">
                <p className="text-body font-serif font-medium mb-2">Message sent successfully!</p>
                <p className="text-ink-gray font-serif">Thank you for reaching out. I'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {submitError && (
                    <div className="border border-black p-4 text-center">
                      <p className="text-sm font-serif mb-2">{submitError}</p>
                      <a 
                        href="mailto:reachsuhasreddy@gmail.com" 
                        className="text-sm underline font-serif"
                      >
                        Click here to email directly
                      </a>
                    </div>
                  )}
                  
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-serif">Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your name" 
                            {...field} 
                            className="border-ink-light-gray/40 font-serif focus:border-black" 
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-serif">Email</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your email" 
                            type="email" 
                            {...field} 
                            className="border-ink-light-gray/40 font-serif focus:border-black" 
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-serif">Message</FormLabel>
                        <FormControl>
                          <textarea 
                            className="flex w-full border border-ink-light-gray/40 bg-transparent px-3 py-2 text-sm font-serif placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-black disabled:cursor-not-allowed disabled:opacity-50 min-h-[120px] resize-none"
                            placeholder="Your message"
                            {...field}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full minimal-button"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2" size={18} />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
});

ContactSection.displayName = 'ContactSection';

export default ContactSection;

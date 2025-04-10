
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Linkedin, Github, PhoneCall, Send, Briefcase, MessageSquare, Twitter, Instagram } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

gsap.registerPlugin(ScrollTrigger);

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" })
});

type FormValues = z.infer<typeof formSchema>;

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const contactItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const formRef = useRef<HTMLDivElement>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
    // In a real application, you would send this data to a server
    setFormSubmitted(true);
    form.reset();
    
    // After 3 seconds, reset the submission status
    setTimeout(() => {
      setFormSubmitted(false);
    }, 3000);
  };

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
          toggleActions: "play none none none"
        }
      });
      
      // Animate cards
      gsap.from(cardRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
      
      // Animate form
      gsap.from(formRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
      
      // Animate contact items
      gsap.from(contactItemsRef.current, {
        x: -30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        delay: 0.4,
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
    });
    
    return () => ctx.revert(); // Clean up animations
  }, []);

  return (
    <section id="contact" className="py-20 bg-gray-50 relative overflow-hidden" ref={sectionRef}>
      <div className="section-container">
        <h2 ref={headingRef} className="section-title text-center">Get In Touch</h2>
        
        <div className="grid md:grid-cols-2 gap-10 mt-16">
          {/* Contact Info */}
          <div ref={cardRef} className="apple-card">
            <div className="text-center mb-8">
              <p className="text-lg text-gray-700 mb-6">
                I'm currently open to new opportunities and collaborations. 
                Feel free to reach out if you'd like to connect!
              </p>
              
              {/* Social Icons */}
              <div className="flex justify-center space-x-4 mb-6">
                <a href="https://github.com/suhasramanand" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full purple-gradient flex items-center justify-center text-white hover:scale-110 transition-transform">
                  <Github size={22} />
                </a>
                <a href="https://linkedin.com/in/suhasreddybr/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full purple-gradient flex items-center justify-center text-white hover:scale-110 transition-transform">
                  <Linkedin size={22} />
                </a>
                <a href="mailto:baluvanahallyraman.s@northeastern.edu" className="w-12 h-12 rounded-full purple-gradient flex items-center justify-center text-white hover:scale-110 transition-transform">
                  <Mail size={22} />
                </a>
                <a href="tel:+18577462805" className="w-12 h-12 rounded-full purple-gradient flex items-center justify-center text-white hover:scale-110 transition-transform">
                  <PhoneCall size={22} />
                </a>
              </div>
            </div>
            
            <div className="grid gap-6">
              <a 
                ref={el => (contactItemsRef.current[0] = el)}
                href="mailto:baluvanahallyraman.s@northeastern.edu"
                className="flex items-center p-4 rounded-xl bg-white border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-full purple-gradient flex items-center justify-center text-white mr-4">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <div className="font-medium text-groww-dark-gray text-sm md:text-base break-all">baluvanahallyraman.s@northeastern.edu</div>
                </div>
              </a>
              
              <a 
                ref={el => (contactItemsRef.current[1] = el)}
                href="tel:+18577462805"
                className="flex items-center p-4 rounded-xl bg-white border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-full purple-gradient flex items-center justify-center text-white mr-4">
                  <PhoneCall size={20} />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Phone</div>
                  <div className="font-medium text-groww-dark-gray">+1 (857) 746-2805</div>
                </div>
              </a>
              
              <a 
                ref={el => (contactItemsRef.current[2] = el)}
                href="https://linkedin.com/in/suhasreddybr/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 rounded-xl bg-white border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-full purple-gradient flex items-center justify-center text-white mr-4">
                  <Linkedin size={20} />
                </div>
                <div>
                  <div className="text-sm text-gray-500">LinkedIn</div>
                  <div className="font-medium text-groww-dark-gray">linkedin.com/in/suhasreddybr</div>
                </div>
              </a>
              
              <a 
                ref={el => (contactItemsRef.current[3] = el)}
                href="https://github.com/suhasramanand"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 rounded-xl bg-white border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-full purple-gradient flex items-center justify-center text-white mr-4">
                  <Github size={20} />
                </div>
                <div>
                  <div className="text-sm text-gray-500">GitHub</div>
                  <div className="font-medium text-groww-dark-gray">github.com/suhasramanand</div>
                </div>
              </a>
            </div>
          </div>
          
          {/* Contact Form */}
          <div ref={formRef} className="apple-card">
            <h3 className="text-xl font-bold text-center mb-6 text-groww-dark-gray">Send me a message</h3>
            
            {formSubmitted ? (
              <div className="bg-green-50 text-green-700 p-4 rounded-lg text-center">
                <p className="text-lg font-medium">Message sent successfully!</p>
                <p className="mt-2">Thank you for reaching out. I'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} className="border-gray-300" />
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Your email" type="email" {...field} className="border-gray-300" />
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
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <textarea 
                            className="flex w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[120px] resize-none"
                            placeholder="Your message"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full purple-gradient border-0">
                    <Send className="mr-2" size={18} />
                    Send Message
                  </Button>
                </form>
              </Form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

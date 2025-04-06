
import React, { useState } from 'react';
import FrontLayout from '@/components/layout/FrontLayout';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const ContactUsPage: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "Thank you for your message. We will get back to you soon.",
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <FrontLayout>
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-background to-muted">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-muted-foreground">
            Have questions or feedback? We'd love to hear from you
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <Card>
                  <CardContent className="flex items-center gap-4 p-6">
                    <Mail className="h-10 w-10 text-primary" />
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <p className="text-muted-foreground">info@networkguardian.com</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="flex items-center gap-4 p-6">
                    <Phone className="h-10 w-10 text-primary" />
                    <div>
                      <h3 className="font-semibold">Phone</h3>
                      <p className="text-muted-foreground">(123) 456-7890</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="flex items-center gap-4 p-6">
                    <MapPin className="h-10 w-10 text-primary" />
                    <div>
                      <h3 className="font-semibold">Address</h3>
                      <p className="text-muted-foreground">
                        123 Security Street<br />
                        Network City, NC 12345
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Support Hours</h3>
                <p className="text-muted-foreground mb-2">Monday to Friday: 9am - 6pm EST</p>
                <p className="text-muted-foreground">Saturday: 10am - 4pm EST</p>
                <p className="text-muted-foreground">Sunday: Closed</p>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="font-medium">Name</label>
                        <Input 
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="font-medium">Email</label>
                        <Input 
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Your email address"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="subject" className="font-medium">Subject</label>
                      <Input 
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Message subject"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="message" className="font-medium">Message</label>
                      <Textarea 
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your message"
                        rows={6}
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full md:w-auto"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="h-4 w-4" />
                          Send Message
                        </span>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="py-8 px-4 bg-background">
        <div className="container mx-auto">
          <div className="w-full h-80 bg-muted rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Interactive Map Would Be Displayed Here</p>
          </div>
        </div>
      </section>
    </FrontLayout>
  );
};

export default ContactUsPage;


import React from 'react';
import FrontLayout from '@/components/layout/FrontLayout';
import { Shield, Users, LockKeyhole, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const AboutPage: React.FC = () => {
  return (
    <FrontLayout>
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-background to-muted">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">About Network Guardian</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-muted-foreground">
            Empowering users with advanced tools to secure and monitor their networks
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg mb-6 text-muted-foreground">
                At Network Guardian, our mission is to provide individuals and organizations with powerful, 
                easy-to-use tools that help them understand, monitor, and secure their networks.
              </p>
              <p className="text-lg mb-6 text-muted-foreground">
                We believe that network security should be accessible to everyone, not just IT professionals. 
                That's why we've created a toolkit that combines advanced security features with an intuitive 
                interface that anyone can use.
              </p>
              <p className="text-lg text-muted-foreground">
                Our goal is to empower users with the knowledge and tools they need to protect their digital 
                lives and maintain the integrity of their networks in an increasingly connected world.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    <Shield className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-center">Protection</h3>
                  <p className="text-muted-foreground text-center">
                    Safeguarding networks against unauthorized access and security threats
                  </p>
                </CardContent>
              </Card>
              
              <Card className="p-6">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    <Users className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-center">Accessibility</h3>
                  <p className="text-muted-foreground text-center">
                    Making network security accessible to users of all technical levels
                  </p>
                </CardContent>
              </Card>
              
              <Card className="p-6">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    <LockKeyhole className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-center">Privacy</h3>
                  <p className="text-muted-foreground text-center">
                    Respecting user privacy while providing comprehensive security solutions
                  </p>
                </CardContent>
              </Card>
              
              <Card className="p-6">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    <Zap className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-center">Innovation</h3>
                  <p className="text-muted-foreground text-center">
                    Constantly evolving our solutions to address emerging security challenges
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Approach</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">Comprehensive Analysis</h3>
                <p className="text-muted-foreground">
                  We provide detailed insights into your network infrastructure, identifying all connected devices 
                  and potential vulnerabilities.
                </p>
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">Real-time Monitoring</h3>
                <p className="text-muted-foreground">
                  Our toolkit continuously monitors your network for suspicious activities and unauthorized access attempts, 
                  alerting you when potential threats are detected.
                </p>
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">Proactive Protection</h3>
                <p className="text-muted-foreground">
                  Beyond detection, we offer tools that help you proactively secure your network, preventing security 
                  breaches before they occur.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </FrontLayout>
  );
};

export default AboutPage;

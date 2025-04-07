
import React from 'react';
import FrontLayout from '@/components/layout/FrontLayout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Shield, Wifi, Database, AlertTriangle, ArrowRight, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const HomePage: React.FC = () => {
  return (
    <FrontLayout>
      {/* Hero Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-background to-muted">
        <div className="container mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Shield className="h-20 w-20 text-security-DEFAULT" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-8">Secure Your Network with Confidence</h1>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-muted-foreground">
            Network Guardian provides advanced monitoring and protection for your wireless networks, keeping your digital assets safe from threats
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="w-full sm:w-auto text-lg px-8">
                Access Dashboard
              </Button>
            </Link>
            <Link to="/features">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8">
                Explore Features
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Network Guardian?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive solution provides everything you need to secure your network infrastructure
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Complete Protection</h3>
              <p className="text-muted-foreground">
                Comprehensive security features to monitor, detect, and respond to network threats in real-time
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Database className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Management</h3>
              <p className="text-muted-foreground">
                Intuitive interface that makes complex network management accessible to users of all technical levels
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Proactive Alerts</h3>
              <p className="text-muted-foreground">
                Stay informed with instant notifications about potential security threats and network changes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Highlights */}
      <section className="py-16 px-4 bg-muted">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center h-full bg-card">
              <CardContent className="pt-8 pb-6 h-full flex flex-col">
                <div className="flex justify-center mb-4">
                  <Wifi className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Network Scanning</h3>
                <p className="text-muted-foreground flex-grow">
                  Automatically discover and monitor all devices connected to your network with comprehensive scanning capabilities
                </p>
                <Link to="/features" className="text-primary hover:text-primary/80 flex items-center justify-center gap-1 mt-4">
                  <span>Learn more</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
            
            <Card className="text-center h-full bg-card">
              <CardContent className="pt-8 pb-6 h-full flex flex-col">
                <div className="flex justify-center mb-4">
                  <Database className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Device Management</h3>
                <p className="text-muted-foreground flex-grow">
                  Track and manage all devices with detailed information including IP addresses, MAC addresses, and device history
                </p>
                <Link to="/features" className="text-primary hover:text-primary/80 flex items-center justify-center gap-1 mt-4">
                  <span>Learn more</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
            
            <Card className="text-center h-full bg-card">
              <CardContent className="pt-8 pb-6 h-full flex flex-col">
                <div className="flex justify-center mb-4">
                  <AlertTriangle className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Threat Detection</h3>
                <p className="text-muted-foreground flex-grow">
                  Identify and alert about potential security threats on your network with advanced threat intelligence
                </p>
                <Link to="/features" className="text-primary hover:text-primary/80 flex items-center justify-center gap-1 mt-4">
                  <span>Learn more</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
            
            <Card className="text-center h-full bg-card">
              <CardContent className="pt-8 pb-6 h-full flex flex-col">
                <div className="flex justify-center mb-4">
                  <Shield className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Security Management</h3>
                <p className="text-muted-foreground flex-grow">
                  Implement protection measures and manage security policies to maintain a secure network environment
                </p>
                <Link to="/features" className="text-primary hover:text-primary/80 flex items-center justify-center gap-1 mt-4">
                  <span>Learn more</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-card">
              <CardContent className="p-6">
                <p className="italic text-muted-foreground mb-6">
                  "Network Guardian has transformed how we manage our company's network security. The real-time monitoring and threat detection have given us peace of mind."
                </p>
                <div>
                  <p className="font-semibold">Michael T.</p>
                  <p className="text-sm text-muted-foreground">IT Director, TechSolutions Inc.</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card">
              <CardContent className="p-6">
                <p className="italic text-muted-foreground mb-6">
                  "As someone with limited technical knowledge, I found Network Guardian incredibly user-friendly while still providing powerful protection for my home network."
                </p>
                <div>
                  <p className="font-semibold">Sarah J.</p>
                  <p className="text-sm text-muted-foreground">Small Business Owner</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card">
              <CardContent className="p-6">
                <p className="italic text-muted-foreground mb-6">
                  "The detailed analytics and reporting features have helped us identify and address security vulnerabilities we didn't even know existed."
                </p>
                <div>
                  <p className="font-semibold">David L.</p>
                  <p className="text-sm text-muted-foreground">Network Administrator</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-card">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Ready to secure your network?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto text-muted-foreground">
            Get started with Network Guardian today and take control of your network security with our comprehensive toolkit
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="flex items-center gap-2 px-8">
                <span>Access Dashboard</span>
                <ExternalLink className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contact-us">
              <Button size="lg" variant="outline" className="px-8">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </FrontLayout>
  );
};

export default HomePage;

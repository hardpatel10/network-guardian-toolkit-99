
import React from 'react';
import FrontLayout from '@/components/layout/FrontLayout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Shield, Wifi, Database, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const HomePage: React.FC = () => {
  return (
    <FrontLayout>
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-background to-muted">
        <div className="container mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Shield className="h-16 w-16 text-security-DEFAULT" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Secure Your Network with Confidence</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-muted-foreground">
            Network Guardian Toolkit provides advanced monitoring and protection for your wireless networks
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="w-full sm:w-auto">
                Access Dashboard
              </Button>
            </Link>
            <Link to="/features">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Explore Features
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Highlights */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <Wifi className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Network Scanning</h3>
                <p className="text-muted-foreground">
                  Automatically discover and monitor all devices connected to your network
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <Database className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Device Management</h3>
                <p className="text-muted-foreground">
                  Track and manage all devices with detailed information and history
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <AlertTriangle className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Threat Detection</h3>
                <p className="text-muted-foreground">
                  Identify and alert about potential security threats on your network
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <Shield className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Security Management</h3>
                <p className="text-muted-foreground">
                  Implement protection measures and manage security policies
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-card">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to secure your network?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-muted-foreground">
            Get started with Network Guardian Toolkit today and take control of your network security
          </p>
          <Link to="/dashboard">
            <Button size="lg">
              Launch Dashboard
            </Button>
          </Link>
        </div>
      </section>
    </FrontLayout>
  );
};

export default HomePage;

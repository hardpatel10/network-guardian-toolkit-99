
import React from 'react';
import FrontLayout from '@/components/layout/FrontLayout';
import { Shield, Wifi, Database, AlertTriangle, Activity, History, Settings, Bell } from 'lucide-react';

const FeatureSection = ({ icon: Icon, title, description, isReversed = false }) => {
  return (
    <div className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center mb-16`}>
      <div className="w-full md:w-1/2 flex justify-center">
        <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon className="h-16 w-16 text-primary" />
        </div>
      </div>
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

const FeaturesPage: React.FC = () => {
  return (
    <FrontLayout>
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-background to-muted">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">Comprehensive Network Security Features</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-muted-foreground">
            Discover the powerful tools and features that make Network Guardian Toolkit the premier choice for network security
          </p>
        </div>
      </section>

      {/* Features Detail */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <FeatureSection 
            icon={Wifi}
            title="Network Scanning"
            description="Automatically discover and monitor all devices connected to your network. Perform deep scans to identify devices, operating systems, and open ports. Get a comprehensive view of your network infrastructure."
          />
          
          <FeatureSection 
            icon={Database}
            title="Device Management"
            description="Track and manage all devices with detailed information including IP addresses, MAC addresses, manufacturers, and connection history. Identify unknown devices and take action when necessary."
            isReversed={true}
          />
          
          <FeatureSection 
            icon={AlertTriangle}
            title="Threat Detection"
            description="Identify potential security threats on your network in real-time. Get alerts about suspicious activities, unauthorized access attempts, and potential vulnerabilities."
          />
          
          <FeatureSection 
            icon={Shield}
            title="Security Management"
            description="Implement protection measures and manage security policies. Block suspicious devices, analyze threats, and maintain a secure network environment."
            isReversed={true}
          />
          
          <FeatureSection 
            icon={Activity}
            title="Real-time Monitoring"
            description="Monitor network activity in real-time with intuitive visualizations and dashboards. Track bandwidth usage, connection statistics, and device status."
          />
          
          <FeatureSection 
            icon={History}
            title="Historical Data Analysis"
            description="Access historical data for trend analysis and security audits. Review connection history, security events, and network changes over time."
            isReversed={true}
          />
          
          <FeatureSection 
            icon={Bell}
            title="Customizable Notifications"
            description="Configure alerts and notifications based on your specific needs. Get informed about new devices, security threats, status updates, and scan completions."
          />
          
          <FeatureSection 
            icon={Settings}
            title="Flexible Configuration"
            description="Customize the application to meet your specific needs with extensive configuration options. Adjust scanning intervals, security policies, display preferences, and more."
            isReversed={true}
          />
        </div>
      </section>
    </FrontLayout>
  );
};

export default FeaturesPage;

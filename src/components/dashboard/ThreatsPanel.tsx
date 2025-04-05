
import React, { useState, useEffect } from 'react';
import { AlertTriangle, ShieldAlert, ShieldCheck, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { apiService, NetworkDevice } from '@/services/apiService';
import { cn } from '@/lib/utils';

interface ThreatItemProps {
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  time: string;
}

const ThreatItem: React.FC<ThreatItemProps> = ({ 
  title, 
  description, 
  severity, 
  time 
}) => {
  const getSeverityColor = () => {
    switch (severity) {
      case 'high': return 'text-security-danger';
      case 'medium': return 'text-security-alert';
      case 'low': return 'text-security-neutral';
      default: return 'text-security-neutral';
    }
  };

  const getSeverityBg = () => {
    switch (severity) {
      case 'high': return 'bg-security-danger/20';
      case 'medium': return 'bg-security-alert/20';
      case 'low': return 'bg-security-neutral/20';
      default: return 'bg-security-neutral/20';
    }
  };

  return (
    <div className={`p-3 rounded-md mb-3 ${getSeverityBg()}`}>
      <div className="flex justify-between items-start mb-1">
        <div className="flex items-center gap-2">
          <AlertTriangle className={`h-4 w-4 ${getSeverityColor()}`} />
          <span className="font-medium">{title}</span>
        </div>
        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="h-3 w-3 mr-1" />
          {time}
        </div>
      </div>
      <p className="text-sm text-muted-foreground ml-6">{description}</p>
    </div>
  );
};

const ThreatsPanel: React.FC = () => {
  const [securityScore, setSecurityScore] = useState(100);
  const [threats, setThreats] = useState<ThreatItemProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchThreats = async () => {
      setIsLoading(true);
      try {
        const scanResult = await apiService.getNetworkScan();
        const devices = scanResult.devices || [];
        
        // Generate threats based on scan results
        const newThreats: ThreatItemProps[] = [];
        let score = 100;
        
        // Check for devices with open ports
        devices.forEach((device) => {
          if (device.open_ports && device.open_ports.length > 0) {
            const criticalPorts = [22, 23, 25, 445, 3389, 80, 8080]; // SSH, Telnet, SMTP, SMB, RDP, HTTP
            const hasCriticalPort = device.open_ports.some(p => criticalPorts.includes(p.port));
            
            if (hasCriticalPort) {
              // Critical port found
              score -= 15;
              const criticalPort = device.open_ports.find(p => criticalPorts.includes(p.port));
              newThreats.push({
                title: `Critical Port Detected`,
                description: `Port ${criticalPort?.port} (${criticalPort?.service}) is open on ${device.hostname || device.ip}`,
                severity: 'high',
                time: 'Now'
              });
            } else if (device.open_ports.length > 3) {
              // Non-critical but multiple open ports
              score -= 5;
              newThreats.push({
                title: `Multiple Open Ports`,
                description: `${device.open_ports.length} open ports on ${device.hostname || device.ip}`,
                severity: 'medium',
                time: 'Now'
              });
            }
          }
        });
        
        // Check for unknown devices
        const unknownDevices = devices.filter(d => !d.hostname || d.hostname === 'Unknown' || !d.manufacturer || d.manufacturer === 'Unknown');
        if (unknownDevices.length > 0) {
          score -= 10;
          newThreats.push({
            title: "Unknown Devices Detected",
            description: `${unknownDevices.length} devices with unidentified hostname or manufacturer`,
            severity: 'medium',
            time: 'Now'
          });
        }

        // Check for outdated OS
        const outdatedOsDevices = devices.filter(d => {
          const osInfo = d.os?.toLowerCase() || '';
          return osInfo.includes('xp') || osInfo.includes('vista') || osInfo.includes('2003') || osInfo.includes('2000');
        });
        
        if (outdatedOsDevices.length > 0) {
          score -= 20;
          newThreats.push({
            title: "Outdated Operating Systems",
            description: `${outdatedOsDevices.length} devices running outdated and insecure operating systems`,
            severity: 'high',
            time: 'Now'
          });
        }
        
        // Ensure score stays between 0-100
        setSecurityScore(Math.max(0, Math.min(100, score)));
        setThreats(newThreats);
        
      } catch (error) {
        console.error("Error fetching threats:", error);
        // Set default threats if API fails
        setThreats([{
          title: "Scan Error",
          description: "Could not complete security assessment",
          severity: 'medium',
          time: 'Now'
        }]);
        setSecurityScore(50);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchThreats();
  }, []);

  return (
    <Card className="security-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Security Threats</CardTitle>
        <ShieldAlert className="h-5 w-5 text-security-alert" />
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between mb-1 text-sm">
            <span>Network Security Score</span>
            <span className={cn(
              "font-medium",
              securityScore >= 80 ? "text-security-safe" : 
              securityScore >= 50 ? "text-security-alert" : 
              "text-security-danger"
            )}>
              {securityScore}/100
            </span>
          </div>
          <Progress 
            value={securityScore} 
            className={cn(
              "h-2",
              securityScore >= 80 ? "bg-secondary" : "bg-secondary/50"
            )}
          />
        </div>
        
        <div className="mt-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-pulse flex space-x-4 w-full">
                <div className="flex-1 space-y-4">
                  <div className="h-4 bg-secondary rounded"></div>
                  <div className="h-10 bg-secondary/50 rounded"></div>
                  <div className="h-10 bg-secondary/50 rounded"></div>
                </div>
              </div>
            </div>
          ) : threats.length > 0 ? (
            threats.map((threat, index) => (
              <ThreatItem 
                key={index}
                title={threat.title}
                description={threat.description}
                severity={threat.severity}
                time={threat.time}
              />
            ))
          ) : (
            <div className="flex items-center justify-center py-4 text-security-safe">
              <ShieldCheck className="h-5 w-5 mr-2" />
              <span>No threats detected</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ThreatsPanel;

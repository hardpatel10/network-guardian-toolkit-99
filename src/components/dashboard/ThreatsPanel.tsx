
import React, { useState, useEffect } from 'react';
import { AlertTriangle, ShieldAlert, ShieldCheck, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { apiService, NetworkDevice } from '@/services/apiService';

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
        
        // Calculate security score
        const score = apiService.calculateSecurityScore(devices);
        setSecurityScore(score);
        
        // Get threats based on devices
        const detectedThreats = apiService.getSecurityThreats(devices);
        setThreats(detectedThreats);
        
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
            <span className="font-medium">{securityScore}/100</span>
          </div>
          <Progress value={securityScore} className="h-2 bg-secondary" />
        </div>
        
        <div className="mt-4">
          {isLoading ? (
            <div className="animate-pulse space-y-3">
              <div className="h-16 bg-secondary/30 rounded-md"></div>
              <div className="h-16 bg-secondary/30 rounded-md"></div>
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


import React from 'react';
import { AlertTriangle, ShieldAlert, ShieldCheck, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

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
            <span className="font-medium">72/100</span>
          </div>
          <Progress value={72} className="h-2 bg-secondary" indicatorClassName="bg-security-alert" />
        </div>
        
        <div className="mt-4">
          <ThreatItem 
            title="Unauthorized Device" 
            description="Unknown device with MAC FF:EE:DD:CC:BB:AA connected"
            severity="high"
            time="5 min ago"
          />
          <ThreatItem 
            title="Open Port Detected" 
            description="Port 22 (SSH) is open on Media Server"
            severity="medium"
            time="30 min ago"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ThreatsPanel;

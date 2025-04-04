
import React from 'react';
import { Shield, AlertTriangle, WifiOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatusCardProps {
  title: string;
  value: string | number;
  status: 'secure' | 'warning' | 'danger' | 'neutral';
  icon: React.ElementType;
}

const StatusCard: React.FC<StatusCardProps> = ({ title, value, status, icon: Icon }) => {
  const statusColors = {
    secure: 'text-security-safe',
    warning: 'text-security-alert',
    danger: 'text-security-danger',
    neutral: 'text-security-neutral',
  };

  return (
    <Card className="security-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-5 w-5 ${statusColors[status]}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className={`mt-2 ${status === 'secure' ? 'status-secure' : status === 'warning' ? 'status-warning' : status === 'danger' ? 'status-danger' : 'status-neutral'}`}>
          {status === 'secure' ? 'Secure' : status === 'warning' ? 'Warning' : status === 'danger' ? 'Critical' : 'Unknown'}
        </div>
      </CardContent>
    </Card>
  );
};

const StatusOverview: React.FC = () => {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <StatusCard
        title="Network Status"
        value="Secure"
        status="secure"
        icon={Shield}
      />
      <StatusCard
        title="Threats Detected"
        value={2}
        status="warning"
        icon={AlertTriangle}
      />
      <StatusCard
        title="Unauthorized Devices"
        value={1}
        status="danger"
        icon={WifiOff}
      />
    </div>
  );
};

export default StatusOverview;

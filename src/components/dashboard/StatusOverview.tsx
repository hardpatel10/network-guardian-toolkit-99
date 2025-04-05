
import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, WifiOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { apiService } from '@/services/apiService';
import { useQuery } from '@tanstack/react-query';

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
  const { data: networkScanData, isLoading } = useQuery({
    queryKey: ['networkScan'],
    queryFn: apiService.getNetworkScan,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000 // 5 minutes
  });
  
  const [networkStatus, setNetworkStatus] = useState<{ status: 'secure' | 'warning' | 'danger' | 'neutral', value: string }>({ 
    status: 'neutral', 
    value: 'Loading...' 
  });
  const [threatsDetected, setThreatsDetected] = useState(0);
  const [unauthorizedDevices, setUnauthorizedDevices] = useState(0);
  
  useEffect(() => {
    if (!networkScanData || isLoading) return;
    
    try {
      const devices = networkScanData.devices || [];
      
      // Calculate threats - count devices with open sensitive ports
      const sensitiveServices = ['ssh', 'telnet', 'rdp', 'smb', 'netbios', 'ftp'];
      const devicesWithSensitivePorts = devices.filter(device => 
        device.open_ports && device.open_ports.some(port => 
          sensitiveServices.some(service => 
            port.service?.toLowerCase().includes(service)
          )
        )
      ).length;
      
      setThreatsDetected(devicesWithSensitivePorts);
      
      // Calculate potentially unauthorized devices
      const unknownDevices = devices.filter(device => 
        !device.hostname || device.hostname === 'Unknown' || 
        !device.manufacturer || device.manufacturer === 'Unknown'
      ).length;
      
      setUnauthorizedDevices(unknownDevices);
      
      // Set overall network status based on threats
      if (devicesWithSensitivePorts === 0 && unknownDevices === 0) {
        setNetworkStatus({ status: 'secure', value: 'Secure' });
      } else if (devicesWithSensitivePorts > 0 && unknownDevices === 0) {
        setNetworkStatus({ status: 'warning', value: 'Warning' });
      } else if (unknownDevices > 0) {
        setNetworkStatus({ status: 'danger', value: 'Critical' });
      } else {
        setNetworkStatus({ status: 'neutral', value: 'Unknown' });
      }
    } catch (error) {
      console.error('Error processing network status:', error);
      setNetworkStatus({ status: 'neutral', value: 'Unknown' });
    }
  }, [networkScanData, isLoading]);

  if (isLoading) {
    return (
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map(i => (
          <Card key={i} className="security-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="h-4 w-24 bg-secondary rounded-md animate-pulse"></div>
              <div className="h-5 w-5 bg-secondary rounded-full animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-secondary rounded-md w-16 animate-pulse"></div>
              <div className="mt-2 h-6 bg-secondary/50 rounded-md w-24 animate-pulse"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <StatusCard
        title="Network Status"
        value={networkStatus.value}
        status={networkStatus.status}
        icon={Shield}
      />
      <StatusCard
        title="Threats Detected"
        value={threatsDetected}
        status={threatsDetected > 0 ? 'warning' : 'secure'}
        icon={AlertTriangle}
      />
      <StatusCard
        title="Unauthorized Devices"
        value={unauthorizedDevices}
        status={unauthorizedDevices > 0 ? 'danger' : 'secure'}
        icon={WifiOff}
      />
    </div>
  );
};

export default StatusOverview;

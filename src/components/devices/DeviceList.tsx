
import React, { useState, useEffect } from 'react';
import { Laptop, Smartphone, Server, Tablet, Router, MoreVertical, Shield, AlertTriangle, Loader2, WifiIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { NetworkDevice, apiService } from '@/services/apiService';

// Define device types and their icons
const deviceIcons: Record<string, React.ElementType> = {
  laptop: Laptop,
  smartphone: Smartphone,
  server: Server,
  tablet: Tablet,
  router: Router,
};

const DeviceList: React.FC = () => {
  const [devices, setDevices] = useState<NetworkDevice[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentIp, setCurrentIp] = useState('');
  const [networkRange, setNetworkRange] = useState('');
  const { toast } = useToast();

  const fetchDevices = async () => {
    setIsLoading(true);
    try {
      const result = await apiService.getNetworkScan();
      setDevices(result.devices || []);
      setCurrentIp(result.current_ip || '');
      setNetworkRange(result.network_range || '');
      toast({
        title: "Network Scan Complete",
        description: `Found ${result.devices.length} devices on your network`,
      });
    } catch (error) {
      console.error('Error fetching devices:', error);
      toast({
        title: "Scan Failed",
        description: "Could not complete the network scan. Check your connection.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchDevices();
  }, []);

  // Determine device type based on hostname and manufacturer
  const getDeviceType = (device: NetworkDevice): keyof typeof deviceIcons => {
    const hostname = device.hostname.toLowerCase();
    const manufacturer = device.manufacturer.toLowerCase();
    
    if (['router', 'gateway', 'modem'].some(term => hostname.includes(term)) || 
        hostname === 'main router') {
      return 'router';
    } else if (['server', 'nas'].some(term => hostname.includes(term))) {
      return 'server';
    } else if (['iphone', 'android', 'phone', 'mobile'].some(term => 
        hostname.includes(term) || manufacturer.includes(term))) {
      return 'smartphone';
    } else if (['ipad', 'tablet', 'surface'].some(term => 
        hostname.includes(term) || manufacturer.includes(term))) {
      return 'tablet';
    }
    
    return 'laptop';
  };

  return (
    <Card className="security-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-sm font-medium">Connected Devices</CardTitle>
          {networkRange && (
            <p className="text-xs text-muted-foreground mt-1">
              Network range: {networkRange} | Your IP: {currentIp}
            </p>
          )}
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={fetchDevices}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-1 animate-spin" /> Scanning...
            </>
          ) : (
            <>Scan Now</>
          )}
        </Button>
      </CardHeader>
      <CardContent>
        {devices.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Device</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead className="hidden md:table-cell">MAC Address</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {devices.map((device, index) => {
                const deviceType = getDeviceType(device);
                const DeviceIcon = deviceIcons[deviceType];
                const hasOpenPorts = device.open_ports && device.open_ports.length > 0;
                const StatusIcon = hasOpenPorts ? AlertTriangle : Shield;
                const statusClassName = hasOpenPorts ? 'text-security-alert' : 'text-security-safe';
                
                return (
                  <TableRow key={`${device.ip}-${index}`}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <DeviceIcon className="h-4 w-4" />
                        <span>{device.hostname || 'Unknown'}</span>
                      </div>
                    </TableCell>
                    <TableCell>{device.ip}</TableCell>
                    <TableCell className="hidden md:table-cell">{device.mac}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <StatusIcon className={`h-4 w-4 ${statusClassName}`} />
                        <span className="hidden md:inline">
                          {hasOpenPorts ? `${device.open_ports.length} ports open` : 'Secure'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : isLoading ? (
          <div className="py-8 flex flex-col items-center justify-center text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin mb-2" />
            <p>Scanning your network for devices...</p>
          </div>
        ) : (
          <div className="py-8 flex flex-col items-center justify-center text-muted-foreground">
            <WifiIcon className="h-8 w-8 mb-2 text-muted-foreground/50" />
            <p>No devices found. Try scanning again.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DeviceList;

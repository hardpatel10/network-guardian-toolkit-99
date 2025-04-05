
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Laptop, 
  Wifi, 
  Router, 
  Smartphone, 
  Terminal,
  Shield,
  Printer,
  AlertTriangle
} from 'lucide-react';
import { NetworkDevice } from '@/services/apiService';

interface DeviceDetailsProps {
  device: NetworkDevice | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DeviceDetails: React.FC<DeviceDetailsProps> = ({ device, open, onOpenChange }) => {
  if (!device) return null;

  const getDeviceIcon = () => {
    const hostname = device.hostname?.toLowerCase() || '';
    
    if (hostname.includes('phone') || hostname.includes('mobile') || hostname.includes('android') || hostname.includes('iphone')) {
      return <Smartphone className="w-8 h-8 text-primary" />;
    } else if (hostname.includes('laptop') || hostname.includes('desktop') || hostname.includes('pc')) {
      return <Laptop className="w-8 h-8 text-primary" />;
    } else if (hostname.includes('router') || hostname.includes('gateway') || hostname.includes('modem')) {
      return <Router className="w-8 h-8 text-primary" />;
    } else if (hostname.includes('printer')) {
      return <Printer className="w-8 h-8 text-primary" />;
    } else {
      return <Wifi className="w-8 h-8 text-primary" />;
    }
  };

  const hasCriticalPorts = device.open_ports?.some(port => 
    [22, 23, 25, 445, 3389].includes(port.port)
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getDeviceIcon()}
            <span>{device.hostname || 'Unknown Device'}</span>
            {hasCriticalPorts && (
              <Badge variant="destructive" className="ml-2 text-xs">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Security Risk
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription>
            {device.manufacturer || 'Unknown Manufacturer'} - {device.ip}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Device Information</h3>
            <div className="grid grid-cols-2 gap-1 text-sm">
              <div className="text-muted-foreground">IP Address</div>
              <div>{device.ip}</div>
              <div className="text-muted-foreground">MAC Address</div>
              <div>{device.mac}</div>
              <div className="text-muted-foreground">Manufacturer</div>
              <div>{device.manufacturer || 'Unknown'}</div>
              <div className="text-muted-foreground">Operating System</div>
              <div>{device.os || 'Unknown'}</div>
              <div className="text-muted-foreground">BSSID</div>
              <div>{device.bssid || 'N/A'}</div>
              <div className="text-muted-foreground">TTL</div>
              <div>{device.ttl || 'N/A'}</div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Network Information</h3>
            <div className="grid grid-cols-2 gap-1 text-sm">
              <div className="text-muted-foreground">NetBIOS</div>
              <div>{typeof device.netbios === 'object' ? 
                `${device.netbios.name || 'N/A'} (${device.netbios.user || 'N/A'})` : 
                device.netbios || 'N/A'}</div>
              <div className="text-muted-foreground">SMB Port</div>
              <div>{device.smb_port || 'N/A'}</div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium">Open Ports</h3>
          {device.open_ports && device.open_ports.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {device.open_ports.map((port, idx) => (
                <Badge key={idx} variant={[22, 23, 25, 445, 3389].includes(port.port) ? "destructive" : "outline"} className="text-xs">
                  <Terminal className="w-3 h-3 mr-1" />
                  {port.port} ({port.service})
                </Badge>
              ))}
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">No open ports detected</div>
          )}
        </div>

        {device.streaming_ports && device.streaming_ports.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Streaming Ports</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {device.streaming_ports.map((port, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {port.port} ({port.service})
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-3">
          <h3 className="text-sm font-medium">Trace Route</h3>
          <div className="p-2 bg-secondary/20 rounded text-xs font-mono whitespace-pre-wrap">
            {device.traceout || 'No trace route data available'}
          </div>
        </div>

        <DialogFooter>
          <Button variant="destructive" className="gap-1">
            <Shield className="w-4 h-4" />
            Block Device
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeviceDetails;

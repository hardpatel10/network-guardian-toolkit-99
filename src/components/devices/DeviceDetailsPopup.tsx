
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NetworkDevice } from '@/services/apiService';
import { 
  Wifi, 
  Server, 
  Shield, 
  Code, 
  Network, 
  Layers,
  X,
  ExternalLink,
  AlertCircle
} from 'lucide-react';

interface DeviceDetailsPopupProps {
  device: NetworkDevice | null;
  isOpen: boolean;
  onClose: () => void;
}

const DeviceDetailsPopup: React.FC<DeviceDetailsPopupProps> = ({ device, isOpen, onClose }) => {
  if (!device) return null;

  const formatPortsList = (ports: { port: number; service: string }[] | undefined) => {
    if (!ports || ports.length === 0) {
      return <span className="text-muted-foreground">No open ports detected</span>;
    }
    
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {ports.map((port, index) => (
          <Badge key={index} variant="outline" className="justify-start">
            {port.port} - {port.service}
          </Badge>
        ))}
      </div>
    );
  };

  const formatNetbiosInfo = (netbios: any) => {
    if (!netbios || netbios === "No NetBIOS data" || netbios === "Error") {
      return <span className="text-muted-foreground">No NetBIOS data available</span>;
    }
    
    return (
      <div className="space-y-1">
        {netbios.name && <div><span className="font-medium">Name:</span> {netbios.name}</div>}
        {netbios.user && <div><span className="font-medium">User:</span> {netbios.user}</div>}
        {netbios.mac && <div><span className="font-medium">MAC:</span> {netbios.mac}</div>}
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wifi className="h-5 w-5 text-primary" />
              <DialogTitle className="text-xl">{device.hostname || 'Unknown Device'}</DialogTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription>
            Device details and security information
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="info" className="mt-2">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="info">
              <Server className="h-4 w-4 mr-2" />
              Basic Info
            </TabsTrigger>
            <TabsTrigger value="network">
              <Network className="h-4 w-4 mr-2" />
              Network
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="info" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">IP Address</h3>
                <p>{device.ip}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Hostname</h3>
                <p>{device.hostname || 'Unknown'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">MAC Address</h3>
                <p>{device.mac || 'Unknown'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Manufacturer</h3>
                <p>{device.manufacturer || 'Unknown'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Operating System</h3>
                <p>{device.os || 'Unknown'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">BSSID</h3>
                <p>{device.bssid || 'Unknown'}</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="network" className="space-y-4 mt-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Open Ports</h3>
              {formatPortsList(device.open_ports)}
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Streaming Ports</h3>
              {formatPortsList(device.streaming_ports)}
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">SMB Port Status</h3>
              <p>{device.smb_port || 'Not detected'}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">TTL Value</h3>
              <p>{device.ttl || 'Unknown'}</p>
            </div>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4 mt-4">
            <div>
              <h3 className="text-sm font-medium mb-2">NetBIOS Information</h3>
              {formatNetbiosInfo(device.netbios)}
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Traceroute</h3>
              <div className="bg-secondary/30 p-2 rounded-md text-xs font-mono overflow-x-auto whitespace-pre">
                {device.traceout || 'Traceroute data not available'}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Security Assessment</h3>
              <div className="bg-secondary/30 p-3 rounded-md">
                {device.open_ports && device.open_ports.length > 0 ? (
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-security-alert mt-0.5" />
                    <div>
                      <p className="font-medium">Open ports detected</p>
                      <p className="text-sm text-muted-foreground">
                        This device has {device.open_ports.length} open ports which may present security risks.
                        Consider disabling unused services.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-2">
                    <Shield className="h-5 w-5 text-security-safe mt-0.5" />
                    <div>
                      <p className="font-medium">No open ports detected</p>
                      <p className="text-sm text-muted-foreground">
                        This device appears to be well protected with no open ports detected.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0 mt-4">
          <Button variant="outline" size="sm" className="gap-2" onClick={onClose}>
            <X className="h-4 w-4" />
            Close
          </Button>
          <Button size="sm" className="gap-2">
            <Shield className="h-4 w-4" />
            Run Security Scan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeviceDetailsPopup;

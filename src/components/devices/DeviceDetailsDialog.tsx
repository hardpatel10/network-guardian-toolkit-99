
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NetworkDevice } from '@/services/apiService';
import { 
  Wifi, 
  Server, 
  Network, 
  ArrowUpDown, 
  Shield, 
  MonitorSmartphone, 
  Info,
  Computer
} from 'lucide-react';

interface DeviceDetailsDialogProps {
  device: NetworkDevice | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DeviceDetailsDialog: React.FC<DeviceDetailsDialogProps> = ({ 
  device, 
  open, 
  onOpenChange 
}) => {
  if (!device) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Computer className="h-5 w-5" />
            {device.hostname || 'Unknown Device'} ({device.ip})
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          {/* Basic Information */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <Info className="h-4 w-4" />
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">IP Address</span>
                    <span className="font-medium">{device.ip}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">MAC Address</span>
                    <span className="font-medium">{device.mac}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Hostname</span>
                    <span className="font-medium">{device.hostname || 'Unknown'}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Manufacturer</span>
                    <span className="font-medium">{device.manufacturer || 'Unknown'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Operating System</span>
                    <span className="font-medium">{device.os || 'Unknown'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">TTL</span>
                    <span className="font-medium">{device.ttl || 'Unknown'}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Network & Connectivity */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <Network className="h-4 w-4" />
                Network & Connectivity
              </h3>
              <div className="space-y-3">
                {device.open_ports && device.open_ports.length > 0 ? (
                  <>
                    <h4 className="text-sm font-medium">Open Ports</h4>
                    <div className="flex flex-wrap gap-2">
                      {device.open_ports.map((port, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {port.port}: {port.service}
                        </Badge>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-sm">No open ports detected</div>
                )}
                
                {device.streaming_ports && device.streaming_ports.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium">Streaming Ports</h4>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {device.streaming_ports.map((port, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {port.port}: {port.service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-4 text-sm">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-muted-foreground block">SMB Status</span>
                      <span className="font-medium">{device.smb_port || 'Not detected'}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block">BSSID</span>
                      <span className="font-medium">{device.bssid || 'Unknown'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Assessment */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Security Assessment
              </h3>
              
              <div className="space-y-3">
                {device.open_ports && device.open_ports.length > 0 ? (
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-3 rounded-md">
                    <p className="text-sm text-yellow-800 dark:text-yellow-400">
                      This device has {device.open_ports.length} open ports that could potentially be exploited.
                      Consider closing unnecessary ports to improve security.
                    </p>
                  </div>
                ) : (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-3 rounded-md">
                    <p className="text-sm text-green-800 dark:text-green-400">
                      No open ports detected. This device has good network security.
                    </p>
                  </div>
                )}

                {device.netbios && typeof device.netbios === 'object' && Object.keys(device.netbios).length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">NetBIOS Information</h4>
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-3 rounded-md">
                      <dl className="text-sm grid gap-1">
                        {Object.entries(device.netbios).map(([key, value]) => (
                          <div key={key} className="grid grid-cols-2">
                            <dt className="text-muted-foreground">{key}:</dt>
                            <dd>{String(value)}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Advanced Network Info */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <Server className="h-4 w-4" />
                Advanced Network Info
              </h3>
              
              <div className="space-y-4">
                {device.traceout && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Network Route (Traceroute)</h4>
                    <div className="bg-muted p-3 rounded-md text-xs font-mono overflow-x-auto max-h-40 whitespace-pre">
                      {device.traceout}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeviceDetailsDialog;

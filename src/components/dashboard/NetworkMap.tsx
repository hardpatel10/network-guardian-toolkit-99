
import React, { useState, useEffect, useCallback } from 'react';
import { WifiIcon, Server, Laptop, Smartphone, Tablet, Router, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { apiService, NetworkDevice } from '@/services/apiService';
import { useQuery } from '@tanstack/react-query';

const NetworkMap: React.FC = () => {
  const { data: networkData, isLoading } = useQuery({
    queryKey: ['networkScan'],
    queryFn: apiService.getNetworkScan,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000 // 5 minutes
  });

  const getDeviceIcon = useCallback((device: NetworkDevice) => {
    const hostname = (device.hostname || '').toLowerCase();
    const manufacturer = (device.manufacturer || '').toLowerCase();
    
    if (hostname.includes('router') || hostname.includes('gateway') || hostname === 'main router') {
      return Router;
    } else if (hostname.includes('server') || hostname.includes('nas')) {
      return Server;
    } else if (hostname.includes('iphone') || hostname.includes('android') || 
               manufacturer.includes('apple') && hostname.includes('phone')) {
      return Smartphone;
    } else if (hostname.includes('ipad') || hostname.includes('tablet')) {
      return Tablet;
    }
    return Laptop;
  }, []);

  // Calculate device position on the radar
  const getDevicePosition = useCallback((index: number, total: number) => {
    // Position devices in a circular pattern
    const radius = total <= 4 ? 40 : 55;
    const angle = (index / total) * 2 * Math.PI;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    
    // Convert to percentage for CSS positioning
    return {
      left: `calc(50% + ${x}%)`,
      top: `calc(50% + ${y}%)`,
    };
  }, []);

  // Determine if a device might be suspicious (has open sensitive ports)
  const isSuspiciousDevice = useCallback((device: NetworkDevice) => {
    const sensitiveServices = ['ssh', 'telnet', 'rdp', 'smb', 'netbios', 'ftp'];
    
    // Check if device has open ports with sensitive services
    return device.open_ports?.some(port => 
      sensitiveServices.some(service => 
        port.service?.toLowerCase().includes(service)
      )
    ) || false;
  }, []);

  const devices = networkData?.devices || [];

  return (
    <Card className="security-card col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Network Map</CardTitle>
        <WifiIcon className="h-5 w-5 text-security-DEFAULT" />
      </CardHeader>
      <CardContent className="relative">
        <div className="w-full h-[300px] relative flex items-center justify-center">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center">
              <Loader2 className="h-10 w-10 animate-spin text-security-DEFAULT mb-2" />
              <p className="text-sm text-muted-foreground">Scanning network...</p>
            </div>
          ) : devices.length === 0 ? (
            <div className="flex flex-col items-center justify-center">
              <WifiIcon className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">No devices found on network</p>
            </div>
          ) : (
            <>
              {/* Radar animation */}
              <div className="w-60 h-60 rounded-full border border-security-DEFAULT/30 relative flex items-center justify-center">
                <div className="w-40 h-40 rounded-full border border-security-DEFAULT/30 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full border border-security-DEFAULT/30 flex items-center justify-center">
                    <div className="radar-indicator animate-radar-scan"></div>
                    <div className="z-10 bg-security-DEFAULT/20 w-10 h-10 rounded-full flex items-center justify-center">
                      <Router className="h-6 w-6 text-security-light" />
                    </div>
                  </div>
                  
                  {/* Connected devices - dynamically positioned */}
                  {devices.slice(0, 12).map((device, index) => {
                    const DeviceIcon = getDeviceIcon(device);
                    const position = getDevicePosition(index, Math.min(12, devices.length));
                    const isSuspicious = isSuspiciousDevice(device);
                    
                    return (
                      <div 
                        key={`${device.ip}-${index}`}
                        className="absolute animate-pulse-slow"
                        style={{
                          left: position.left,
                          top: position.top,
                          transform: 'translate(-50%, -50%)',
                        }}
                        title={`${device.hostname || 'Unknown'} (${device.ip})`}
                      >
                        <DeviceIcon 
                          className={`h-5 w-5 ${
                            isSuspicious ? 'text-security-danger' : 'text-security-light'
                          }`} 
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NetworkMap;

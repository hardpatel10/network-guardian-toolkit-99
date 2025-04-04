
import React from 'react';
import { Laptop, Smartphone, Server, DeviceTablet, Router, MoreVertical, Shield, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Define device types and their icons
const deviceIcons = {
  laptop: Laptop,
  smartphone: Smartphone,
  server: Server,
  tablet: DeviceTablet,
  router: Router,
};

// Mock device data
const devices = [
  {
    id: '1',
    name: 'Main Router',
    type: 'router',
    ipAddress: '192.168.1.1',
    macAddress: 'AA:BB:CC:DD:EE:FF',
    status: 'secure',
    lastSeen: 'Now',
  },
  {
    id: '2',
    name: 'Home Laptop',
    type: 'laptop',
    ipAddress: '192.168.1.101',
    macAddress: '11:22:33:44:55:66',
    status: 'secure',
    lastSeen: '2 min ago',
  },
  {
    id: '3',
    name: 'iPhone',
    type: 'smartphone',
    ipAddress: '192.168.1.102',
    macAddress: 'AA:22:BB:44:CC:66',
    status: 'secure',
    lastSeen: '1 min ago',
  },
  {
    id: '4',
    name: 'Unknown Device',
    type: 'smartphone',
    ipAddress: '192.168.1.103',
    macAddress: 'FF:EE:DD:CC:BB:AA',
    status: 'danger',
    lastSeen: '5 min ago',
  },
  {
    id: '5',
    name: 'Media Server',
    type: 'server',
    ipAddress: '192.168.1.104',
    macAddress: '12:34:56:78:90:AB',
    status: 'secure',
    lastSeen: '3 min ago',
  },
];

const DeviceList: React.FC = () => {
  return (
    <Card className="security-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Connected Devices</CardTitle>
        <Button variant="outline" size="sm">
          Scan Now
        </Button>
      </CardHeader>
      <CardContent>
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
            {devices.map((device) => {
              const DeviceIcon = deviceIcons[device.type as keyof typeof deviceIcons];
              const StatusIcon = device.status === 'secure' ? Shield : AlertTriangle;
              const statusClassName = 
                device.status === 'secure' 
                  ? 'text-security-safe' 
                  : device.status === 'warning' 
                    ? 'text-security-alert' 
                    : 'text-security-danger';
              
              return (
                <TableRow key={device.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <DeviceIcon className="h-4 w-4" />
                      <span>{device.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{device.ipAddress}</TableCell>
                  <TableCell className="hidden md:table-cell">{device.macAddress}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <StatusIcon className={`h-4 w-4 ${statusClassName}`} />
                      <span className="hidden md:inline">{device.lastSeen}</span>
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
      </CardContent>
    </Card>
  );
};

export default DeviceList;

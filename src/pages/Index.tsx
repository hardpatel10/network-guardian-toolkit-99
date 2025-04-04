
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatusOverview from '@/components/dashboard/StatusOverview';
import NetworkMap from '@/components/dashboard/NetworkMap';
import DeviceList from '@/components/devices/DeviceList';
import ThreatsPanel from '@/components/dashboard/ThreatsPanel';

const Index: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Network Security Dashboard</h1>
          <p className="text-sm text-muted-foreground">Last updated: Just now</p>
        </div>
        
        <StatusOverview />
        
        <div className="grid gap-4 md:grid-cols-3">
          <NetworkMap />
          <ThreatsPanel />
        </div>
        
        <DeviceList />
      </div>
    </DashboardLayout>
  );
};

export default Index;

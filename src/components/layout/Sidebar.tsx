
import React from 'react';
import { Home, Wifi, Shield, Database, AlertTriangle, Activity, History, Settings, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, isActive = false }) => {
  return (
    <Button
      variant="ghost"
      className={`w-full justify-start gap-3 ${
        isActive ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:text-foreground'
      }`}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </Button>
  );
};

const Sidebar: React.FC = () => {
  return (
    <aside className="hidden md:flex flex-col w-60 bg-card border-r border-border/50 overflow-y-auto">
      <div className="space-y-1 p-2">
        <SidebarItem icon={Home} label="Dashboard" isActive={true} />
        <SidebarItem icon={Wifi} label="Network" />
        <SidebarItem icon={Database} label="Devices" />
        <SidebarItem icon={Shield} label="Security" />
        <SidebarItem icon={AlertTriangle} label="Threats" />
        <SidebarItem icon={Activity} label="Monitoring" />
        <SidebarItem icon={History} label="History" />
      </div>
      
      <div className="mt-auto space-y-1 p-2 pt-4 border-t border-border/30">
        <SidebarItem icon={Settings} label="Settings" />
        <SidebarItem icon={HelpCircle} label="Help" />
      </div>
    </aside>
  );
};

export default Sidebar;

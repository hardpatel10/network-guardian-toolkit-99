
import React from 'react';
import { Home, Wifi, Shield, Database, AlertTriangle, Activity, History, Settings, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  path: string;
  isActive?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, path, isActive = false }) => {
  return (
    <Link to={path}>
      <Button
        variant="ghost"
        className={`w-full justify-start gap-3 ${
          isActive ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        <Icon className="h-5 w-5" />
        <span>{label}</span>
      </Button>
    </Link>
  );
};

const Sidebar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="hidden md:flex flex-col w-60 bg-card border-r border-border/50 overflow-y-auto">
      <div className="space-y-1 p-2">
        <SidebarItem icon={Home} label="Dashboard" path="/" isActive={currentPath === '/'} />
        <SidebarItem icon={Wifi} label="Network" path="/network" isActive={currentPath === '/network'} />
        <SidebarItem icon={Database} label="Devices" path="/devices" isActive={currentPath === '/devices'} />
        <SidebarItem icon={Shield} label="Security" path="/security" isActive={currentPath === '/security'} />
        <SidebarItem icon={AlertTriangle} label="Threats" path="/threats" isActive={currentPath === '/threats'} />
        <SidebarItem icon={Activity} label="Monitoring" path="/monitoring" isActive={currentPath === '/monitoring'} />
        <SidebarItem icon={History} label="Statistics" path="/statistics" isActive={currentPath === '/statistics'} />
      </div>
      
      <div className="mt-auto space-y-1 p-2 pt-4 border-t border-border/30">
        <SidebarItem icon={Settings} label="Settings" path="/settings" isActive={currentPath === '/settings'} />
        <SidebarItem icon={HelpCircle} label="Help" path="/help" isActive={currentPath === '/help'} />
      </div>
    </aside>
  );
};

export default Sidebar;

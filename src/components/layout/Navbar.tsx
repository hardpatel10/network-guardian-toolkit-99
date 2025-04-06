
import React from 'react';
import { Shield, Settings, Bell, Menu, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center bg-card/80 backdrop-blur-sm border-b border-border/50 px-4">
      <div className="flex items-center gap-2 md:gap-4 flex-1">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-security-DEFAULT" />
          <span className="font-bold text-lg hidden md:inline-block">Network Guardian</span>
        </div>

        <div className="hidden md:flex items-center space-x-1 ml-6">
          <Link to="/dashboard">
            <Button variant="ghost" className="text-foreground/70 hover:text-foreground">Dashboard</Button>
          </Link>
          <Link to="/dashboard/devices">
            <Button variant="ghost" className="text-foreground/70 hover:text-foreground">Devices</Button>
          </Link>
          <Link to="/dashboard/threats">
            <Button variant="ghost" className="text-foreground/70 hover:text-foreground">Threats</Button>
          </Link>
          <Link to="/dashboard/statistics">
            <Button variant="ghost" className="text-foreground/70 hover:text-foreground">Statistics</Button>
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Link to="/" className="mr-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <ExternalLink className="h-4 w-4" />
            <span className="hidden sm:inline">Main Site</span>
          </Button>
        </Link>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-security-alert"></span>
        </Button>
        <Link to="/dashboard/settings">
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;

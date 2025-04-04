
import React from 'react';
import { Shield, Settings, Bell, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
          <Button variant="ghost" className="text-foreground/70 hover:text-foreground">Dashboard</Button>
          <Button variant="ghost" className="text-foreground/70 hover:text-foreground">Devices</Button>
          <Button variant="ghost" className="text-foreground/70 hover:text-foreground">Threats</Button>
          <Button variant="ghost" className="text-foreground/70 hover:text-foreground">History</Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-security-alert"></span>
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default Navbar;

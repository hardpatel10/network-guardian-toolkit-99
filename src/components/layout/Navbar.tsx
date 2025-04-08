
import React from 'react';
import { Shield, Settings, Bell, Menu, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const isMobile = useIsMobile();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center bg-card/80 backdrop-blur-sm border-b border-border/50 px-4">
      <div className="flex items-center gap-2 md:gap-4 flex-1">
        {isMobile ? (
          <Drawer>
            <DrawerTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="md:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[90vh] overflow-y-auto">
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Shield className="h-6 w-6 text-security-DEFAULT" />
                    <span className="font-bold text-lg">Network Guardian</span>
                  </div>
                  <DrawerClose asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </DrawerClose>
                </div>
                
                <div className="space-y-2">
                  <DrawerClose asChild>
                    <Link to="/dashboard" className="block w-full">
                      <Button 
                        variant="ghost" 
                        className={`w-full justify-start ${currentPath === '/dashboard' ? 'bg-secondary' : ''}`}
                      >
                        Dashboard
                      </Button>
                    </Link>
                  </DrawerClose>
                  <DrawerClose asChild>
                    <Link to="/dashboard/devices" className="block w-full">
                      <Button 
                        variant="ghost" 
                        className={`w-full justify-start ${currentPath === '/dashboard/devices' ? 'bg-secondary' : ''}`}
                      >
                        Devices
                      </Button>
                    </Link>
                  </DrawerClose>
                  <DrawerClose asChild>
                    <Link to="/dashboard/threats" className="block w-full">
                      <Button 
                        variant="ghost" 
                        className={`w-full justify-start ${currentPath === '/dashboard/threats' ? 'bg-secondary' : ''}`}
                      >
                        Threats
                      </Button>
                    </Link>
                  </DrawerClose>
                  <DrawerClose asChild>
                    <Link to="/dashboard/statistics" className="block w-full">
                      <Button 
                        variant="ghost" 
                        className={`w-full justify-start ${currentPath === '/dashboard/statistics' ? 'bg-secondary' : ''}`}
                      >
                        Statistics
                      </Button>
                    </Link>
                  </DrawerClose>
                  <DrawerClose asChild>
                    <Link to="/dashboard/security" className="block w-full">
                      <Button 
                        variant="ghost" 
                        className={`w-full justify-start ${currentPath === '/dashboard/security' ? 'bg-secondary' : ''}`}
                      >
                        Security
                      </Button>
                    </Link>
                  </DrawerClose>
                  <DrawerClose asChild>
                    <Link to="/dashboard/network" className="block w-full">
                      <Button 
                        variant="ghost" 
                        className={`w-full justify-start ${currentPath === '/dashboard/network' ? 'bg-secondary' : ''}`}
                      >
                        Network
                      </Button>
                    </Link>
                  </DrawerClose>
                  <DrawerClose asChild>
                    <Link to="/dashboard/monitoring" className="block w-full">
                      <Button 
                        variant="ghost" 
                        className={`w-full justify-start ${currentPath === '/dashboard/monitoring' ? 'bg-secondary' : ''}`}
                      >
                        Monitoring
                      </Button>
                    </Link>
                  </DrawerClose>
                  <DrawerClose asChild>
                    <Link to="/dashboard/settings" className="block w-full">
                      <Button 
                        variant="ghost" 
                        className={`w-full justify-start ${currentPath === '/dashboard/settings' ? 'bg-secondary' : ''}`}
                      >
                        Settings
                      </Button>
                    </Link>
                  </DrawerClose>
                  <DrawerClose asChild>
                    <Link to="/dashboard/help" className="block w-full">
                      <Button 
                        variant="ghost" 
                        className={`w-full justify-start ${currentPath === '/dashboard/help' ? 'bg-secondary' : ''}`}
                      >
                        Help
                      </Button>
                    </Link>
                  </DrawerClose>
                </div>
                
                <div className="mt-6 pt-6 border-t border-border/30">
                  <DrawerClose asChild>
                    <Link to="/" className="block w-full">
                      <Button 
                        variant="outline" 
                        className="w-full flex items-center justify-center gap-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Main Site
                      </Button>
                    </Link>
                  </DrawerClose>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        ) : (
          <Button 
            variant="ghost" 
            size="icon"
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}

        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-security-DEFAULT" />
          <span className="font-bold text-lg hidden md:inline-block">Network Guardian</span>
        </div>

        <div className="hidden md:flex items-center space-x-1 ml-6">
          <Link to="/dashboard">
            <Button variant="ghost" className={`text-foreground/70 hover:text-foreground ${currentPath === '/dashboard' ? 'bg-secondary' : ''}`}>Dashboard</Button>
          </Link>
          <Link to="/dashboard/devices">
            <Button variant="ghost" className={`text-foreground/70 hover:text-foreground ${currentPath === '/dashboard/devices' ? 'bg-secondary' : ''}`}>Devices</Button>
          </Link>
          <Link to="/dashboard/threats">
            <Button variant="ghost" className={`text-foreground/70 hover:text-foreground ${currentPath === '/dashboard/threats' ? 'bg-secondary' : ''}`}>Threats</Button>
          </Link>
          <Link to="/dashboard/statistics">
            <Button variant="ghost" className={`text-foreground/70 hover:text-foreground ${currentPath === '/dashboard/statistics' ? 'bg-secondary' : ''}`}>Statistics</Button>
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


import React from 'react';
import { Shield, Settings, Bell, Menu, ExternalLink, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const isMobile = useIsMobile();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center bg-card/80 backdrop-blur-sm border-b border-border/50 px-4">
      <div className="flex items-center gap-2 md:gap-4 flex-1">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <div className="p-4 border-b border-border/50 flex items-center gap-2">
              <Shield className="h-6 w-6 text-security-DEFAULT" />
              <span className="font-bold text-lg">Network Guardian</span>
            </div>
            <div className="flex flex-col p-2">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-foreground/70 hover:text-foreground">
                  Home
                </Button>
              </Link>
              <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-foreground/70 hover:text-foreground">
                  About
                </Button>
              </Link>
              <Link to="/features" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-foreground/70 hover:text-foreground">
                  Features
                </Button>
              </Link>
              <Link to="/about-us" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-foreground/70 hover:text-foreground">
                  About Us
                </Button>
              </Link>
              <Link to="/contact-us" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-foreground/70 hover:text-foreground">
                  Contact Us
                </Button>
              </Link>
              <div className="border-t border-border/50 mt-2 pt-2">
                <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="default" className="w-full">
                    Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-security-DEFAULT" />
          <span className="font-bold text-lg hidden md:inline-block">Network Guardian</span>
        </div>

        <div className="hidden md:flex items-center space-x-1 ml-6">
          <Link to="/">
            <Button variant="ghost" className="text-foreground/70 hover:text-foreground">Home</Button>
          </Link>
          <Link to="/about">
            <Button variant="ghost" className="text-foreground/70 hover:text-foreground">About</Button>
          </Link>
          <Link to="/features">
            <Button variant="ghost" className="text-foreground/70 hover:text-foreground">Features</Button>
          </Link>
          <Link to="/about-us">
            <Button variant="ghost" className="text-foreground/70 hover:text-foreground">About Us</Button>
          </Link>
          <Link to="/contact-us">
            <Button variant="ghost" className="text-foreground/70 hover:text-foreground">Contact Us</Button>
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Link to="/dashboard" className="mr-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <ExternalLink className="h-4 w-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </Button>
        </Link>
        {currentPath?.startsWith('/dashboard') && (
          <>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-security-alert"></span>
            </Button>
            <Link to="/dashboard/settings">
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;

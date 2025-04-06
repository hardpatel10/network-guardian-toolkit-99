
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';

interface FrontLayoutProps {
  children: React.ReactNode;
}

const FrontLayout: React.FC<FrontLayoutProps> = ({ children }) => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-30 flex h-16 items-center bg-card/80 backdrop-blur-sm border-b border-border/50 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-security-DEFAULT" />
            <span className="font-bold text-lg">Network Guardian</span>
          </div>
          
          {/* Navigation links */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link to="/">
              <Button variant="ghost" className={location.pathname === '/' ? 'bg-secondary' : ''}>
                Home
              </Button>
            </Link>
            <Link to="/features">
              <Button variant="ghost" className={location.pathname === '/features' ? 'bg-secondary' : ''}>
                Features
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="ghost" className={location.pathname === '/about' ? 'bg-secondary' : ''}>
                About
              </Button>
            </Link>
            <Link to="/about-us">
              <Button variant="ghost" className={location.pathname === '/about-us' ? 'bg-secondary' : ''}>
                About Us
              </Button>
            </Link>
            <Link to="/contact-us">
              <Button variant="ghost" className={location.pathname === '/contact-us' ? 'bg-secondary' : ''}>
                Contact Us
              </Button>
            </Link>
          </nav>
          
          {/* Dashboard link */}
          <Link to="/dashboard">
            <Button>
              Dashboard
            </Button>
          </Link>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-card py-8 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Network Guardian</h3>
              <p className="text-muted-foreground">
                Secure your network with advanced monitoring and protection tools.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link></li>
                <li><Link to="/features" className="text-muted-foreground hover:text-foreground">Features</Link></li>
                <li><Link to="/about" className="text-muted-foreground hover:text-foreground">About</Link></li>
                <li><Link to="/dashboard" className="text-muted-foreground hover:text-foreground">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link to="/about-us" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
                <li><Link to="/contact-us" className="text-muted-foreground hover:text-foreground">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <address className="not-italic text-muted-foreground">
                <p>123 Security Street</p>
                <p>Network City, NC 12345</p>
                <p className="mt-2">Email: info@networkguardian.com</p>
                <p>Phone: (123) 456-7890</p>
              </address>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-border/30 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Network Guardian. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FrontLayout;

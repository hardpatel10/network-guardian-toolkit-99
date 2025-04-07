
import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Drawer, DrawerTrigger, DrawerContent } from '@/components/ui/drawer';
import { Menu } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        {isMobile ? (
          <>
            <Drawer open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <DrawerContent className="h-[90vh]">
                <div className="h-full overflow-y-auto">
                  <Sidebar onItemClick={() => setSidebarOpen(false)} />
                </div>
              </DrawerContent>
            </Drawer>
            <DrawerTrigger asChild>
              <button 
                className="fixed bottom-4 left-4 z-30 bg-primary text-primary-foreground rounded-full p-3 shadow-lg"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </button>
            </DrawerTrigger>
          </>
        ) : (
          <Sidebar />
        )}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

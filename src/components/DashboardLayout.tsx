import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center px-6 gap-4">
              <SidebarTrigger />
              <div className="flex-1" />
            </div>
          </header>
          <div className="flex-1 p-6 md:p-8 lg:p-10">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;

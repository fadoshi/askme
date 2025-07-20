import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboard-sidebar";
import { DashboardNavbar } from "@/modules/dashboard/ui/components/dashboardNavbar";

interface Props {
    children: React.ReactNode
};

const Layout = ({children}: Props) => {
    return (
        <SidebarProvider >
            <DashboardSidebar />
            <main className="f lex flex-col h-screen w-screen bg-muted">
                <DashboardNavbar />
                {children}
            </main>
            
        </SidebarProvider>
        
    );
};

export default Layout;
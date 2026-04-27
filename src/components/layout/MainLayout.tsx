import { useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { auth } from "@/services/firebase";
import { LayoutDashboard, Users, BarChart3, LogOut, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleLogout = () => auth.signOut().then(() => navigate("/login"));

  const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { label: "Patients", path: "/patients", icon: Users },
    { label: "Analytics", path: "/analytics", icon: BarChart3 },
  ];

  // Shared Sidebar Content
  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b">
        {/* Main Brand */}
        <div className="font-bold text-xl text-blue-600">Raga Health</div>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-2 p-2 rounded-md transition-colors",
              location.pathname === item.path
                ? "bg-blue-50 text-blue-700 font-medium"
                : "hover:bg-slate-100 text-slate-600",
            )}
          >
            <item.icon size={20} /> {item.label}
          </Link>
        ))}
      </nav>
      <div className="mt-auto px-6 py-4 border-t border-slate-100">
        <div className="mb-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
            Built by{" "}
            <a
              href="https://www.iamvishal.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 transition-colors"
            >
              Vishal.me
            </a>
          </p>
        </div>

        <Button
          variant="ghost"
          className="w-full justify-start gap-2 p-0 h-auto text-slate-500 hover:text-red-600 hover:bg-transparent"
          onClick={handleLogout}
        >
          <LogOut size={16} />
          <span className="text-sm font-medium">Logout</span>
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Desktop Sidebar (Hidden on Mobile) */}
      <aside className="hidden md:flex w-64 bg-white border-r flex-col">
        <SidebarContent />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header (Hidden on Desktop) */}
        <header className="md:hidden flex items-center justify-between p-4 bg-white border-b">
          <div className="font-bold text-blue-600">Raga Health</div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              <SidebarContent />
            </SheetContent>
          </Sheet>
        </header>

        {/* Content View */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

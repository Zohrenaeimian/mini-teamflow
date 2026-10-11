
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-bg text-text-primary">
      <div className="min-h-screen md:flex">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={closeSidebar}
        />

        <div className="min-w-0 flex-1">
          <Header onMenuClick={openSidebar} />

          <main className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default Layout;

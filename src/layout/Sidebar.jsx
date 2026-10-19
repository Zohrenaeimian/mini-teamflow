
import { NavLink } from "react-router-dom";
import { CheckCircle2, LayoutDashboard, ListTodo, X } from "lucide-react";

import sideImage from "../assets/images/sidebarImage.webp";

const navItems = [
  {
    title: "داشبورد",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "مدیریت وظایف",
    path: "/tasks",
    icon: ListTodo,
  },
];

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <button
          type="button"
          aria-label="بستن منو"
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        id="mobile-sidebar"
        aria-label="منوی اصلی"
        className={`fixed inset-y-0 right-0 z-50 isolate flex h-dvh w-[70vw] min-w-60 max-w-[320px] flex-col overflow-hidden bg-brand-dark px-4 py-5 text-white shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:sticky md:top-0 md:h-screen md:w-64 md:min-w-0 md:max-w-none md:shrink-0 md:translate-x-0 md:shadow-none`}
      >
        {/* Sidebar content */}
        <div className="relative z-10 flex min-h-0 flex-1 flex-col">
          {/* Brand */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 flex-1 items-center gap-2 p-2 md:p-0">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent text-brand-dark">
                <CheckCircle2 size={22} />
              </span>

              <span className="truncate text-sm font-bold sm:text-base">
                Mini TeamFlow
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="بستن سایدبار"
              className="flex size-9 shrink-0 items-center justify-center rounded-lg text-sidebar-text hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:hidden"
            >
              <X size={22} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="mt-6 flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex min-h-12 items-center gap-3 rounded-xl px-3 py-3 text-sm transition-colors sm:text-base ${
                      isActive
                        ? "bg-sidebar-active text-white"
                        : "text-sidebar-text hover:bg-white/10 hover:text-white"
                    }`
                  }
                >
                  <Icon size={20} className="shrink-0" />
                  <span className="whitespace-nowrap">{item.title}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Bottom text */}
          <div className="relative z-10 mt-auto pt-6 text-xs text-sidebar-text">
            <p>مدیریت وظایف تیمی</p>
          </div>
        </div>

        {/* Background image */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-full bg-cover bg-bottom bg-no-repeat"
          style={{
            backgroundImage: `url("${sideImage}")`,
          }}
        />
      </aside>
    </>
  );
}

export default Sidebar;

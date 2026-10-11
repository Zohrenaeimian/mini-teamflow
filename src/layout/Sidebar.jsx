
import { NavLink } from "react-router-dom";
import {
  CheckCircle2,
  LayoutDashboard,
  ListTodo,
  X,
} from "lucide-react";

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
      
      {isOpen && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
        />
      )}

      <aside
        id="mobile-sidebar"
        aria-label="منوی اصلی"
        className={`
          fixed inset-y-0 right-0 z-50
          flex h-dvh w-[70vw] max-w-[320px] min-w-60
          flex-col overflow-y-auto
          bg-brand-dark px-4 py-5 text-white shadow-2xl
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          md:sticky md:top-0 md:h-screen md:w-64
          md:min-w-0 md:max-w-none md:shrink-0
          md:translate-x-0 md:shadow-none
        `}
      >
        {/* لوگو و نام برنامه */}
        <div className="flex items-center justify-between gap-2">
          {/* موبایل: کلیک روی لوگو و نام، منو را می‌بندد */}
          <button
            type="button"
            onClick={onClose}
            aria-label="بستن منو"
            className="flex min-w-0 flex-1 items-center gap-2 rounded-lg p-2 text-right focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:pointer-events-none md:cursor-default md:rounded-none md:p-0 md:focus-visible:ring-0"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent text-brand-dark">
              <CheckCircle2 size={22} />
            </span>

            <span className="truncate text-sm font-bold sm:text-base">
              Mini-Teamflow
            </span>
          </button>

          {/* ضربدر فقط در موبایل */}
          <button
            type="button"
            onClick={onClose}
            aria-label="بستن سایدبار"
            className="flex size-9 shrink-0 items-center justify-center rounded-lg text-sidebar-text hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:hidden"
          >
            <X size={22} />
          </button>
        </div>

        {/* لینک‌های منو */}
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
                <span className="whitespace-nowrap">
                  {item.title}
                </span>
              </NavLink>
            );
          })}
        </nav>

        {/* متن پایین سایدبار */}
        <div className="mt-auto pt-8 text-xs text-sidebar-text">
          Mini-Teamflow
        </div>
      </aside>
    </>
  );
}

export default Sidebar;

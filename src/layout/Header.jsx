
import { ChevronLeft, LayoutDashboard, Menu } from "lucide-react";

function Header({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-bg/95 backdrop-blur">
      <div className="flex min-h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="باز کردن منو"
            aria-controls="mobile-sidebar"
            aria-expanded={undefined}
            className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface text-brand-dark hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:hidden"
          >
            <Menu size={22} />
          </button>

          <div className="flex min-w-0 items-center gap-2">
            <LayoutDashboard
              size={21}
              className="shrink-0 text-primary"
            />

            <div className="min-w-0">
              <h1 className="truncate text-base font-bold text-text-primary">
                داشبورد
              </h1>

              <p className="hidden text-xs text-text-muted sm:block">
                مدیریت وظایف تیم
              </p>
            </div>
          </div>
        </div>

        <ChevronLeft
          size={20}
          className="shrink-0 text-text-muted"
        />
      </div>
    </header>
  );
}

export default Header;

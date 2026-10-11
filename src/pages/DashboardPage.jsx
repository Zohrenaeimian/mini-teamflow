import {
  AlertCircle,
  BarChart3,
  CalendarClock,
  CheckCircle2,
  CircleDashed,
  Clock3,
  ClipboardList,
} from "lucide-react";

const statItems = [
  {
    label: "کل وظایف",
    Icon: ClipboardList,
    iconStyle: "bg-[#EDF1EB] text-[#173B35]",
    topBorder: "border-t-[#173B35]",
  },
  {
    label: "انجام‌شده",
    Icon: CheckCircle2,
    iconStyle: "bg-[#E4F5EC] text-[#167651]",
    topBorder: "border-t-[#1C956B]",
  },
  {
    label: "در حال انجام",
    Icon: Clock3,
    iconStyle: "bg-[#EAF1FF] text-[#285BA7]",
    topBorder: "border-t-[#3978D7]",
  },
  {
    label: "در انتظار شروع",
    Icon: CircleDashed,
    iconStyle: "bg-[#FFF3D9] text-[#946315]",
    topBorder: "border-t-[#D99A2B]",
  },
  {
    label: "عقب‌افتاده",
    Icon: AlertCircle,
    iconStyle: "bg-[#FCE9E8] text-[#B82F38]",
    topBorder: "border-t-[#D94F4F]",
  },
];

function DashboardPage() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="space-y-3"></div>

      <section className="flex flex-col gap-2">
        <p className="text-sm font-medium text-primary">نمای کلی</p>

        <h1 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">
          داشبورد
        </h1>

        <p className="max-w-2xl text-sm leading-7 text-text-muted sm:text-base">
          وضعیت وظایف تیم را در یک نگاه بررسی کن.
        </p>
      </section>

      <section aria-label="آمار وظایف">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-5">
          {statItems.map((item) => {
            const Icon = item.Icon;

            return (
              <article
                key={item.label}
                className={`min-w-0 rounded-2xl border border-border border-t-2 ${item.topBorder} bg-white p-4 shadow-sm shadow-brand-dark/3 sm:p-5`}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs leading-6 text-text-muted sm:text-sm">
                    {item.label}
                  </p>

                  <div
                    className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${item.iconStyle}`}
                  >
                    <Icon size={19} strokeWidth={1.8} />
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-right text-3xl font-bold tracking-tight text-text sm:text-4xl">
                    —
                  </p>

                  <div className="mt-3 h-1.5 w-12 rounded-full bg-surface-muted" />
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-5">
        <article className="min-w-0 rounded-2xl border border-border bg-white p-4 shadow-sm shadow-brand-dark/3 sm:p-6 lg:col-span-3">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#E4F0EB] text-primary">
              <BarChart3 size={21} />
            </div>

            <div>
              <h2 className="font-bold text-text">توزیع وظایف بر اساس وضعیت</h2>

              <p className="mt-1 text-xs text-text-muted">
                نمای کلی وضعیت وظایف تیم
              </p>
            </div>
          </div>

          <div className="mt-5 flex min-h-57.5 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-[#F9FAF7] px-4 py-8 text-center">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-[#E4F0EB] text-primary">
              <BarChart3 size={27} strokeWidth={1.6} />
            </div>

            <p className="mt-4 font-medium text-text">
              جایگاه نمودار وضعیت وظایف
            </p>

            <p className="mt-2 max-w-xs text-sm leading-6 text-text-muted">
              نمودار در مرحله‌ی بعد و پس از اتصال داده‌ها اضافه می‌شود.
            </p>
          </div>
        </article>

        {/* جایگاه وظایف نزدیک به موعد تحویل */}
        <article className="min-w-0 rounded-2xl border border-border bg-white p-4 shadow-sm shadow-brand-dark/3  sm:p-6 lg:col-span-2">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF3D9] text-status-todo-text">
              <CalendarClock size={21} />
            </div>

            <div>
              <h2 className="font-bold text-text">وظایف نزدیک به موعد تحویل</h2>

              <p className="mt-1 text-xs text-text-muted">
                کارهایی که باید پیگیری شوند
              </p>
            </div>
          </div>

          <div className="mt-5 flex min-h-57.5 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-[#F9FAF7] px-4 py-8 text-center">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-surface-muted text-primary">
              <ClipboardList size={27} strokeWidth={1.6} />
            </div>

            <p className="mt-4 font-medium text-text">جایگاه فهرست وظایف</p>

            <p className="mt-2 max-w-xs text-sm leading-6 text-text-muted">
              وظایف نزدیک به موعد تحویل در این بخش نمایش داده خواهند شد.
            </p>
          </div>
        </article>
      </section>
    </div>
  );
}

export default DashboardPage;

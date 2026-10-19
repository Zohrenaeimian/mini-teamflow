
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

import { TASK_STATUSES, STATUS_CHART_COLORS } from "../constants/taskConstants";

function TaskDistributionChart({ statistics }) {
  const chartData = TASK_STATUSES.map((status) => ({
    name: status.label,
    value: Math.max(
      0,
      statistics.distribution?.[status.value] ??
        statistics[status.value] ??
        0,
    ),
    fill: STATUS_CHART_COLORS[status.value],
  })).filter((item) => item.value > 0);

  const hasData = chartData.length > 0;

  return (
    <div className="mt-4 min-w-0">
      {!hasData ? (
        <div className="flex min-h-44 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface-muted/40 px-4 py-6 text-center">
          <div className="mb-3 flex size-11 items-center justify-center rounded-full bg-surface-muted text-text-muted">
            <span className="text-xl">◌</span>
          </div>

          <p className="text-sm font-semibold text-text">
            هنوز وظیفه‌ای ثبت نشده است
          </p>

          <p className="mt-1 text-xs leading-6 text-text-muted">
            بعد از ایجاد وظایف، نمودار وضعیت‌ها اینجا نمایش داده می‌شود.
          </p>
        </div>
      ) : (
        <div className="flex min-w-0 flex-col items-center gap-4 rounded-2xl border border-border/70 bg-surface p-3 sm:p-4 md:flex-row md:gap-5">
          {/* نمودار دوناتی */}
          <div className="relative h-48 w-full max-w-56 shrink-0 sm:h-52 sm:max-w-60 md:w-1/2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius="62%"
                  outerRadius="82%"
                  paddingAngle={chartData.length > 1 ? 4 : 0}
                  stroke="none"
                  cornerRadius={4}
                  isAnimationActive={false}
                />

                <Tooltip
                  formatter={(value, name) => [`${value} وظیفه`, name]}
                  wrapperStyle={{
                    zIndex: 20,
                    pointerEvents: "none",
                  }}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #DFE5DD",
                    fontFamily: "Vazirmatn, sans-serif",
                    fontSize: "12px",
                    direction: "rtl",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* عدد وسط نمودار */}
            <div className="pointer-events-none absolute inset-0 z-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold tabular-nums text-text">
                {statistics.total ?? 0}
              </span>

              <span className="mt-1 text-xs text-text-muted">
                کل وظایف
              </span>
            </div>
          </div>

          {/* راهنمای وضعیت‌ها */}
          <ul className="grid w-full min-w-0 grid-cols-1 gap-4 md:flex-1 lg:grid-cols-2">
            {TASK_STATUSES.map((status) => {
              const value = Math.max(
                0,
                statistics.distribution?.[status.value] ??
                  statistics[status.value] ??
                  0,
              );

              return (
                <li
                  key={status.value}
                  className="flex min-w-0 items-center justify-between gap-2 rounded-lg bg-surface-muted/50 px-2.5 py-2 transition-colors hover:bg-surface-muted sm:px-3 sm:py-2.5"
                >
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span
                      className="size-2.5 shrink-0 rounded-full"
                      style={{
                        backgroundColor: STATUS_CHART_COLORS[status.value],
                      }}
                    />

                    <span className="truncate text-xs font-medium text-text sm:text-sm">
                      {status.label}
                    </span>
                  </div>

                  <span className="shrink-0 text-sm font-bold tabular-nums text-text">
                    {value}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default TaskDistributionChart;

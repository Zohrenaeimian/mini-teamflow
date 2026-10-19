import { BarChart3 } from "lucide-react";

import { isOverdue } from "../utils/taskHelpers";

import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { TASK_STATUSES, STATUS_CHART_COLORS } from "../constants/taskConstants";

const WEEK_DAYS = [
  "شنبه",
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنجشنبه",
  "جمعه",
];

function getCurrentWeekDates() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // پیدا کردن شنبه هفته جاری
  const daysSinceSaturday = (today.getDay() + 1) % 7;

  const saturday = new Date(today);
  saturday.setDate(today.getDate() - daysSinceSaturday);

  return WEEK_DAYS.map((name, index) => {
    const date = new Date(saturday);
    date.setDate(saturday.getDate() + index);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return {
      name,
      dateKey: `${year}-${month}-${day}`,
    };
  });
}

function WeeklyTasksChart({ tasks = [] }) {
  const weekDates = getCurrentWeekDates();

  const chartData = weekDates.map((day) => {
    const dayTasks = tasks.filter((task) => task.dueDate === day.dateKey);

    const statusCounts = Object.fromEntries(
      TASK_STATUSES.map((status) => [
        status.value,
        dayTasks.filter((task) => {
          const taskStatus = isOverdue(task) ? "overdue" : task.status;

          return taskStatus === status.value;
        }).length,
      ]),
    );

    return {
      name: day.name,
      ...statusCounts,
    };
  });

  const hasData = chartData.some((day) =>
    TASK_STATUSES.some((status) => day[status.value] > 0),
  );

  return (
    <article className="min-w-0 rounded-2xl border border-border bg-surface p-3 shadow-sm shadow-brand-dark/3 sm:p-4">
      <div className="flex items-center gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#E4F0EB] text-primary">
          <BarChart3 size={19} />
        </div>

        <div className="min-w-0">
          <h2 className="text-sm font-bold text-text sm:text-base">
            گزارش هفتگی وظایف
          </h2>

          <p className="mt-1 text-xs leading-5 text-text-muted">
            وضعیت وظایف بر اساس روز سررسید در هفته جاری
          </p>
        </div>
      </div>

      {!hasData ? (
        <div className="mt-3 flex min-h-36 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface-muted/40 px-4 py-5 text-center">
          <BarChart3 size={25} strokeWidth={1.6} className="text-text-muted" />

          <p className="mt-2 text-sm font-medium text-text">
            وظیفه‌ای برای نمایش در این هفته وجود ندارد
          </p>

          <p className="mt-1 text-xs leading-5 text-text-muted">
            وظایف دارای سررسید در هفته جاری در این نمودار نمایش داده می‌شوند.
          </p>
        </div>
      ) : (
        <div className="mt-3 h-52 min-w-0 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 8, right: 0, left: -20, bottom: 0 }}
              barGap={2}
              barCategoryGap="12%"
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#DFE5DD"
              />

              <XAxis
                dataKey="name"
                tick={{ fontSize: 10, fill: "#778078" }}
                axisLine={false}
                tickLine={false}
                interval={0}
                tickMargin={8}
              />

              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 10, fill: "#778078" }}
                axisLine={false}
                tickLine={false}
                width={28}
              />

              <Tooltip
                formatter={(value, name) => [`${value} وظیفه`, name]}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #DFE5DD",
                  fontFamily: "Vazirmatn, sans-serif",
                  fontSize: "12px",
                  direction: "rtl",
                }}
              />

              <Legend
                verticalAlign="bottom"
                align="center"
                iconType="circle"
                iconSize={7}
                wrapperStyle={{
                  fontSize: "10px",
                  paddingTop: "8px",
                  fontFamily: "Vazirmatn, sans-serif",
                }}
              />

              {TASK_STATUSES.map((status) => (
                <Bar
                  key={status.value}
                  dataKey={status.value}
                  name={status.label}
                  fill={STATUS_CHART_COLORS[status.value]}
                  radius={[3, 3, 0, 0]}
                  maxBarSize={18}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </article>
  );
}

export default WeeklyTasksChart;

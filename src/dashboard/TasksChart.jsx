import { BarChart3 } from "lucide-react";
import TaskDistributionChart from "./TaskDistributionChart";
import WeeklyTasksChart from "./WeeklyTasksChart";

function TasksChart({ statistics, tasks }) {
  return (
    <div className="grid min-w-0 grid-cols-1 items-start gap-4">
      {/* نمودار دوناتی */}
      <article className="min-w-0 rounded-2xl border border-border bg-surface p-4 shadow-sm shadow-brand-dark/3 sm:p-6">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#E4F0EB] text-primary">
            <BarChart3 size={21} />
          </div>

          <div className="min-w-0">
            <h2 className="font-bold text-text">
              توزیع وظایف بر اساس وضعیت
            </h2>

            <p className="mt-1 text-xs leading-5 text-text-muted">
              نمای کلی وضعیت وظایف تیم
            </p>
          </div>
        </div>

        <TaskDistributionChart statistics={statistics} />
      </article>

      {/* نمودار میله‌ای */}
      <WeeklyTasksChart tasks={tasks} />
    </div>
  );
}

export default TasksChart;
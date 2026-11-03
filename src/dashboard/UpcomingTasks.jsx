import {
  CalendarClock,
  ClipboardList,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  getDaysRemaining,
  formatJalaliDate,
} from "../utils/dateHelpers";

import {
  STATUS_LABELS,
  STATUS_SOFT_STYLES,
  PRIORITY_DOT_COLORS,
} from "../constants/taskConstants";

function UpcomingTasks({ tasks = [] }) {
  const navigate = useNavigate();

  function handleViewAll() {
    navigate("/tasks");
  }

  return (
    <article className="flex h-full min-w-0 flex-col rounded-2xl border border-border bg-surface p-3 shadow-sm shadow-brand-dark/3 sm:p-4">
      {/* عنوان و دکمه مشاهده همه */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#FFF3D9] text-status-todo-text">
            <CalendarClock size={19} />
          </div>

          <div className="min-w-0">
            <h2 className="text-sm font-bold text-text sm:text-base">
              وظایف نزدیک به موعد تحویل
            </h2>

            <p className="mt-1 text-xs leading-5 text-text-muted">
              موعد تحویل در ۴ روز آینده
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleViewAll}
          className="flex shrink-0 items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-[#E4F0EB]"
        >
          مشاهده همه
          <ArrowLeft size={14} />
        </button>
      </div>

      {/* فهرست وظایف */}
      {tasks.length === 0 ? (
        <div className="mt-3 flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-[#F9FAF7] px-3 py-5 text-center">
          <div className="flex size-11 items-center justify-center rounded-xl bg-surface-muted text-primary">
            <ClipboardList size={23} strokeWidth={1.6} />
          </div>

          <p className="mt-3 text-sm font-medium text-text">
            وظیفه‌ای نزدیک به موعد وجود ندارد
          </p>

          <p className="mt-1 text-xs leading-5 text-text-muted">
            وظایف ناتمام با موعد تحویل نزدیک اینجا نمایش داده می‌شوند.
          </p>
        </div>
      ) : (
        <ul className="mt-3 flex flex-col gap-2">
          {tasks.map((task) => {
            const daysRemaining = getDaysRemaining(task.dueDate);

            return (
              <li
                key={task.id}
                className="flex min-w-0 items-center justify-between gap-2 rounded-lg border border-border bg-[#F9FAF7] px-3 py-3"
              >
                {/* عنوان، اولویت و وضعیت */}
                <div className="min-w-0 flex-1">
                  <div className="flex min-w-0 items-center gap-2">
                    <span
                      className={`size-2.5 shrink-0 rounded-full ${
                        PRIORITY_DOT_COLORS[task.priority] ?? "bg-gray-400"
                      }`}
                      title={`اولویت: ${task.priority}`}
                    />

                    <p
                      className="min-w-0 truncate text-sm font-semibold text-text"
                      title={task.title}
                    >
                      {task.title}
                    </p>
                  </div>

                  <div className="mt-2">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                        STATUS_SOFT_STYLES[task.status] ??
                        "bg-surface-muted text-text-muted"
                      }`}
                    >
                      {STATUS_LABELS[task.status] ?? "نامشخص"}
                    </span>
                  </div>
                </div>

                {/* زمان باقی‌مانده و تاریخ شمسی */}
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <span className="text-xs font-bold text-status-overdue sm:text-sm">
                    {daysRemaining === null
                      ? "تاریخ نامعتبر"
                      : daysRemaining < 0
                        ? `${Math.abs(daysRemaining).toLocaleString("fa-IR")} روز از موعد گذشته`
                        : daysRemaining === 0
                          ? "موعد امروز"
                          : `${daysRemaining.toLocaleString("fa-IR")} روز مانده`}
                  </span>

                  {daysRemaining !== null && (
                    <span className="text-xs text-text-muted">
                      {formatJalaliDate(task.dueDate)}
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </article>
  );
}

export default UpcomingTasks;

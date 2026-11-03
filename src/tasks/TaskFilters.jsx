import { Search, ChevronDown, RotateCcw, FunnelPlus } from "lucide-react";
import AssigneeDropdown from "./AssigneeDropdown";

import { TASK_STATUSES, TASK_PRIORITIES } from "../constants/taskConstants";

function TaskFilters({ filters, setFilters, tasks, sortOrder, onSortChange }) {
  const inputClass =
    "w-full rounded-xl border border-border bg-surface px-3 py-3 text-sm text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10";

  const selectClass = `${inputClass} appearance-none cursor-pointer pl-9`;

  function handleFilterChange(name, value) {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value === "all" ? "" : value,
    }));
  }

  function clearFilters() {
    setFilters({
      search: "",
      status: "",
      priority: "",
      assignee: "",
    });

    onSortChange("all");
  }

  return (
    <section className="rounded-2xl border border-border bg-surface p-4 sm:p-5">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-muted text-primary">
            <FunnelPlus size={20} />
          </div>

          <div className="min-w-0">
            <h2 className="text-base font-bold text-text">جست‌وجو و فیلترها</h2>

            <p className="mt-1 text-xs text-text-muted">
              وظایف موردنظرت را پیدا کن.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={clearFilters}
          className="inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-text-muted transition hover:bg-surface-muted hover:text-primary"
        >
          <RotateCcw size={15} />
          پاک کردن فیلترها
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {/* جست‌وجوی وظیفه */}
        <div className="min-w-0">
          <label
            htmlFor="task-search"
            className="mb-2 block text-sm font-medium text-text"
          >
            جست‌وجوی وظیفه
          </label>

          <div className="relative">
            <Search
              size={18}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted"
            />

            <input
              id="task-search"
              type="search"
              placeholder="عنوان وظیفه..."
              className={`${inputClass} pr-10`}
              value={filters.search}
              onChange={(event) =>
                handleFilterChange("search", event.target.value)
              }
            />
          </div>
        </div>

        {/* فیلتر وضعیت */}
        <div className="min-w-0">
          <label
            htmlFor="task-status"
            className="mb-2 block text-sm font-medium text-text"
          >
            وضعیت
          </label>

          <div className="relative">
            <select
              id="task-status"
              value={filters.status || "all"}
              onChange={(event) =>
                handleFilterChange("status", event.target.value)
              }
              className={selectClass}
            >
              <option value="all">همه وضعیت‌ها</option>

              {TASK_STATUSES.filter((status) => status.value !== "overdue").map(
                (status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ),
              )}
            </select>

            <ChevronDown
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
            />
          </div>
        </div>

        {/* فیلتر اولویت */}
        <div className="min-w-0">
          <label
            htmlFor="task-priority"
            className="mb-2 block text-sm font-medium text-text"
          >
            اولویت
          </label>

          <div className="relative">
            <select
              id="task-priority"
              value={filters.priority || "all"}
              onChange={(event) =>
                handleFilterChange("priority", event.target.value)
              }
              className={selectClass}
            >
              <option value="all">همه اولویت‌ها</option>

              {TASK_PRIORITIES.map((priority) => (
                <option key={priority.value} value={priority.value}>
                  {priority.label}
                </option>
              ))}
            </select>

            <ChevronDown
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
            />
          </div>
        </div>

        {/* فیلتر عضو مسئول */}
        <div className="min-w-0">
          <label
            htmlFor="task-assignee"
            className="mb-2 block text-sm font-medium text-text"
          >
            عضو مسئول
          </label>

          <AssigneeDropdown
            tasks={tasks}
            value={filters.assignee}
            onChange={(value) => handleFilterChange("assignee", value)}
          />
        </div>

        {/* مرتب‌سازی موعد */}
        <div className="min-w-0">
          <label
            htmlFor="task-sort"
            className="mb-2 block text-sm font-medium text-text"
          >
            مرتب‌سازی موعد
          </label>

          <div className="relative">
            <select
              id="task-sort"
              value={sortOrder}
              onChange={(event) => onSortChange(event.target.value)}
              className={selectClass}
            >
              <option value="all">همه وظایف</option>
              <option value="asc">نزدیک‌ترین موعد</option>
              <option value="desc">دورترین موعد</option>
              <option value="overdue">موعد گذشته</option>
            </select>

            <ChevronDown
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default TaskFilters;

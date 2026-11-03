import { ChevronLeft, ChevronRight, ListTodo } from "lucide-react";
import TaskItem from "./TaskItem";
import { hasActiveFilters } from "../utils/taskHelpers";

const columns = [
  { title: "عنوان وظیفه", align: "text-right" },
  { title: "پروژه", align: "text-right" },
  { title: "عضو مسئول", align: "text-right" },
  { title: "وضعیت", align: "text-center" },
  { title: "اولویت", align: "text-center" },
  { title: "موعد تحویل", align: "text-center" },
  { title: "توضیحات", align: "text-right" },
  { title: "عملیات", align: "text-center" },
];

function TaskList({
  tasks = [],
  totalCount = 0,
  pageSize = 8,
  filters = {},
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  onEdit,
  onDelete,
  onStatusChange,
}) {
  const showPagination = totalCount > pageSize;
  const hasFilters = hasActiveFilters(filters);

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-4 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-muted text-primary">
            <ListTodo size={20} />
          </div>

          <div className="min-w-0">
            <h2 className="text-base font-bold text-text">فهرست وظایف</h2>

            <p className="mt-1 text-xs text-text-muted">
              مشاهده جزئیات وظایف تیم
            </p>
          </div>
        </div>

        <span className="rounded-lg bg-surface-muted px-3 py-1.5 text-xs font-medium text-text-muted">
          {totalCount} وظیفه
        </span>
      </div>

      {tasks.length > 0 ? (
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-270 table-fixed border-collapse text-right">
            <colgroup>
              <col className="w-[16%]" />
              <col className="w-[13%]" />
              <col className="w-[13%]" />
              <col className="w-[12%]" />
              <col className="w-[9%]" />
              <col className="w-[11%]" />
              <col className="w-[14%]" />
              <col className="w-[12%]" />
            </colgroup>

            <thead className="bg-surface-muted">
              <tr className="border-b border-border">
                {columns.map((column) => (
                  <th
                    key={column.title}
                    className={`px-3 py-3.5 text-xs font-bold whitespace-nowrap text-text ${column.align}`}
                  >
                    {column.title}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onStatusChange={onStatusChange}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="px-4 py-12 text-center">
          <ListTodo size={32} className="mx-auto text-text-muted" />

          <p className="mt-3 text-sm font-medium text-text">
            {hasFilters
              ? "وظیفه‌ای مطابق فیلترهای انتخاب‌شده پیدا نشد."
              : "هنوز وظیفه‌ای ثبت نشده است."}
          </p>

          <p className="mt-1 text-xs text-text-muted">
            {hasFilters
              ? "فیلترها را تغییر بده یا پاک کن و دوباره تلاش کن."
              : "برای شروع، یک وظیفه جدید ایجاد کن."}
          </p>
        </div>
      )}

      {showPagination && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-4 py-3 sm:px-5">
          <p className="text-xs text-text-muted">
            صفحه {currentPage} از {totalPages}
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onPageChange?.(currentPage - 1)}
              disabled={currentPage <= 1}
              aria-label="صفحه قبلی"
              className="flex size-9 items-center justify-center rounded-lg border border-border text-text transition hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight size={16} />
            </button>

            <span className="min-w-8 text-center text-sm font-medium text-text">
              {currentPage}
            </span>

            <button
              type="button"
              onClick={() => onPageChange?.(currentPage + 1)}
              disabled={currentPage >= totalPages}
              aria-label="صفحه بعدی"
              className="flex size-9 items-center justify-center rounded-lg border border-border text-text transition hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={16} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default TaskList;

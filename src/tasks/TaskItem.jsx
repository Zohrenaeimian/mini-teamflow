import { useState } from "react";
import { SquarePen, Trash2, ChevronDown, Check } from "lucide-react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useDismiss,
  useInteractions,
  useRole,
  FloatingPortal,
} from "@floating-ui/react";

import { formatJalaliDate } from "../utils/dateHelpers";

import {
  TASK_STATUSES,
  STATUS_LABELS,
  STATUS_STYLES,
  PRIORITY_LABELS,
  PRIORITY_STYLES,
  UNKNOWN_MEMBER,
  UNKNOWN_PROJECT,
} from "../constants/taskConstants";

const statusOptions = TASK_STATUSES.filter(
  (option) => option.value !== "overdue",
);

const actionBase =
  "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2";

function StatusBadge({ task, onStatusChange }) {
  const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isStatusMenuOpen,
    onOpenChange: setIsStatusMenuOpen,
    placement: "bottom",
    strategy: "fixed",
    middleware: [offset(8), flip({ padding: 8 }), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "menu" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    dismiss,
    role,
  ]);

  function handleStatusChange(newStatus) {
    setIsStatusMenuOpen(false);

    if (newStatus === task.status) return;

    onStatusChange?.(task.id, newStatus);
  }

  return (
    <>
      <button
        ref={refs.setReference}
        {...getReferenceProps({
          onClick: () => setIsStatusMenuOpen((prev) => !prev),
        })}
        type="button"
        title="تغییر وضعیت وظیفه"
        aria-label={`تغییر وضعیت ${task.title}`}
        aria-expanded={isStatusMenuOpen}
        aria-haspopup="menu"
        className={`inline-flex h-8 w-33 shrink-0 items-center justify-center gap-1 rounded-full px-2 text-[13px] font-medium whitespace-nowrap transition-colors ${
          STATUS_STYLES[task.status] ??
          "bg-surface-muted text-text-muted"
        }`}
      >
        <span className="truncate">
          {STATUS_LABELS[task.status] ?? "نامشخص"}
        </span>

        <ChevronDown
          size={13}
          className={`shrink-0 transition-transform ${
            isStatusMenuOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isStatusMenuOpen && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps({
              "aria-label": "انتخاب وضعیت وظیفه",
            })}
            className="z-50 w-40 rounded-xl border border-border bg-surface p-1.5 text-right shadow-lg"
          >
            {statusOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                role="menuitem"
                onClick={() => handleStatusChange(option.value)}
                className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-xs transition-colors hover:bg-surface-muted ${
                  task.status === option.value
                    ? "font-semibold text-text"
                    : "text-text-muted"
                }`}
              >
                <span>{option.label}</span>

                {task.status === option.value && (
                  <Check size={14} className="shrink-0 text-primary" />
                )}
              </button>
            ))}
          </div>
        </FloatingPortal>
      )}
    </>
  );
}

function TaskItem({ task, onEdit, onDelete, onStatusChange }) {
  return (
    <tr className="border-b border-border last:border-0 hover:bg-surface-muted/40">
      <td className="px-3 py-3 align-middle">
        <p
          className="truncate text-sm font-semibold text-text"
          title={task.title}
        >
          {task.title}
        </p>
      </td>

      <td className="px-3 py-3 align-middle">
        <p
          className="truncate text-sm text-text-muted"
          title={task.projectName || UNKNOWN_PROJECT}
        >
          {task.projectName || UNKNOWN_PROJECT}
        </p>
      </td>

      <td className="px-3 py-3 align-middle">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
            {task.assigneeName?.charAt(0) || "؟"}
          </span>

          <span
            className="truncate text-sm text-text"
            title={task.assigneeName || UNKNOWN_MEMBER}
          >
            {task.assigneeName || UNKNOWN_MEMBER}
          </span>
        </div>
      </td>

      <td className="px-2 py-3 text-center align-middle">
        <StatusBadge task={task} onStatusChange={onStatusChange} />
      </td>

      <td className="px-2 py-3 text-center align-middle">
        <span
          className={`inline-flex h-8 w-18 shrink-0 items-center justify-center rounded-full px-2 text-xs font-medium whitespace-nowrap ${
            PRIORITY_STYLES[task.priority] ??
            "bg-surface-muted text-text-muted"
          }`}
        >
          {PRIORITY_LABELS[task.priority] ?? "نامشخص"}
        </span>
      </td>

      <td className="px-3 py-3 text-center align-middle">
        <p className="text-xs whitespace-nowrap text-text-muted">
          {formatJalaliDate(task.dueDate)}
        </p>
      </td>

      <td className="px-3 py-3 align-middle">
        <p
          title={task.description || "توضیحاتی ثبت نشده است."}
          className="truncate text-xs text-text-muted"
        >
          {task.description || "توضیحاتی ثبت نشده است."}
        </p>
      </td>

      <td className="px-2 py-3 text-center align-middle">
        <div className="flex items-center justify-center gap-1">
          <button
            type="button"
            onClick={() => onEdit?.(task)}
            title="ویرایش وظیفه"
            aria-label={`ویرایش ${task.title}`}
            className={`${actionBase} border-status-done/50 bg-status-done/30 text-status-done-text hover:bg-status-done/20 focus-visible:outline-status-done`}
          >
            <SquarePen size={16} />
          </button>

          <button
            type="button"
            onClick={() => onDelete?.(task)}
            title="حذف وظیفه"
            aria-label={`حذف ${task.title}`}
            className={`${actionBase} border-status-overdue/20 bg-status-overdue/10 text-status-overdue hover:bg-status-overdue/20 focus-visible:outline-status-overdue`}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default TaskItem;

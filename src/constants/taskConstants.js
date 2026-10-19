export const TASK_STATUSES = [
  { value: "todo", label: "در انتظار شروع" },
  { value: "in_progress", label: "در حال انجام" },
  { value: "done", label: "انجام‌شده" },
  { value: "overdue", label: "عقب‌افتاده" },
];

export const TASK_PRIORITIES = [
  { value: "low", label: "کم" },
  { value: "medium", label: "متوسط" },
  { value: "high", label: "زیاد" },
];

export const STATUS_VALUES = TASK_STATUSES.filter(
  (item) => item.value !== "overdue",
).map((item) => item.value);

export const PRIORITY_VALUES = TASK_PRIORITIES.map((item) => item.value);

export const STATUS_LABELS = Object.fromEntries(
  TASK_STATUSES.map((item) => [item.value, item.label]),
);

export const PRIORITY_LABELS = Object.fromEntries(
  TASK_PRIORITIES.map((item) => [item.value, item.label]),
);

export const STATUS_STYLES = {
  todo: "bg-status-todo text-status-todo-text",
  in_progress: "bg-status-progress text-status-progress-text",
  done: "bg-status-done text-status-done-text",
};

export const PRIORITY_STYLES = {
  low: "bg-priority-low-bg text-priority-low",
  medium: "bg-priority-medium-bg text-priority-medium",
  high: "bg-priority-high-bg text-priority-high",
};

export const UNKNOWN_MEMBER = "عضو نامشخص";
export const UNKNOWN_PROJECT = "پروژه نامشخص";

export const STATUS_CHART_COLORS = {
  todo: "#D99A2B",
  in_progress: "#3978D7",
  done: "#1C956B",
  overdue: "#D94F4F",
};

export const STATUS_SOFT_STYLES = {
  todo: "bg-status-todo/50 text-status-todo-text",
  in_progress: "bg-status-progress/50 text-status-progress-text",
  done: "bg-status-done/50 text-status-done-text",
};

export const PRIORITY_DOT_COLORS = {
  high: "bg-[#D94F4F]",
  medium: "bg-[#D99A2B]",
  low: "bg-[#1C956B]",
};

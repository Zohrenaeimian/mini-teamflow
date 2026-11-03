import { PRIORITY_VALUES, STATUS_VALUES } from "../constants/taskConstants";
import {
  isValidDate,
  getTodayString,
  addDaysToDateString,
} from "./dateHelpers";

export function isOverdue(task) {
  if (!task || !isValidDate(task.dueDate)) {
    return false;
  }

  if (task.status === "done") {
    return false;
  }

  const today = getTodayString();

  return task.dueDate < today;
}

export function normalizeTask(task) {
  if (!task || typeof task !== "object" || Array.isArray(task)) {
    return null;
  }

  const id = typeof task.id === "string" ? task.id.trim() : "";
  const title = typeof task.title === "string" ? task.title.trim() : "";

  if (!id || !title) {
    return null;
  }

  const status = STATUS_VALUES.includes(task.status) ? task.status : "todo";

  const priority = PRIORITY_VALUES.includes(task.priority)
    ? task.priority
    : "medium";

  const dueDate =
    typeof task.dueDate === "string" ? task.dueDate.slice(0, 10) : "";

  return {
    id,
    title,
    description:
      typeof task.description === "string" ? task.description.trim() : "",
    status,
    priority,
    assigneeName:
      typeof task.assigneeName === "string" ? task.assigneeName.trim() : "",
    projectName:
      typeof task.projectName === "string" ? task.projectName.trim() : "",
    dueDate: isValidDate(dueDate) ? dueDate : "",
    createdAt:
      typeof task.createdAt === "string"
        ? task.createdAt
        : new Date().toISOString(),
  };
}

export function filterTasks(tasks, filters = {}) {
  const {
    search = "",
    status = "",
    priority = "",
    assignee = "",
    dueDateStatus = "",
  } = filters;

  const searchText = search.trim().toLowerCase();

  return tasks.filter((task) => {
    const title = typeof task.title === "string" ? task.title : "";

    const matchesSearch = title.toLowerCase().includes(searchText);
    const matchesStatus = !status || task.status === status;
    const matchesPriority = !priority || task.priority === priority;
    const matchesAssignee = !assignee || task.assigneeName === assignee;

    const matchesDueDateStatus =
      !dueDateStatus || (dueDateStatus === "overdue" && isOverdue(task));

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority &&
      matchesAssignee &&
      matchesDueDateStatus
    );
  });
}

export function sortTasksByDueDate(tasks, order = "asc") {
  const today = getTodayString();

  if (order === "all") {
    return [...tasks];
  }
  // نمایش فقط وظایف عقب‌افتاده
  if (order === "overdue") {
    return tasks
      .filter((task) => isOverdue(task))
      .sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  }

  // در مرتب‌سازی عادی، موعدهای گذشته نمایش داده نمی‌شوند
  const upcomingTasks = tasks.filter(
    (task) =>
      !isOverdue(task) && (!isValidDate(task.dueDate) || task.dueDate >= today),
  );

  return [...upcomingTasks].sort((a, b) => {
    const aIsValid = isValidDate(a.dueDate);
    const bIsValid = isValidDate(b.dueDate);

    if (!aIsValid && !bIsValid) return 0;
    if (!aIsValid) return 1;
    if (!bIsValid) return -1;

    if (order === "desc") {
      return b.dueDate.localeCompare(a.dueDate);
    }

    return a.dueDate.localeCompare(b.dueDate);
  });
}

export function getTaskStatistics(tasks = []) {
  const list = Array.isArray(tasks) ? tasks : [];

  const statistics = {
    total: list.length,
    todo: 0,
    in_progress: 0,
    done: 0,
    overdue: 0,
  };

  list.forEach((task) => {
    if (isOverdue(task)) {
      statistics.overdue += 1;
      return;
    }

    if (task.status === "done") {
      statistics.done += 1;
    } else if (task.status === "in_progress") {
      statistics.in_progress += 1;
    } else if (task.status === "todo") {
      statistics.todo += 1;
    }
  });

  return {
    ...statistics,
    distribution: {
      todo: statistics.todo,
      in_progress: statistics.in_progress,
      done: statistics.done,
      overdue: statistics.overdue,
    },
  };
}

export function getUpcomingTasks(tasks = [], limit = 5) {
  const list = Array.isArray(tasks) ? tasks : [];

  const today = getTodayString();
  const lastDate = addDaysToDateString(today, 4);

  const upcoming = list.filter(
    (task) =>
      task.status !== "done" &&
      isValidDate(task.dueDate) &&
      task.dueDate >= today &&
      task.dueDate <= lastDate,
  );

  return sortTasksByDueDate(upcoming, "asc").slice(0, limit);
}

export function hasActiveFilters(filters = {}) {
  return Boolean(
    filters.search?.trim() ||
    filters.status ||
    filters.priority ||
    filters.assignee ||
    filters.dueDateStatus,
  );
}

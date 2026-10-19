import { PRIORITY_VALUES, STATUS_VALUES } from "../constants/taskConstants";

export function isValidDate(dateString) {
  if (typeof dateString !== "string") {
    return false;
  }

  const datePattern = /^\d{4}-\d{2}-\d{2}$/;

  if (!datePattern.test(dateString)) {
    return false;
  }

  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

export function isOverdue(task) {
  if (!task || !isValidDate(task.dueDate)) {
    return false;
  }

  if (task.status === "done") {
    return false;
  }

  const now = new Date();
  const today = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("-");

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
  const { search = "", status = "", priority = "", assignee = "" } = filters;

  const searchText = search.trim().toLowerCase();

  return tasks.filter((task) => {
    const title = typeof task.title === "string" ? task.title : "";
    const matchesSearch = title.toLowerCase().includes(searchText);
    const matchesStatus = !status || task.status === status;
    const matchesPriority = !priority || task.priority === priority;
    const matchesAssignee = !assignee || task.assigneeName === assignee;

    return matchesSearch && matchesStatus && matchesPriority && matchesAssignee;
  });
}

export function sortTasksByDueDate(tasks, order = "asc") {
  return [...tasks].sort((a, b) => {
    const aIsValid = isValidDate(a.dueDate);
    const bIsValid = isValidDate(b.dueDate);

    if (!aIsValid && !bIsValid) return 0;
    if (!aIsValid) return 1;
    if (!bIsValid) return -1;

    const aTime = new Date(
      Number(a.dueDate.slice(0, 4)),
      Number(a.dueDate.slice(5, 7)) - 1,
      Number(a.dueDate.slice(8, 10)),
    ).getTime();

    const bTime = new Date(
      Number(b.dueDate.slice(0, 4)),
      Number(b.dueDate.slice(5, 7)) - 1,
      Number(b.dueDate.slice(8, 10)),
    ).getTime();

    if (order === "desc") {
      return bTime - aTime;
    }

    return aTime - bTime;
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

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const lastDate = new Date(today);
  lastDate.setDate(lastDate.getDate() + 4);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const todayString = formatDate(today);
  const lastDateString = formatDate(lastDate);

  const upcoming = list.filter(
    (task) =>
      task.status !== "done" &&
      isValidDate(task.dueDate) &&
      task.dueDate >= todayString &&
      task.dueDate <= lastDateString,
  );

  return sortTasksByDueDate(upcoming, "asc").slice(0, limit);
}

export function hasActiveFilters(filters = {}) {
  return Boolean(
    filters.search?.trim() ||
    filters.status ||
    filters.priority ||
    filters.assignee,
  );
}

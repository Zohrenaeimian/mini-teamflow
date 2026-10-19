import { createContext, useMemo, useState } from "react";
import { getTasks, saveTasks } from "../services/taskStorage";
import { STATUS_VALUES } from "../constants/taskConstants";
import { normalizeTask } from "../utils/taskHelpers";

export const TasksContext = createContext(null);

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState(() => getTasks());
  const [error, setError] = useState("");

  function persist(updatedTasks) {
    if (!saveTasks(updatedTasks)) {
      setError("ذخیره تغییرات در مرورگر انجام نشد.");
      return false;
    }

    setError("");
    setTasks(updatedTasks);
    return true;
  }

  function addTask(taskData) {
    const newTask = normalizeTask({
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    });

    if (!newTask) {
      setError("اطلاعات وظیفه معتبر نیست.");
      return false;
    }

    return persist([newTask, ...tasks]);
  }

  function getTaskById(taskId) {
    return tasks.find((task) => task.id === taskId) ?? null;
  }

  function updateTask(taskId, updatedData) {
    const currentTask = getTaskById(taskId);

    if (!currentTask) {
      setError("این وظیفه دیگر وجود ندارد.");
      return false;
    }

    const nextTask = normalizeTask({
      ...currentTask,
      ...updatedData,
      id: currentTask.id,
      createdAt: currentTask.createdAt,
    });

    if (!nextTask) {
      setError("اطلاعات ویرایش‌شده معتبر نیست.");
      return false;
    }

    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? nextTask : task,
    );

    return persist(updatedTasks);
  }

  function updateTaskStatus(taskId, newStatus) {
    if (!STATUS_VALUES.includes(newStatus)) {
      setError("وضعیت انتخاب‌شده معتبر نیست.");
      return false;
    }

    return updateTask(taskId, { status: newStatus });
  }

  function deleteTask(taskId) {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);

    if (updatedTasks.length === tasks.length) {
      setError("حذف وظیفه انجام نشد.");
      return false;
    }

    return persist(updatedTasks);
  }

  const value = useMemo(
    () => ({
      tasks,
      error,
      addTask,
      getTaskById,
      updateTask,
      updateTaskStatus,
      deleteTask,
    }),
    [tasks, error],
  );

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
}

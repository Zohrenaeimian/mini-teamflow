
import { normalizeTask } from "../utils/taskHelpers";

const STORAGE_KEY = "mini-teamflow-tasks";

export function getTasks() {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY);

    
    if (savedTasks === null) {
      return [];
    }

    const tasks = JSON.parse(savedTasks);

  
    if (!Array.isArray(tasks)) {
      console.error("اطلاعات ذخیره‌شده وظایف معتبر نیست.");
      return [];
    }

    return tasks.map(normalizeTask).filter(Boolean);
  } catch (error) {
    console.error("خطا در خواندن وظایف:", error);
    return [];
  }
}

export function saveTasks(tasks) {

  if (!Array.isArray(tasks)) {
    return false;
  }

  try {
    const normalizedTasks = tasks.map(normalizeTask);

  
    if (normalizedTasks.some((task) => task === null)) {
      return false;
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(normalizedTasks)
    );

    return true;
  } catch (error) {
    console.error("خطا در ذخیره وظایف:", error);
    return false;
  }
}

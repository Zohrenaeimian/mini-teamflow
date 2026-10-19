import { useContext } from "react";
import { TasksContext } from "../context/TasksContext";

export default function useTasks() {
  const context = useContext(TasksContext);

  if (!context) {
    throw new Error("useTasks باید داخل TasksProvider استفاده شود.");
  }

  return context;
}
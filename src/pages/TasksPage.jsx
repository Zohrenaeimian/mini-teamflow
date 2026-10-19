import { useCallback, useEffect, useState, useMemo } from "react";
import { Plus } from "lucide-react";
import TaskFilters from "../tasks/TaskFilters";
import TaskList from "../tasks/TaskList";
import TaskForm from "../tasks/TaskForm";
import useTasks from "../hooks/useTasks";
import DeleteConfirmModal from "../tasks/DeleteConfirmModal";
import { filterTasks, sortTasksByDueDate } from "../utils/taskHelpers";

const PAGE_SIZE = 8;

function TasksPage() {
  const {
    tasks,
    addTask,
    getTaskById,
    updateTask,
    updateTaskStatus,
    deleteTask,
  } = useTasks();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    priority: "",
    assignee: "",
  });

  const filteredTasks = useMemo(() => {
    return filterTasks(tasks, filters);
  }, [tasks, filters]);

  const sortedTasks = useMemo(() => {
    return sortTasksByDueDate(filteredTasks, sortOrder);
  }, [filteredTasks, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filteredTasks.length / PAGE_SIZE));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedTasks = useMemo(() => {
    const start = (safeCurrentPage - 1) * PAGE_SIZE;
    return sortedTasks.slice(start, start + PAGE_SIZE);
  }, [sortedTasks, safeCurrentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const closeForm = useCallback(() => {
    setIsFormOpen(false);
    setSelectedTask(null);
  }, []);

  function handleAddTask() {
    setSelectedTask(null);
    setIsFormOpen(true);
  }

  function handleEditTask(task) {
    const taskFromStorage = getTaskById(task.id);

    if (!taskFromStorage) {
      return;
    }

    setSelectedTask(taskFromStorage);
    setIsFormOpen(true);
  }

  function handleSubmitTask(taskData) {
    let isSaved;

    if (selectedTask) {
      isSaved = updateTask(selectedTask.id, taskData);
    } else {
      isSaved = addTask(taskData);
    }

    if (isSaved) {
      if (!selectedTask) {
        setCurrentPage(1);
      }
      closeForm();
    }

    return isSaved;
  }

  function handleDeleteTask(task) {
    setTaskToDelete(task);
  }

  function handleConfirmDelete(task) {
    const isDeleted = deleteTask(task.id);

    if (!isDeleted) {
      window.alert("حذف وظیفه انجام نشد. لطفاً دوباره تلاش کنید.");
    }

    setTaskToDelete(null);
  }

  function handleStatusChange(taskId, newStatus) {
    const isUpdated = updateTaskStatus(taskId, newStatus);

    if (!isUpdated) {
      window.alert("تغییر وضعیت وظیفه انجام نشد. لطفاً دوباره تلاش کنید.");
    }
  }

  return (
    <main className="space-y-6 text-text">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold tracking-tight">مدیریت وظایف</h1>

          <p className="mt-2 text-sm leading-6 text-text-muted">
            وظایف تیم را مشاهده و مدیریت کن.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddTask}
          className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-auto"
        >
          <Plus size={18} strokeWidth={2} />
          ایجاد وظیفه جدید
        </button>
      </section>

      {isFormOpen && (
        <TaskForm
          key={selectedTask?.id ?? "new-task"}
          task={selectedTask}
          onSubmit={handleSubmitTask}
          onCancel={closeForm}
        />
      )}

      <TaskFilters
        filters={filters}
        setFilters={setFilters}
        tasks={tasks}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
      />

      <TaskList
        filters={filters}
        tasks={paginatedTasks}
        totalCount={filteredTasks.length}
        currentPage={safeCurrentPage}
        totalPages={totalPages}
        onPageChange={(page) =>
          setCurrentPage(Math.min(Math.max(1, page), totalPages))
        }
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
        onStatusChange={handleStatusChange}
      />

      <DeleteConfirmModal
        task={taskToDelete}
        onConfirm={handleConfirmDelete}
        onCancel={() => setTaskToDelete(null)}
      />
    </main>
  );
}

export default TasksPage;

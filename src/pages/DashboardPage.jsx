
import { useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  CircleDashed,
  Clock3,
  ClipboardList,
  Plus,
  ListTodo,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import dashboardBanner from "../assets/images/dashboard-banner.webp";
import StatCard from "../dashboard/StatCard";
import TasksChart from "../dashboard/TasksChart";
import UpcomingTasks from "../dashboard/UpcomingTasks";
import TaskForm from "../tasks/TaskForm";
import useTasks from "../hooks/useTasks";
import {
  getTaskStatistics,
  getUpcomingTasks,
} from "../utils/taskHelpers";

const statItems = [
  {
    key: "total",
    label: "کل وظایف",
    Icon: ClipboardList,
    iconStyle: "bg-[#EDF1EB] text-[#173B35]",
    topBorder: "border-t-[#173B35]",
  },
  {
    key: "done",
    label: "وظایف انجام‌شده",
    Icon: CheckCircle2,
    iconStyle: "bg-[#E4F5EC] text-[#167651]",
    topBorder: "border-t-[#1C956B]",
  },
  {
    key: "in_progress",
    label: "وظایف در حال انجام",
    Icon: Clock3,
    iconStyle: "bg-[#EAF1FF] text-[#285BA7]",
    topBorder: "border-t-[#3978D7]",
  },
  {
    key: "todo",
    label: "وظایف در انتظار شروع",
    Icon: CircleDashed,
    iconStyle: "bg-[#FFF3D9] text-[#946315]",
    topBorder: "border-t-[#D99A2B]",
  },
  {
    key: "overdue",
    label: "وظایف عقب‌افتاده",
    Icon: AlertCircle,
    iconStyle: "bg-[#FCE9E8] text-[#B82F38]",
    topBorder: "border-t-[#D94F4F]",
  },
];

function DashboardPage() {
  const { tasks, addTask } = useTasks();
  const navigate = useNavigate();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formError, setFormError] = useState("");

  const statistics = getTaskStatistics(tasks);
  const upcomingTasks = getUpcomingTasks(tasks, 5);

  function handleAddTask() {
    setFormError("");
    setIsFormOpen(true);
  }

  function handleCloseForm() {
    setIsFormOpen(false);
    setFormError("");
  }

  function handleSubmitTask(taskData) {
    const isSaved = addTask(taskData);

    if (isSaved) {
      handleCloseForm();
    } else {
      setFormError("ذخیره وظیفه انجام نشد. لطفاً دوباره تلاش کنید.");
    }

    return isSaved;
  }

  return (
    <div className="min-w-0 space-y-5 sm:space-y-6">
      {/* بنر خوش‌آمدگویی */}
      <section className="relative isolate min-w-0 overflow-hidden rounded-2xl sm:rounded-3xl">
        <img
          src={dashboardBanner}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-[60%_center] sm:object-center"
        />

        <div className="flex min-h-77.5 items-center p-5 sm:min-h-60 sm:p-7 md:p-8 lg:min-h-65 lg:p-10">
          <div className="w-full text-right sm:max-w-[75%] lg:max-w-[60%]">
            <h1 className="text-xl font-extrabold leading-9 text-brand-dark sm:text-2xl sm:leading-10 lg:text-3xl">
              به Mini TeamFlow خوش آمدید
            </h1>

            <p className="mt-2 text-sm leading-7 text-gray-600 sm:mt-3 sm:text-base sm:leading-8">
              وظایف تیم را مدیریت کنید. پیشرفت را ببینید و باهم به هدف‌ها
              نزدیک‌تر شوید.
            </p>

            {/* دکمه‌ها */}
            <div className="mt-5 flex w-full flex-col gap-2.5 min-[400px]:flex-row min-[400px]:flex-wrap sm:mt-6 sm:gap-3">
              <button
                type="button"
                onClick={handleAddTask}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary min-[400px]:w-auto"
              >
                <Plus size={18} className="shrink-0" />
                <span>ایجاد وظیفه جدید</span>
              </button>

              <button
                type="button"
                onClick={() => navigate("/tasks")}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-primary/25 bg-white/95 px-4 py-3 text-sm font-semibold text-primary transition-colors hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary min-[400px]:w-auto"
              >
                <ListTodo size={18} className="shrink-0" />
                <span>مشاهده همه وظایف</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* مودال ایجاد وظیفه */}
      {isFormOpen && (
        <TaskForm
          key="dashboard-new-task"
          onSubmit={handleSubmitTask}
          onCancel={handleCloseForm}
        />
      )}

      {formError && !isFormOpen && (
        <p role="alert" className="text-sm text-red-600">
          {formError}
        </p>
      )}

      {/* کارت‌های آمار */}
      <section aria-label="آمار وظایف">
        <div className="grid min-w-0 grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-5">
          {statItems.map((item) => (
            <StatCard
              key={item.key}
              label={item.label}
              value={statistics[item.key]}
              Icon={item.Icon}
              iconStyle={item.iconStyle}
              topBorder={item.topBorder}
            />
          ))}
        </div>
      </section>

      {/* وظایف و نمودارها */}
      <section className="grid min-w-0 grid-cols-1 items-stretch gap-4 lg:grid-cols-3">
        <div className="min-w-0 lg:col-span-1 lg:col-start-1 lg:row-start-1">
          <UpcomingTasks tasks={upcomingTasks} />
        </div>

        <div className="min-w-0 lg:col-span-2 lg:col-start-2 lg:row-start-1">
          <TasksChart statistics={statistics} tasks={tasks} />
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;

import { useEffect, useRef, useState } from "react";
import TaskFormModal from "./TaskFormModal";

import { isValidDate, formatJalaliInputDate } from "../utils/dateHelpers";

import AssigneeSelect from "./AssigneeSelect";

import { TASK_STATUSES, TASK_PRIORITIES } from "../constants/taskConstants";

const initialFormData = {
  title: "",
  description: "",
  status: "",
  priority: "",
  assigneeName: "",
  projectName: "",
  dueDate: "",
};

// وضعیت عقب‌افتاده از روی تاریخ محاسبه می‌شود و در فرم قابل انتخاب نیست.
const selectableStatuses = TASK_STATUSES.filter(
  (status) => status.value !== "overdue",
);

function TaskForm({ task = null, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(() => {
    if (!task) {
      return { ...initialFormData };
    }

    return {
      title: task.title ?? "",
      description: task.description ?? "",
      status: task.status ?? "",
      priority: task.priority ?? "",
      assigneeName: task.assigneeName ?? "",
      projectName: task.projectName ?? "",
      dueDate: task.dueDate ? String(task.dueDate).slice(0, 10) : "",
    };
  });

  const [jalaliDate, setJalaliDate] = useState(() =>
    formatJalaliInputDate(task?.dueDate ?? ""),
  );

  const [error, setError] = useState("");
 

  const dateInputRef = useRef(null);
  const gregorianInputRef = useRef(null);

  useEffect(() => {
    const dateInput = dateInputRef.current;

    if (!dateInput) return;

    const handleDateChange = () => {
      const selectedJalaliDate = dateInput.value;

      setJalaliDate(selectedJalaliDate);

      setTimeout(() => {
        const gregorianDate = gregorianInputRef.current?.value ?? "";

        setFormData((currentData) => ({
          ...currentData,
          dueDate: gregorianDate,
        }));

        setError("");
      }, 0);
    };

    dateInput.addEventListener("jdp:change", handleDateChange);

    return () => {
      dateInput.removeEventListener("jdp:change", handleDateChange);
    };
  }, []);

  const inputClass =
    "w-full rounded-xl border border-border bg-surface px-3 py-3 text-sm text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10";

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setError("");
  }


  function handleSubmit(event) {
    event.preventDefault();

    const title = formData.title.trim();

    if (!title) {
      setError("وارد کردن عنوان وظیفه الزامی است.");
      return;
    }

    const isStatusValid = selectableStatuses.some(
      (status) => status.value === formData.status,
    );

    if (!isStatusValid) {
      setError("لطفاً وضعیت معتبر انتخاب کنید.");
      return;
    }

    const isPriorityValid = TASK_PRIORITIES.some(
      (priority) => priority.value === formData.priority,
    );

    if (!isPriorityValid) {
      setError("لطفاً اولویت معتبر انتخاب کنید.");
      return;
    }

    if (!isValidDate(formData.dueDate)) {
      setError("لطفاً یک تاریخ معتبر از تقویم انتخاب کنید.");
      return;
    }

    const taskData = {
      ...formData,
      title,
      description: formData.description.trim(),
      assigneeName: formData.assigneeName.trim(),
      projectName: formData.projectName.trim(),
    };

    const isSaved = onSubmit(taskData);

    if (!isSaved) {
      setError(
        task
          ? "ذخیره تغییرات انجام نشد. لطفاً دوباره تلاش کنید."
          : "ذخیره وظیفه انجام نشد. لطفاً دوباره تلاش کنید.",
      );
    }
  }

  return (
    <TaskFormModal
      title={task ? "ویرایش وظیفه" : "ایجاد وظیفه جدید"}
      description={
        task ? "اطلاعات وظیفه را ویرایش کنید." : "اطلاعات وظیفه را وارد کنید."
      }
      onCancel={onCancel}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-text"
            >
              عنوان وظیفه *
            </label>

            <input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={inputClass}
              placeholder="عنوان وظیفه را وارد کنید"
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-text"
            >
              توضیحات
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className={inputClass}
              placeholder="توضیحات وظیفه را وارد کنید"
            />
          </div>

          <div>
            <label
              htmlFor="status"
              className="mb-2 block text-sm font-medium text-text"
            >
              وضعیت *
            </label>

            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="" hidden>
                انتخاب وضعیت
              </option>

              {selectableStatuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="priority"
              className="mb-2 block text-sm font-medium text-text"
            >
              اولویت *
            </label>

            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="" hidden>
                انتخاب اولویت
              </option>

              {TASK_PRIORITIES.map((priority) => (
                <option key={priority.value} value={priority.value}>
                  {priority.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="assigneeName"
              className="mb-2 block text-sm font-medium text-text"
            >
              عضو مسئول
            </label>

            <AssigneeSelect
              value={formData.assigneeName}
              onChange={(assigneeName) => {
                setFormData((currentData) => ({
                  ...currentData,
                  assigneeName,
                }));
                setError("");
              }}
            />
          </div>

          <div>
            <label
              htmlFor="projectName"
              className="mb-2 block text-sm font-medium text-text"
            >
              پروژه
            </label>

            <input
              id="projectName"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              className={inputClass}
              placeholder="نام پروژه"
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="dueDate"
              className="mb-2 block text-sm font-medium text-text"
            >
              موعد تحویل *
            </label>

            <input
              ref={dateInputRef}
              id="dueDate"
              type="text"
              data-jdp
              data-jdp-only-date
              data-jdp-target-value-input="#dueDateGregorian"
              data-jdp-target-value-type="gregorian"
              value={jalaliDate}
              onChange={(event) => {
                setJalaliDate(event.target.value);
                setError("");
              }}
              onBlur={() => {
                const gregorianDate = gregorianInputRef.current?.value ?? "";

                setFormData((currentData) => ({
                  ...currentData,
                  dueDate: gregorianDate,
                }));
              }}
              className={inputClass}
              placeholder="انتخاب تاریخ شمسی"
              autoComplete="off"
              readOnly
            />

            <input
              ref={gregorianInputRef}
              id="dueDateGregorian"
              type="hidden"
            />
          </div>
        </div>

        {error && (
          <p
            role="alert"
            className="rounded-xl bg-red-50 p-3 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        <div className="flex flex-wrap justify-end gap-3 border-t border-border pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-border px-4 py-3 text-sm font-medium text-text transition hover:bg-surface-muted"
          >
            لغو
          </button>

          <button
            type="submit"
            className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-hover"
          >
            {task ? "ذخیره تغییرات" : "ذخیره وظیفه"}
          </button>
        </div>
      </form>
    </TaskFormModal>
  );
}

export default TaskForm;

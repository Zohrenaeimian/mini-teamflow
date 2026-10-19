
import { useEffect } from "react";
import { X } from "lucide-react";

function TaskFormModal({ title, description, onCancel, children }) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onCancel();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onCancel]);

  return (
    <div
      className="fixed inset-0 z-50 m-0 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onCancel();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-form-title"
        dir="rtl"
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border bg-surface p-5 shadow-2xl sm:p-6"
      >
        <button
          type="button"
          onClick={onCancel}
          aria-label="بستن پنجره"
          className="absolute left-4 top-4 rounded-lg p-2 text-text-muted transition hover:bg-surface-muted hover:text-text"
        >
          <X size={20} />
        </button>

        <div className="mb-6 pl-10">
          <h2
            id="task-form-title"
            className="text-lg font-bold text-text"
          >
            {title}
          </h2>

          <p className="mt-1 text-sm text-text-muted">
            {description}
          </p>
        </div>

        {children}
      </section>
    </div>
  );
}

export default TaskFormModal;

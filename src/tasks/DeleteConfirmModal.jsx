
import { AlertTriangle, Trash2, X } from "lucide-react";

function DeleteConfirmModal({ task, onConfirm, onCancel }) {
  if (!task) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onClick={onCancel}
    >
      <section
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
        className="w-full max-w-md overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-[#FCE9E8] text-status-overdue-text">
              <AlertTriangle size={22} />
            </div>

            <h2
              id="delete-modal-title"
              className="text-base font-bold text-text"
            >
              تأیید حذف وظیفه
            </h2>
          </div>

          <button
            type="button"
            onClick={onCancel}
            aria-label="بستن پنجره"
            className="flex size-8 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-surface-muted hover:text-text"
          >
            <X size={18} />
          </button>
        </div>

        
        <div className="space-y-4 p-5">
          <p
            id="delete-modal-description"
            className="text-sm leading-7 text-text-muted"
          >
            آیا از حذف این وظیفه مطمئن هستی؟ این عملیات قابل بازگردانی نیست.
          </p>

          <div className="rounded-xl border border-border bg-surface-muted/50 p-3">
            <p className="mb-1 text-xs text-text-muted">
              عنوان وظیفه
            </p>

            <p className="wrap-break-words text-sm font-semibold text-text">
              {task.title}
            </p>
          </div>
        </div>

        
        <div className="flex flex-col-reverse gap-3 border-t border-border px-5 py-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-text transition-colors hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            انصراف
          </button>

          <button
            type="button"
            onClick={() => onConfirm(task)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C83F45] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#AD3037] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C83F45]"
          >
            <Trash2 size={16} />
            بله، حذف شود
          </button>
        </div>
      </section>
    </div>
  );
}

export default DeleteConfirmModal;

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Plus, Search, Trash2, X } from "lucide-react";

import { getMembers, saveMembers } from "../services/memberStorage";

function AssigneeSelect({ value, onChange }) {
  const [members, setMembers] = useState(() => getMembers());
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newMemberName, setNewMemberName] = useState("");
  const [error, setError] = useState("");

  const dropdownRef = useRef(null);
  const addInputRef = useRef(null);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (!dropdownRef.current?.contains(event.target)) {
        setIsOpen(false);
        setSearch("");
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (isAddModalOpen) {
      addInputRef.current?.focus();
    }
  }, [isAddModalOpen]);

  const filteredMembers = members
    .filter((member) =>
      member.toLowerCase().includes(search.trim().toLowerCase()),
    )
    .sort((a, b) => a.localeCompare(b, "fa"));

  function handleSelect(memberName) {
    onChange(memberName);
    setIsOpen(false);
    setSearch("");
  }

  function handleAddMember() {
    const memberName = newMemberName.trim();

    if (!memberName) {
      setError("نام عضو را وارد کنید.");
      return;
    }

    const isDuplicate = members.some(
      (member) => member.toLowerCase() === memberName.toLowerCase(),
    );

    if (isDuplicate) {
      setError("این عضو قبلاً ثبت شده است.");
      return;
    }

    const updatedMembers = [...members, memberName];
    const isSaved = saveMembers(updatedMembers);

    if (!isSaved) {
      setError("ذخیره عضو انجام نشد. دوباره تلاش کنید.");
      return;
    }

    setMembers(updatedMembers);
    onChange(memberName);
    setNewMemberName("");
    setError("");
    setIsAddModalOpen(false);
    setIsOpen(false);
    setSearch("");
  }
  function handleDeleteMember(event, memberName) {
    event.stopPropagation();

    const updatedMembers = members.filter((member) => member !== memberName);

    if (!saveMembers(updatedMembers)) {
      setError("حذف عضو انجام نشد. دوباره تلاش کنید.");
      return;
    }

    setMembers(updatedMembers);
    setError("");
  }

  function handleCloseAddModal() {
    setIsAddModalOpen(false);
    setNewMemberName("");
    setError("");
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        id="assigneeName"
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
        className="flex w-full items-center justify-between rounded-xl border border-border bg-surface px-3 py-3 text-sm text-text outline-none transition hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/10"
      >
        <span className={value ? "" : "text-text-muted"}>
          {value || "انتخاب عضو مسئول"}
        </span>

        <ChevronDown
          size={16}
          className={`text-text-muted transition ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-30 mt-2 w-full min-w-52 rounded-xl border border-border bg-surface p-2 shadow-lg">
          <div className="mb-2 flex items-center gap-2">
            <div className="relative min-w-0 flex-1">
              <Search
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted"
              />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="جست‌وجوی عضو..."
                className="w-full rounded-lg border border-border bg-surface py-2 pr-9 pl-3 text-sm text-text outline-none focus:border-primary"
              />
            </div>

            <button
              type="button"
              onClick={() => {
                setIsAddModalOpen(true);
                setError("");
              }}
              aria-label="افزودن عضو جدید"
              title="افزودن عضو جدید"
              className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-white transition hover:bg-primary-hover"
            >
              <Plus size={18} />
            </button>
          </div>

          <div className="max-h-52 overflow-y-auto">
            <button
              type="button"
              onClick={() => handleSelect("")}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-right text-sm text-text transition hover:bg-surface-muted"
            >
              بدون مسئول
              {!value && <Check size={15} className="text-primary" />}
            </button>

            {filteredMembers.map((member) => (
              <div
                key={member}
                className="flex items-center gap-1 rounded-lg transition hover:bg-surface-muted"
              >
                <button
                  type="button"
                  onClick={() => handleSelect(member)}
                  className="flex min-w-0 flex-1 items-center justify-between gap-2 px-3 py-2 text-right text-sm text-text"
                >
                  <span className="truncate">{member}</span>

                  {value === member && (
                    <Check size={15} className="shrink-0 text-primary" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={(event) => handleDeleteMember(event, member)}
                  aria-label={`حذف ${member}`}
                  title="حذف عضو"
                  className="ml-1 flex size-8 shrink-0 items-center justify-center rounded-lg text-text-muted transition hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}

            {filteredMembers.length === 0 && (
              <p className="px-3 py-4 text-center text-xs text-text-muted">
                عضوی پیدا نشد.
              </p>
            )}
          </div>
        </div>
      )}

      {isAddModalOpen && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 p-4"
          onClick={handleCloseAddModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-member-title"
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-sm rounded-2xl border border-border bg-surface p-5 shadow-xl"
          >
            <div className="mb-5 flex items-start justify-between gap-3">
              <div>
                <h3 id="add-member-title" className="font-semibold text-text">
                  افزودن عضو جدید
                </h3>

                <p className="mt-1 text-xs text-text-muted">
                  نام عضو جدید را وارد کنید.
                </p>
              </div>

              <button
                type="button"
                onClick={handleCloseAddModal}
                aria-label="بستن"
                className="rounded-lg p-1.5 text-text-muted transition hover:bg-surface-muted"
              >
                <X size={18} />
              </button>
            </div>

            <div onSubmit={handleAddMember}>
              <label
                htmlFor="newMemberName"
                className="mb-2 block text-sm font-medium text-text"
              >
                نام عضو
              </label>

              <input
                ref={addInputRef}
                id="newMemberName"
                type="text"
                value={newMemberName}
                onChange={(event) => {
                  setNewMemberName(event.target.value);
                  setError("");
                }}
                placeholder="مثلاً سارا احمدی"
                className="w-full rounded-xl border border-border bg-surface px-3 py-3 text-sm text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              />

              {error && (
                <p role="alert" className="mt-2 text-xs text-red-600">
                  {error}
                </p>
              )}

              <div className="mt-5 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={handleCloseAddModal}
                  className="rounded-xl border border-border px-4 py-2.5 text-sm text-text transition hover:bg-surface-muted"
                >
                  انصراف
                </button>

                <button
                  type="button"
                  onClick={handleAddMember}
                  className="rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-primary-hover"
                >
                  ثبت عضو
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AssigneeSelect;


import { useMemo, useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";

function AssigneeDropdown({ tasks, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const members = useMemo(() => {
    return [
      ...new Set(
        tasks
          .map((task) => task.assigneeName?.trim())
          .filter(Boolean)
      ),
    ].sort((a, b) => a.localeCompare(b, "fa"));
  }, [tasks]);

  const filteredMembers = members.filter((name) =>
    name.toLowerCase().includes(search.trim().toLowerCase())
  );

  function handleSelect(name) {
    onChange(name);
    setIsOpen(false);
    setSearch("");
  }

  return (
    <div className="relative">
      <button
        id="task-assignee"
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-xl border border-border bg-surface px-3 py-3 text-sm text-text outline-none transition hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/10"
      >
        <span className={value ? "" : "text-text-muted"}>
          {value || "همه اعضا"}
        </span>

        <ChevronDown size={16} className="text-text-muted" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-30 mt-2 w-full min-w-52 rounded-xl border border-border bg-surface p-2 shadow-lg">
          <div className="relative mb-2">
            <Search
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="جست‌وجوی عضو..."
              className="w-full rounded-lg border border-border bg-surface px-3 py-2 pr-9 text-sm text-text outline-none focus:border-primary"
            />
          </div>

          <div className="max-h-52 overflow-y-auto">
            <button
              type="button"
              onClick={() => handleSelect("")}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-right text-sm transition hover:bg-surface-muted"
            >
              همه اعضا
              {!value && <Check size={15} />}
            </button>

            {filteredMembers.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => handleSelect(name)}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-right text-sm transition hover:bg-surface-muted"
              >
                <span>{name}</span>
                {value === name && <Check size={15} />}
              </button>
            ))}

            {filteredMembers.length === 0 && (
              <p className="px-3 py-4 text-center text-xs text-text-muted">
                عضوی پیدا نشد.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AssigneeDropdown;

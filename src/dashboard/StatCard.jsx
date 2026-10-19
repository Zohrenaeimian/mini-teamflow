function StatCard({ label, value, Icon, iconStyle, topBorder }) {
  return (
    <article
      className={`min-w-0 rounded-2xl border border-border border-t-2 ${topBorder} bg-surface p-4 shadow-sm shadow-brand-dark/3 transition-shadow hover:shadow-md sm:p-5`}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-right text-3xl font-bold tracking-tight text-text sm:text-4xl">
          {value}
        </p>

        <div
          className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${iconStyle}`}
        >
          <Icon size={19} strokeWidth={1.8} />
        </div>
      </div>
      <p className="min-w-0 mt-5 text-xs leading-6 text-text-muted sm:text-sm">
        {label}
      </p>
      
    </article>
  );
}

export default StatCard;


function parseDateString(dateString) {
  if (
    typeof dateString !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(dateString)
  ) {
    return null;
  }

  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }

  return { year, month, day, date };
}

function formatDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function isValidDate(dateString) {
  return parseDateString(dateString) !== null;
}

export function getTodayString() {
  return formatDateString(new Date());
}

export function formatJalaliDate(gregorianDate) {
  const parsed = parseDateString(gregorianDate);

  if (!parsed) {
    return gregorianDate ? "تاریخ نامعتبر" : "بدون تاریخ";
  }

  return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "UTC",
  }).format(parsed.date);
}

export function formatJalaliInputDate(gregorianDate) {
  const parsed = parseDateString(gregorianDate);

  if (!parsed) {
    return "";
  }

  const parts = new Intl.DateTimeFormat("en-US-u-ca-persian", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "UTC",
  }).formatToParts(parsed.date);

  const values = Object.fromEntries(
    parts
      .filter((part) => ["year", "month", "day"].includes(part.type))
      .map((part) => [part.type, part.value]),
  );

  return `${values.year}/${values.month}/${values.day}`;
}

export function addDaysToDateString(dateString, days) {
  const parsed = parseDateString(dateString);

  if (!parsed || !Number.isInteger(days)) {
    return "";
  }

  parsed.date.setUTCDate(parsed.date.getUTCDate() + days);

  return parsed.date.toISOString().slice(0, 10);
}

export function getDaysRemaining(dueDate) {
  const parsedDueDate = parseDateString(dueDate);

  if (!parsedDueDate) {
    return null;
  }

  const today = parseDateString(getTodayString());

  const todayTime = today.date.getTime();
  const dueTime = parsedDueDate.date.getTime();

  return (dueTime - todayTime) / (24 * 60 * 60 * 1000);
}

export function getCurrentWeekDates() {
  const today = new Date();
  const daysSinceSaturday = (today.getDay() + 1) % 7;

  const saturday = new Date(today);
  saturday.setDate(today.getDate() - daysSinceSaturday);

  const weekDays = [
    "شنبه",
    "یکشنبه",
    "دوشنبه",
    "سه‌شنبه",
    "چهارشنبه",
    "پنجشنبه",
    "جمعه",
  ];

  return weekDays.map((name, index) => {
    const date = new Date(saturday);
    date.setDate(saturday.getDate() + index);

    return {
      name,
      dateKey: formatDateString(date),
    };
  });
}


const STORAGE_KEY = "mini-teamflow-members";

export function getMembers() {
  try {
    const savedMembers = localStorage.getItem(STORAGE_KEY);

    if (savedMembers === null) {
      return [];
    }

    const members = JSON.parse(savedMembers);

    if (!Array.isArray(members)) {
      return [];
    }

    return [
      ...new Set(
        members
          .filter((member) => typeof member === "string")
          .map((member) => member.trim())
          .filter(Boolean),
      ),
    ];
  } catch (error) {
    console.error("خطا در خواندن اعضا:", error);
    return [];
  }
}

export function saveMembers(members) {
  if (!Array.isArray(members)) {
    return false;
  }

  try {
    const normalizedMembers = [
      ...new Set(
        members
          .filter((member) => typeof member === "string")
          .map((member) => member.trim())
          .filter(Boolean),
      ),
    ];

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(normalizedMembers),
    );

    return true;
  } catch (error) {
    console.error("خطا در ذخیره اعضا:", error);
    return false;
  }
}

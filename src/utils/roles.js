export function normalizeRole(role) {
  if (!role) return "";
  return role
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
}

export function isHeadNurseRole(role) {
  return normalizeRole(role) === "jefe de enfermeria";
}

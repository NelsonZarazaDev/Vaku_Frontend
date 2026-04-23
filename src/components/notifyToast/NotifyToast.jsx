import { toast } from "react-toastify";

const recentToasts = new Map();
const DEDUP_WINDOW_MS = 1500;

export const showToast = (message, type = "default") => {
  if (!message) return;

  const cleanMessage = String(message).trim();
  if (!cleanMessage) return;

  const toastId = `${type}:${cleanMessage}`;
  const now = Date.now();
  const lastShownAt = recentToasts.get(toastId);

  if (lastShownAt && now - lastShownAt < DEDUP_WINDOW_MS) return;
  if (toast.isActive(toastId)) return;

  recentToasts.set(toastId, now);

  const config = {
    toastId,
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  switch (type) {
    case "success":
      toast.success(cleanMessage, config);
      break;
    case "error":
      toast.error(cleanMessage, config);
      break;
    case "info":
      toast.info(cleanMessage, config);
      break;
    default:
      toast(cleanMessage, config);
  }
};

export const extractApiErrorMessage = (error, fallback = "Error inesperado en el servidor") => {
  const data = error?.response?.data;

  if (typeof data === "string" && data.trim()) {
    return data.trim();
  }

  if (data && typeof data === "object") {
    if (typeof data.message === "string" && data.message.trim()) {
      return data.message.trim();
    }

    const firstValue = Object.values(data).find((value) => {
      return typeof value === "string" && value.trim();
    });

    if (typeof firstValue === "string" && firstValue.trim()) {
      return firstValue.trim();
    }
  }

  return fallback;
};

export const showApiError = (error, fallback) => {
  showToast(extractApiErrorMessage(error, fallback), "error");
};

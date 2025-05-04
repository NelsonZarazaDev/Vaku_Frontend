import { toast } from "react-toastify";

export const showToast = (message, type = "default") => {
    const config = {
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
        toast.success(message, config);
        break;
      case "error":
        toast.error(message, config);
        break;
      case "info":
        toast.info(message, config);
        break;
      default:
        toast(message, config);
    }
  };

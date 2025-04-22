import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

export const showToast = (message, type = "default") => {
    const config = {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      newestOnTop: false,
      closeOnClick: false,
      rtl: false,
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

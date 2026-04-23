import React, { useEffect } from "react";
import { createPortal } from "react-dom";

export default function BaseModal({ onClose, children, size = "default" }) {
  const panelClassName = size === "sm" ? "modal-panel modal-panel-sm" : "modal-panel";

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  const modalContent = (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-backdrop" onClick={onClose} />
      <div className={panelClassName}>{children}</div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

import React from "react";

export default function ButtonEmailPriority({ onNotify }) {
  return (
    <button onClick={onNotify} className="btn-warning" type="button">
      Notificar
    </button>
  );
}

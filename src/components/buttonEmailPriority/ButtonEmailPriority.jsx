import React from "react";
import UsePriority from "../../hooks/priority/UsePriority";

export default function ButtonEmailPriority() {
  const { notifyEmail } = UsePriority();

  return (
    <button onClick={notifyEmail} className="btn-warning" type="button">
      Notificar
    </button>
  );
}

import React from "react";
import { useState } from "react";

export default function StepsHeader(props) {
  return (
    <div>
      <div>
        <label
          style={
            props.step == 1 ? { fontWeight: "bold" } : { fontWeight: "normal" }
          }
        >
          Remitente
        </label>
        <label
          style={
            props.step == 2 ? { fontWeight: "bold" } : { fontWeight: "normal" }
          }
        >
          Destinatario
        </label>
        <label
          style={
            props.step == 3 ? { fontWeight: "bold" } : { fontWeight: "normal" }
          }
        >
          Dimensiones
        </label>
        <label
          style={
            props.step == 4 ? { fontWeight: "bold" } : { fontWeight: "normal" }
          }
        >
          Realiza tu pago
        </label>
      </div>
    </div>
  );
}

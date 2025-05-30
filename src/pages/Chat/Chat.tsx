import React from "react";

export default function Chat() {
  const whatsappGroupUrl = "https://chat.whatsapp.com/BmrYueCLxp5ENG73U0cXaq";

  return (
    <div className="d-flex flex-column align-items-center justify-content-center text-center" style={{ height: '100vh' }}>
      <h1 className="text-secondary mb-3">Grupo de WhatsApp</h1>
      <p className="text-muted mb-4">
        Únete al grupo de WhatsApp de la comunidad para resolver dudas, compartir información y estar al tanto de las novedades del conjunto.
      </p>
      <a
        href={whatsappGroupUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-success btn-lg d-flex align-items-center gap-2"
      >
        <i className="bi bi-whatsapp fs-4"></i>
        Unirse al grupo
      </a>
    </div>
  );
}

import React from 'react';
import { Producto } from '../services/productService';
import { Modal, Button } from 'react-bootstrap';

interface Props {
  show: boolean;
  onClose: () => void;
  producto: Producto | null;
}

export default function ProductModal({ show, onClose, producto }: Props) {
  if (!producto) return null;

  const imagen = producto.imagenBase64
    ? `data:image/jpeg;base64,${producto.imagenBase64}`
    : producto.imagenUrl || 'https://via.placeholder.com/300';

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{producto.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-6 text-center mb-3">
            <img src={imagen} alt={producto.name} className="img-fluid rounded shadow-sm" />
          </div>
          <div className="col-md-6">
            <p><strong>Estado:</strong> {producto.active}</p>
            <p><strong>Precio:</strong> ${producto.price}</p>
            <p><strong>Descripción:</strong><br />{producto.description}</p>
          </div>
        </div>
        <hr />
        <h6>Comentarios</h6>
        {producto.comentarios && producto.comentarios.length > 0 ? (
          <ul className="list-group">
            {producto.comentarios.map((comentario) => (
              <li key={comentario.id} className="list-group-item d-flex justify-content-between align-items-center">
                {comentario.contenido}
                <span className={`badge ${comentario.positivo ? 'bg-success' : 'bg-danger'}`}>
                  {comentario.positivo ? '👍' : '👎'}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">Sin comentarios.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

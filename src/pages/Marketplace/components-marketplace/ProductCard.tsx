import React from 'react';
import { Producto } from '../services/productService';

interface Props {
  producto: Producto;
  onVerDetalles: () => void;
  onEliminar: () => void;
}

export default function ProductCard({ producto, onVerDetalles, onEliminar }: Props) {
  const imagen = producto.imagenBase64
    ? `data:image/jpeg;base64,${producto.imagenBase64}`
    : producto.imagenUrl || 'https://via.placeholder.com/150';

  return (
    <div
      className="card shadow-sm"
      style={{
        height: '350px',
        maxWidth: '280px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <img
        src={imagen}
        className="card-img-top"
        alt={producto.name || 'Imagen del producto'}
        style={{ 
          objectFit: 'cover', 
          height: '150px', 
          width: '100%',
          flexShrink: 0,
        }}
      />
      <div
        className="card-body d-flex flex-column justify-content-between"
        style={{ flexGrow: 1, padding: '1rem' }}
      >
        <div>
          <h5
            className="card-title"
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              marginBottom: '0.5rem',
            }}
            title={producto.name}
          >
            {producto.name}
          </h5>
          <p
            className="card-text text-muted"
            style={{
              height: '3rem', // aprox 2 líneas
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              marginBottom: '0.5rem',
            }}
            title={producto.description}
          >
            {producto.description}
          </p>
                    <p className="fw-bold mb-0" style={{ fontSize: '1.1rem' }}>
            $ {producto.price}
          </p>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-auto">
          <div>
            <button
              className="btn btn-outline-primary btn-sm me-2"
              onClick={onVerDetalles}
              style={{ minWidth: '70px' }}
            >
              Ver más
            </button>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={onEliminar}
              style={{ minWidth: '70px' }}
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { Producto, productService } from './services/productService';
import ProductCard from './components-marketplace/ProductCard';
import ProductForm from './components-marketplace/ProductForm';
import ProductModal from './components-marketplace/ProductModal';

export default function Marketplace() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [selectedProducto, setSelectedProducto] = useState<Producto | null>(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const cargarProductos = async () => {
    try {
      const token = localStorage.getItem('authToken') || '';
      const data = await productService.getAll(token);
      setProductos(data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleCrearProducto = async (nuevo: Producto) => {
    try {
      const token = localStorage.getItem('authToken') || '';
      await productService.create(nuevo, token);
      setMostrarFormulario(false);
      cargarProductos();
    } catch (error) {
      console.error('Error al crear producto:', error);
    }
  };

  const handleEliminarProducto = async (id: number) => {
    try {
      const token = localStorage.getItem('authToken') || '';
      await productService.remove(id, token);
      cargarProductos();
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-secondary text-center mb-4">Marketplace</h2>

      <div className="text-end mb-3">
        <button className="btn btn-primary" onClick={() => setMostrarFormulario(!mostrarFormulario)}>
          {mostrarFormulario ? 'Cancelar' : 'Agregar Producto'}
        </button>
      </div>

      {mostrarFormulario && <ProductForm onSubmit={handleCrearProducto} />}

      <div className="row">
        {productos.map((prod) => (
          <div
            key={prod.id}
            className={`mb-3 ${
              productos.length === 1
                ? 'col-12'        // si solo 1, ocupa todo el ancho
                : productos.length === 2
                ? 'col-md-6'      // si hay 2, ocupa mitad cada una
                : 'col-md-4'      // si hay 3 o más, ocupa 1/3
            }`}
          >
            <ProductCard
              producto={prod}
              onVerDetalles={() => setSelectedProducto(prod)}
              onEliminar={() => handleEliminarProducto(prod.id!)}
            />
          </div>
        ))}
      </div>

      {selectedProducto && (
        <ProductModal
          show={!!selectedProducto}
          producto={selectedProducto}
          onClose={() => setSelectedProducto(null)}
        />
      )}
    </div>
  );
}

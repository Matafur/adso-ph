import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Producto } from '../services/productService';

interface Props {
  onSubmit: (producto: Producto) => void;
}

export default function ProductForm({ onSubmit }: Props) {
  const [formData, setFormData] = useState<Producto>({
    name: '',
    description: '',
    imagenUrl: '',
    imagenBase64: '',
    active: '',
    price: 0,
  });

  const [imagenPreview, setImagenPreview] = useState<string | null>(null);

  // Actualiza los campos del formulario
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : value,
    }));
  };

  // Maneja la carga de archivo y convierte a base64
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        setFormData((prev) => ({
          ...prev,
          imagenBase64: base64String,
          imagenUrl: '',
        }));
        setImagenPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Envía el formulario y limpia el estado
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: '',
      description: '',
      imagenUrl: '',
      imagenBase64: '',
      active: '',
      price: 0,
    });
    setImagenPreview(null);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 border rounded p-3 shadow-sm">
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Nombre</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" required />
        </div>

        <div className="col-md-6">
          <label className="form-label">Estado</label>
          <input type="text" name="active" value={formData.active} onChange={handleChange} className="form-control" required />
        </div>

        <div className="col-12">
          <label className="form-label">Descripción</label>
          <textarea name="description" value={formData.description} onChange={handleChange} className="form-control" required />
        </div>

        <div className="col-md-6">
          <label className="form-label">Precio</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} className="form-control" required />
        </div>

        <div className="col-md-6">
          <label className="form-label">Imagen (archivo)</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="form-control" />
        </div>

        {imagenPreview && (
          <div className="col-12 text-center">
            <img src={imagenPreview} alt="Vista previa" className="img-thumbnail" style={{ maxHeight: '200px' }} />
          </div>
        )}

        <div className="col-12 text-end">
          <button type="submit" className="btn btn-success">
            Guardar Producto
          </button>
        </div>
      </div>
    </form>
  );
}

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  BellIcon,
  CalendarIcon,
  Trash2Icon,
  TreePineIcon,
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Dashboard - Conjunto San Joaquín";
  }, []);

  const comunicados = [
    {
      titulo: "Celebración del Día del Vecino",
      descripcion:
        "Invitación a la celebración del Día del Vecino en el área común. Se detallan las actividades planeadas, como juegos, música y una feria de alimentos.",
      fecha: "5 de marzo de 2024",
      icono: <BellIcon className="text-green-500" />,
    },
    {
      titulo: "Inicio de Inscripciones para Clases de Fitness",
      descripcion:
        "Se informa a los residentes que las inscripciones para las clases de fitness en el gimnasio comenzarán el 10 de marzo.",
      fecha: "10 de marzo de 2024",
      icono: <CalendarIcon className="text-blue-500" />,
    },
    {
      titulo: "Jornada de Recolección de Residuos Electrónicos",
      descripcion:
        "Anuncio de una jornada especial para la recolección de residuos electrónicos. Se detalla la importancia de desechar adecuadamente estos productos.",
      fecha: "12 de marzo de 2024",
      icono: <Trash2Icon className="text-red-500" />,
    },
    {
      titulo: "Reunión Mensual de Vecinos",
      descripcion:
        "La próxima reunión mensual de vecinos se tendrá en el salón comunal para tratar asuntos importantes del conjunto.",
      fecha: "17 de marzo de 2024",
      icono: <TreePineIcon className="text-teal-500" />,
    },
  ];

  return (
    <div className="p-2">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Comunicados</h1>
        <Button onClick={() => alert("Crear nuevo evento")}>Crear evento</Button>
      </div>

      <div className="grid gap-4">
        {comunicados.map((item, index) => (
          <Card key={index} className="flex justify-between items-center p-4">
            <div>
              <h3 className="text-lg font-semibold text-green-700">
                {item.titulo}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                {item.descripcion}
              </p>
              <p className="text-xs text-gray-500">{item.fecha}</p>
            </div>
            <div className="text-3xl">{item.icono}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}

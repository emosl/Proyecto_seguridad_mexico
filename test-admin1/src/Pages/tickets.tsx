import React, { useState, useEffect } from 'react';
import {
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  DateInput,
  NumberInput,
  useNotify,
  useRefresh,
  useRedirect,
} from 'react-admin';

const serviceOptions = {
  "Servicios": ["Agua", "Luz", "Teléfono", "Basura", "Limpieza del Aula"],
  "Digital": ["Internet, Servidores y Equipos", "Software", "Hardware", "Cámaras de seguridad", "Soporte técnico presencial y remoto"],
  "Infraestructura": ["Paredes", "Techo", "Ventanas", "Puertas", "Aulas en general"],
  "Recursos humanos": ["Permisos", "Asistencias", "Salud", "Trámites", "Honorarios"],
  "Beneficiarios": ["Asistencias", "Documentación", "Apoyo académico", "Salud", "Seguridad, bulling"],
  "Mobiliario": ["Sillas, butacas", "Escritorios", "Pizarrones", "Cafetería", "Etantes, archiveros"],
  "Seguridad": ["Delincuencia", "Robos", "Bandalismo", "Imagen institucional"],
  "Materiales": ["Educativos", "Papelería", "Limpieza"],
  "Fenómeno meteorológico": ["Inundaciones", "Incendios", "Sismos"],
};

export const TicketsCreate = () => {
  const [classification, setClassification] = useState('');
  const [services, setServices] = useState([]);
  const notify = useNotify();
  const refresh = useRefresh();
  const redirect = useRedirect();

  useEffect(() => {
    setServices(serviceOptions[classification] || []);
  }, [classification]);

  const onSuccess = () => {
    notify('Ticket created successfully');
    redirect('/tickets');
    refresh();
  };

  return (
    <Create onSuccess={onSuccess}>
      <SimpleForm>
        <SelectInput 
          source="clasificacion" 
          choices={Object.keys(serviceOptions).map(key => ({ id: key, name: key }))} 
          onChange={e => setClassification(e.target.value)}
        />
        {classification && <SelectInput source="tipoDeIncidencia" choices={services.map(service => ({ id: service, name: service }))} />}
        <SelectInput 
          source="nivelDePrioridad" 
          choices={[
            { id: 'alto', name: 'Alto' }, 
            { id: 'bajo', name: 'Bajo' }, 
            { id: 'intermedio', name: 'Intermedio' }
          ]}
        />
        <NumberInput source="numeroDeIntermediarios" />
        <TextInput source="Qué, cómo y si no se resolvió ¿por qué?" />
        <NumberInput source="Tiempo que tardó en atenderse (días)" />
        <DateInput source="fechaDeCreacion" defaultValue={new Date()} />
      </SimpleForm>
    </Create>
  );
};

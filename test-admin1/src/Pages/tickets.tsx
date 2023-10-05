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
  List,
  Datagrid,
  TextField,
  DateField,
  FunctionField,
  Edit,
} from 'react-admin';
import { useDataProvider } from 'react-admin';

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
        <DateInput source="fechaDeCreacion" defaultValue={new Date()} />
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
      </SimpleForm>
    </Create>
  );
};

export const TicketsList = (props) => {
  const [isFinished, setIsFinished] = useState(false);
  const notify = useNotify();
  const refresh = useRefresh();
  const dataProvider = useDataProvider();

  const handleFinish = (id) => {
    dataProvider.update('tickets', { id, data: { status: 'finished' } })
      .then(() => {
        notify('Ticket marked as finished');
        setIsFinished(true);
        refresh();
      })
      .catch((error) => {
        console.error('Error:', error);
        notify('Error: could not mark the ticket as finished', 'warning');
      });
  };

  const handleUpdate = (data, id) => {
    dataProvider.update('tickets', { id, data: { ...data, status: 'finished' } })
      .then(() => {
        notify('Ticket updated successfully');
        setIsFinished(false); 
        refresh();
      })
      .catch((error) => {
        console.error('Error:', error);
        notify('Error: could not update the ticket', 'warning');
      });
  };

  return (
    <List {...props}>
      {isFinished ? (
        // The <Edit> component will take the ID from the URL
        <Edit {...props}>
          <SimpleForm>
            <TextInput label="Resolution Details" source="resolutionDetails" />
            <NumberInput label="Resolution Time (days)" source="resolutionTime" />
            <TextInput label="Feedback" source="feedback" />
            <SelectInput label="Satisfaction" source="satisfaction" choices={[
              { id: 'satisfied', name: 'Satisfied' },
              { id: 'neutral', name: 'Neutral' },
              { id: 'unsatisfied', name: 'Unsatisfied' },
            ]} />
          </SimpleForm>
        </Edit>
      ) : (
        <Datagrid>
          <TextField source="id" />
           <TextField source="clasificacion" />
           <TextField source="tipoDeIncidencia" />
           <DateField source="fechaDeCreacion" />
          <FunctionField
            label="Action"
            render={(record) => (
              <button onClick={() => handleFinish(record.id)}>Finish</button>
            )}
          />
        </Datagrid>
      )}
    </List>
  );
};

//   return (
//     <List {...props}>
//       {isFinished ? (
//         <SimpleForm
//           onSubmit={(data) => handleUpdate(data, id)} 
//         >
//           <TextInput label="Resolution Details" source="resolutionDetails" />
//           <NumberInput label="Resolution Time (days)" source="resolutionTime" />
//           <TextInput label="Feedback" source="feedback" />
//           <SelectInput label="Satisfaction" source="satisfaction" choices={[
//             { id: 'satisfied', name: 'Satisfied' },
//             { id: 'neutral', name: 'Neutral' },
//             { id: 'unsatisfied', name: 'Unsatisfied' },
//           ]} />
//         </SimpleForm>
//       ) : (
//         <Datagrid>
//           <TextField source="id" />
//           <TextField source="clasificacion" />
//           <TextField source="tipoDeIncidencia" />
//           <DateField source="fechaDeCreacion" />
//           <FunctionField
//             label="Action"
//             render={(record) => (
//               <button onClick={() => handleFinish(record.id)}>Finish</button>
//             )}
//           />
//         </Datagrid>
//       )}
//     </List>
//   );
// };
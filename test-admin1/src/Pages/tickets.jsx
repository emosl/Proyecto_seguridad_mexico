import React, { useState, useEffect } from "react";
import {
  Create,
  Filter,
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
  BooleanInput,
  TextField,
  DateField,
  FunctionField,
  Edit,
  useRecordContext,
  EditButton,
} from "react-admin";
import { useDataProvider } from "react-admin";
import { CheckboxGroupInput } from 'react-admin';
import { dataProvider } from "../Providers/dataProvider";
import { Grid, Card, CardContent, makeStyles } from '@material-ui/core';


const serviceOptions = {
  Servicios: ["Agua", "Luz", "Teléfono", "Basura", "Limpieza del Aula"],
  Digital: [
    "Internet, Servidores y Equipos",
    "Software",
    "Hardware",
    "Cámaras de seguridad",
    "Soporte técnico presencial y remoto",
  ],
  Infraestructura: [
    "Paredes",
    "Techo",
    "Ventanas",
    "Puertas",
    "Aulas en general",
  ],
  "Recursos humanos": [
    "Permisos",
    "Asistencias",
    "Salud",
    "Trámites",
    "Honorarios",
  ],
  Beneficiarios: [
    "Asistencias",
    "Documentación",
    "Apoyo académico",
    "Salud",
    "Seguridad, bulling",
  ],
  Mobiliario: [
    "Sillas, butacas",
    "Escritorios",
    "Pizarrones",
    "Cafetería",
    "Etantes, archiveros",
  ],
  Seguridad: ["Delincuencia", "Robos", "Bandalismo", "Imagen institucional"],
  Materiales: ["Educativos", "Papelería", "Limpieza"],
  "Fenómeno meteorológico": ["Inundaciones", "Incendios", "Sismos"],
};

export const TicketsCreate = () => {
  const [classification, setClassification] = useState("");
  const [services, setServices] = useState([]);
  const [status, setStatus] = useState("pending");
  const [userId, setUserId] = useState(localStorage.getItem("auth: id"));
  const [satisfaction, setSatisfaction] = useState("");
  const notify = useNotify();
  const refresh = useRefresh();
  const redirect = useRedirect();

  useEffect(() => {
    setServices(serviceOptions[classification] || []);
  }, [classification]);

  const onSuccess = () => {
    notify("Ticket created successfully");
    redirect("/tickets");
    refresh();
  };

  return (
    <Create onSuccess={onSuccess}>
      <SimpleForm>
        <DateInput source="fechaDeCreacion" defaultValue={new Date()} />
        <SelectInput
          source="clasificacion"
          choices={Object.keys(serviceOptions).map((key) => ({
            id: key,
            name: key,
          }))}
          onChange={(e) => setClassification(e.target.value)}
        />
        {classification && (
          <SelectInput
            source="tipoDeIncidencia"
            choices={services.map((service) => ({
              id: service,
              name: service,
            }))}
          />
        )}
        <SelectInput
          source="nivelDePrioridad"
          choices={[
            { id: "alto", name: "Alto" },
            { id: "bajo", name: "Bajo" },
            { id: "intermedio", name: "Intermedio" },
          ]}
        />
        <TextInput source="descripcion" multiline rows={5}/>
      </SimpleForm>
    </Create>
  );
};

const TicketFilter = (props) => (
  <Filter {...props}>
    <BooleanInput label="Show Finished" source="finished" alwaysOn />
  </Filter>
);

export const TicketsList = () => {
  return (
    <List  filters={<TicketFilter />}>
         <Datagrid>
          <TextField source="id" />
          <TextField source="clasificacion" />
          <TextField source="tipoDeIncidencia" />
          <DateField source="fechaDeCreacion" />
          <EditButton/>
        </Datagrid>
    </List>
  );
};
// export const TicketsList = (props) => {
//   console.log("props", props.ids)
//   return (
//     <List {...props}>
//       <Grid container spacing={3}>
//         {props.ids && props.ids.length > 0 ? (
//           props.ids.map(id => (
//             <Grid item xs={12} md={6} lg={4} key={id}>
//               <Card>
//                 <CardContent>
//                   <TextField record={props.data[id]} source="id" />
//                   <TextField record={props.data[id]} source="clasificacion" />
//                   <TextField record={props.data[id]} source="tipoDeIncidencia" />
//                   <DateField record={props.data[id]} source="fechaDeCreacion" />
//                   <EditButton basePath="/tickets" record={props.data[id]} />
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))
//         ) : (
//           <div>No tickets found.</div>
//         )}
//       </Grid>
//     </List>
//   );
// };




const PostTitle = () => {
  const record = useRecordContext();
  return <span>Post {record ? `"${record.id}"` : ''}</span>;
};


export const TicketsEdit = () => (
  <Edit>
    <SimpleForm warnWhenUnsavedChanges>
      <TextInput label="Qué, cómo y si no se
resolvió ¿por qué?" source="detalles" />
      <NumberInput label="Tiempo de Resolución (días)" source="tiempoResolucion" />
      <NumberInput label="Número de intermediarios" source="numIntermediarios" />
      <DateInput source="fechaDeResolucion" defaultValue={new Date()} />
      <BooleanInput label="Finished" source="finished" />
    </SimpleForm>
  </Edit>
);
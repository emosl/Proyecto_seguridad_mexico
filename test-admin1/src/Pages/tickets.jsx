import React, { useState, useEffect } from "react";
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
  useRecordContext,
  EditButton,
} from "react-admin";
import { useDataProvider } from "react-admin";
import { dataProvider } from "../Providers/dataProvider";

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

export const TicketsList = (props) => {
  const [isFinished, setIsFinished] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const notify = useNotify();
  const refresh = useRefresh();
  const dataProvider = useDataProvider();
  const auth = localStorage.getItem("auth");
  console.log(auth);
  console.log("props", props);

  const handleFinish = (id) => {
    console.log("finish id:", id);
    dataProvider
      .update("tickets", { id, data: { status: "finished" } })
      .then(() => {
        notify("Ticket marked as finished");
        setIsFinished(true);
        refresh();
      })
      .catch((error) => {
        console.error("Error:", error);
        notify("Error: could not mark the ticket as finished", "warning");
      });
  };

  const handleUpdate = (data, id) => {
    console.log("update id:", id);
    dataProvider
      .update("tickets", { id, data: { ...data } })
      .then(() => {
        notify("Ticket updated successfully");
        setIsFinished(false);
        refresh();
      })
      .catch((error) => {
        console.error("Error:", error);
        notify("Error: could not update the ticket", "warning");
      });
  };

  return (
    <List>
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

const PostTitle = () => {
  const record = useRecordContext();
  return <span>Post {record ? `"${record.id}"` : ''}</span>;
};

// const postFilters = [
//     <TextInput key="search" source="q" label="Search" alwaysOn />,
//     <ReferenceInput key="user" source="userId" label="User" reference="Users" />,
// ];


export const TicketsEdit = () => (
  <Edit>
    <SimpleForm warnWhenUnsavedChanges>
      <TextInput label="Resolution Details" source="resolutionDetails" />
      <NumberInput label="Resolution Time (days)" source="resolutionTime" />
      <TextInput label="Feedback" source="feedback" />
      <SelectInput
        label="Satisfaction"
        source="satisfaction"
        choices={[
          { id: "satisfied", name: "Satisfied" },
          { id: "neutral", name: "Neutral" },
          { id: "unsatisfied", name: "Unsatisfied" },
        ]}
      />
    </SimpleForm>
  </Edit>
);

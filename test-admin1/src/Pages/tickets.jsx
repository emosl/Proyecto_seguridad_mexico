import React, { useState, useEffect, useRef } from "react";
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
  SearchInput,
} from "react-admin";
import { useDataProvider } from "react-admin";
import { useListContext } from "react-admin";
import { ListContextProvider } from "react-admin";
import { CheckboxGroupInput } from "react-admin";
import { dataProvider } from "../Providers/dataProvider";
import "./tickets.css";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

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
  const [aula, setAula] = useState("");
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
          source="aula"
          choices={[
            { id: "privada", name: "Privada" },
            { id: "publica", name: "Pública" },
          ]}
          onChange={(e) => setAula(e.target.value)}
        />
        {aula === "publica" && (
          <TextInput source="oficio" label="Número de Oficio" />
        )}
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
        <TextInput source="descripcion" multiline rows={5} />
      </SimpleForm>
    </Create>
  );
};

const PostTitle = () => {
  const record = useRecordContext();
  return <span>Post {record ? `"${record.id}"` : ""}</span>;
};

export const TicketsEdit = () => (
  <Edit>
    <SimpleForm warnWhenUnsavedChanges>
      <TextInput
        label="Qué, cómo y si no se
resolvió ¿por qué?"
        source="detalles"
        multiline rows={5}
      />
      <NumberInput
        label="Tiempo de Resolución (días)"
        source="tiempoResolucion"
      />
      <NumberInput
        label="Número de intermediarios"
        source="numIntermediarios"
      />
      <DateInput source="fechaDeResolucion" defaultValue={new Date()} />
      <BooleanInput label="Finished" source="finished" />
    </SimpleForm>
  </Edit>
);

export const TicketsList = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const dataProvider = useDataProvider();
  const [filters, setFilters] = useState({ id: "", clasificacion: "" });

  useEffect(() => {
    dataProvider
      .getList("tickets", {
        pagination: { page: 1, perPage: 10 },
        sort: { field: "id", order: "ASC" },
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [dataProvider]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredData = Object.values(data).filter((item) => {
    const idFilter = filters.id
      ? item.id.toString().includes(filters.id)
      : true;
    const clasificacionFilter = filters.clasificacion
      ? item.clasificacion.includes(filters.clasificacion)
      : true;
      const finishedFilter = filters.finished !== undefined
      ? item.finished === filters.finished
      : true;
    console.log("finishedFilter", finishedFilter);
    return idFilter && clasificacionFilter && finishedFilter;
  });

  const TicketFilters = [
    <SearchInput
      source="id"
      value={filters.id}
      onChange={(e) => handleFilterChange("id", e.target.value)}
    />,
    <TextInput
      source="clasificacion"
      label="Clasificacion"
      value={filters.clasificacion}
      onChange={(e) => handleFilterChange("clasificacion", e.target.value)}
    />,
    <BooleanInput
      source="finished"
      label="Terminado"
      value={Boolean(filters.finished)}
      onChange={(e) => handleFilterChange("finished", e.target.value)}
    />,
  ];

  if (loading) return <div>Loading...</div>;

  return (
    <ListContextProvider
  value={{ data: filteredData, ids: filteredData.map((item) => item.id) }}
>
  <List filters={TicketFilters}>
    <div className="cards-container" style={{ display: 'flex', flexWrap: 'wrap', padding: '10px' }}>
      {filteredData.map((item) => (
        <Box sx={{
          minWidth: 275,
          height: 'auto', // Change height to 'auto'
          width: '250px',
          marginRight: '16px',
          marginBottom: '16px',
          display: 'flex', // Add display: flex
          flexDirection: 'column', // Add flexDirection: column
        }}>
          <Card
            key={item.id}
            sx={{ height: "100%" }}
            variant="outlined"
          >
            <React.Fragment>
              <CardContent>
                <Typography
                  sx={{ fontSize: 22 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Id : {item ? `${item.id}` : ""}
                </Typography>
                <Typography variant="h5" component="div">
                  Clasificación : {item ? `${item.clasificacion}` : ""}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Tipo de Incidencia :{" "}
                  {item ? `${item.tipoDeIncidencia}` : ""}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  <DateField
                    label="Fecha de Creación"
                    source="fechaDeCreacion"
                    record={item}
                  />
                </Typography>
              </CardContent>
              <CardActions>
                <EditButton basePath="/tickets" record={item} />
              </CardActions>
            </React.Fragment>
          </Card>
        </Box>
      ))}
    </div>
  </List>
</ListContextProvider>

  );
};

// <div className="cards-container">
// {filteredData.map((item) => (
//   <Card key={item.id} sx={{ minWidth: 275, margin: "16px" }}>
//     <CardContent>
//       <Typography
//         sx={{ fontSize: 22 }}
//         color="text.primary"
//         gutterBottom
//       >
//         <TextField label="ID" source="id" record={item}/>
//       </Typography>
//       <Typography variant="h5" component="div">
//         <TextField
//           label="Clasificación"
//           source="clasificacion"
//           record={item}
//         />
//       </Typography>
//       <TextField
//         label="Tipo de Incidencia"
//         source="tipoDeIncidencia"
//         record={item}
//       />
//       <Typography sx={{ mb: 1.5 }} color="text.secondary">
//       <DateField
//         label="Fecha de Creación"
//         source="fechaDeCreacion"
//         record={item}
//       />
//       </Typography>
//     </CardContent>
//     <EditButton basePath="/tickets" record={item} />
//   </Card>
// ))}
// </div>

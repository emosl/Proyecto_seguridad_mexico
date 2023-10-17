//imports from react-admin, material UI and other components
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
// import "./tickets.css";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";


//declarations of ServiceOptions
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

//Declarations of TicketsCreate, TicketsEdit and TicketsList

//Tickets Create to create a new ticket
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

  //useEffect to set the services according to the classification
  useEffect(() => {
    setServices(serviceOptions[classification] || []);
  }, [classification]);

  //onSuccess function to notify the user that the ticket was created successfully
  const onSuccess = () => {
    notify("Ticket created successfully");
    redirect("/tickets");
    refresh();
  };

  //return of the Create component
  return (
    <Create onSuccess={onSuccess}>
      <SimpleForm>
        <BooleanInput source="finished" defaultValue={false} disabled />
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
        <TextInput source="Número de Aula" />
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

//PostTittle component to show the title of the ticket
const PostTitle = () => {
  const record = useRecordContext();
  return <span>Post {record ? `"${record.id}"` : ""}</span>;
};


//Edit the Tickets with the SimpleForm
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

//TicketList to show the tickets
//using the List component
export const TicketsList = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const dataProvider = useDataProvider();
  const [filters, setFilters] = useState({ id: "", clasificacion: "", finished: false });

  //useEffect to get the data from the dataProvider
  useEffect(() => {
    console.log("filters data P", filters)
    dataProvider
      .getList("tickets", {
        pagination: { page: 1, perPage: 1000 },
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

  //handleFilterChange function to handle the filters and set the filters
  const handleFilterChange = (key, value) => {
    console.log("key", key)
    console.log("value", value)
    setFilters((prev) => ({ ...prev, [key]: value }));
    console.log("filters", filters)
  };

  //filteredData is the data tha will be mapped to show the tickets
  //uses filters from the state
  const filteredData = Object.values(data).filter((item) => {
    console.log("item",item)
    console.log("filters", filters)
    const idFilter = filters.id
      ? item.id.toString().includes(filters.id)
      : true;
    const clasificacionFilter = filters.clasificacion
      ? item.clasificacion.includes(filters.clasificacion)
      : true;
    const finishedFilter = filters.finished ? item.finished == true : true;
    console.log("finishedFilter", finishedFilter);
    return idFilter && clasificacionFilter && finishedFilter;
  });

  //Ticket Filters to be used in the List component
  //uses the handleFilterChange function
  const TicketFilters = [
    <TextInput
      alwaysOn
      source="id"
      label="ID"
      value={filters.id}
      onChange={(e) => handleFilterChange("id", e.target.value)}
      onClick={(e) => handleFilterChange("id", "")}
      // onHide={(e) => handleFilterChange("id", "")}
      
    />,
    <TextInput
      alwaysOn
      source="clasificacion"
      label="Clasificacion"
      value={filters.clasificacion}
      onChange={(e) => handleFilterChange("clasificacion", e.target.value)}
      onClick={(e) => handleFilterChange("clasificacion", "")}
    />,
    <BooleanInput
      alwaysOn
      source="finished"
      label="Terminado"
      value={filters.finished}
      onChange={(e) => handleFilterChange("finished", e.target.checked)}
      onClick={(e) => handleFilterChange("finished", "")}
    />,
  ];

  if (loading) return <div>Loading...</div>;

  return (

  <List filters={TicketFilters} disableSaveQuery>
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

  );
};


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
  const [ids, setIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [filters, setFilters] = useState({});
  const dataProvider = useDataProvider();
  const [clasificacion, setClasificacion] = useState("");
  // const [filteredData, setFilteredData] = useState([]);
  const [orderedData, setOrderedData] = useState({});
  const storedData = useRef({});

  const TicketFilters = [
    <SearchInput source="id" />,
    <TextInput source="clasificacion" label="Clasificacion" />,
  ];


  useEffect(() => {
    dataProvider
      .getList("tickets", {
        pagination: { page: 1, perPage: 10 },
        sort: { field: "id", order: "ASC" },
      })
      .then((response) => {
        const transformedData = response.data.reduce((acc, cur) => {
          acc[cur.id] = cur;
          return acc;
        }, {});

        // Store the data in the ref
        storedData.current = transformedData;

        // Update the state to trigger a re-render if needed
        setData(transformedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [dataProvider]);

  // Apply filters from TicketFilters
  const filteredData = Object.keys(data).filter((id) => {
    const record = data[id];
    const idFilter = TicketFilters[0].props.record
      ? record.id.toString().includes(TicketFilters[0].props.record)
      : true;
    const clasificacionFilter = TicketFilters[1].props.record
      ? record.clasificacion.includes(TicketFilters[1].props.record)
      : true;
    
    // return TicketFilters.finished ? data[id].finished : true;

    return idFilter && clasificacionFilter;
  });
 

  
  // const bull = (
  //   <Box
  //     component="span"
  //     sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  //   >
  //     •
  //   </Box>
  // );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }


  return (
    <ListContextProvider value={{ data, ids }}>
      <List filters={TicketFilters}>
        <Datagrid>
          <TextField label="ID" source="id" />
          <TextField label="Clasificación" source="clasificacion" />
          <TextField label="Tipo de Incidencia" source="tipoDeIncidencia" />
          <DateField label="Fecha de Creación" source="fechaDeCreacion" />
          <EditButton basePath="/tickets" />
        </Datagrid>
      </List>
    </ListContextProvider>
  );
};

{/* <div className="cards-container">
{filteredData.map((id) => (
  <Card key={id} sx={{ minWidth: 275, margin: "16px" }}>
    <CardContent>
      <Typography
        sx={{ fontSize: 22 }}
        color="text.primary"
        gutterBottom
      >
        <TextField label="ID" source="id" record={data[id]} />
      </Typography>
      <Typography variant="h5" component="div">
        <TextField
          label="Clasificación"
          source="clasificacion"
          record={data[id]}
        />
      </Typography>

      <TextField
        label="Tipo de Incidencia"
        source="tipoDeIncidencia"
        record={data[id]}
      />
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
      <DateField
        label="Fecha de Creación"
        source="fechaDeCreacion"
        record={data[id]}
      />
      </Typography>
    </CardContent>
    <EditButton basePath="/tickets" record={data[id]} />
  </Card>
))}
</div> */}
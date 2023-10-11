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
import { useListContext } from 'react-admin';
import { ListContextProvider } from 'react-admin';
import { CheckboxGroupInput } from 'react-admin';
import { dataProvider } from "../Providers/dataProvider";
import "./tickets.css"


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
        {aula === "publica" && <TextInput source="oficio" label="Número de Oficio" />}
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

export const TicketsList = () => {
  const [data, setData] = useState({});
  const [ids, setIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [filters, setFilters] = useState({});
  const dataProvider = useDataProvider();
  const [clasificacion, setClasificacion] = useState('');


  useEffect(() => {
    console.log("Filters:", filters);
      dataProvider.getList('tickets', {
          pagination: { page: 1, perPage: 10 },
          sort: { field: 'id', order: 'ASC' },
          filter: filters,
      })
      .then(response => {
  
          const transformedData = response.data.reduce((acc, cur) => {
              acc[cur.id] = cur;
              return acc;
          }, {});
          console.log('Transformed Data:', transformedData);
          console.log('Ids:', Object.keys(transformedData).map(Number));
          setData(transformedData);
          setIds(Object.keys(transformedData).map(Number));
          setLoading(false);
      })
      .catch(error => {
          console.error('Error fetching data:', error);
          setError(error);
          setLoading(false);
      });
  }, [dataProvider, filters, clasificacion]);

  const handleFilterClick = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClassificationChange = (e) => {
    const newClassification = e.target.value;
    console.log("Selected Classification:", newClassification);
    setClasificacion(newClassification);
    setFilters({ ...filters, clasificacion: newClassification });
  };
  


  if (loading) {
      return <div>Loading...</div>;
  }

  if (error) {
      return <div>Error loading data</div>;
  }

  
  console.log("Los ids: ", ids);

  return (
    <ListContextProvider value={{ data, ids }}>
     
        <List>
          <div>
            <div className="dropdowns">
            <select
             value={clasificacion}  
             onChange={handleClassificationChange}
          >
            <option value="">Select Classification</option>
            {Object.keys(serviceOptions).map((classification) => (
              <option key={classification} value={classification}>
                {classification}
              </option>
            ))}
          </select>
            </div>
          </div>
        <div className="buttons">
      <button className="ticket-button" onClick={() => handleFilterClick({ finished: true })}>
        Tickets Terminados
      </button>
      <button className="ticket-button" onClick={() => handleFilterClick({ finished: false })}>
        Tickets Sin Terminar
      </button>
      <button className="ticket-button" onClick={() => handleFilterClick({})}>Clear Filters</button>
      </div>
          <div className="grid-container">
              {ids.map(id => (
                  <div key={id} className="grid-item">
                      <div className="id">ID: <TextField record={data[id]} source="id" /></div>
                      <div className="clasificacion">Clasificación: <TextField record={data[id]} source="clasificacion" /></div>
                      <div className="incidencia">Tipo de Incidencia: <TextField record={data[id]} source="tipoDeIncidencia" /></div>
                      <div className="fecha">Fecha de Creación: <DateField record={data[id]} source="fechaDeCreacion" /></div>
                      <div className="edit"><EditButton basePath={'/tickets'} record={data[id]} /></div>
                  </div>
              ))}
          </div>
        </List>
    </ListContextProvider>
);
};

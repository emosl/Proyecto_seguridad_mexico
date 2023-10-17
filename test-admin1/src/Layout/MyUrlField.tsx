//Equipo 1: Emilia Salazar, Ian Holender, Fernanda Osorio, Rafael Blanga, Martin Palomares
//Octubre 2023
//Integración de seguridad informática en redes y sistemas de software 
// in src/MyUrlField.tsx

//imports from react-admin, materia ui 
import { useRecordContext } from "react-admin";
import { Link } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";

// MyUrlField component for the admin page
const MyUrlField = ({ source }: { source: string }) => {
    const record = useRecordContext();
    return record ? (

        <Link 
        id = "link"
        href={record[source]} sx={{ textDecoration: "none" }}>

            {record[source]}
            <LaunchIcon sx={{ fontSize: 15, ml: 1 }} />
        </Link>
    ) : null;
};

export default MyUrlField;
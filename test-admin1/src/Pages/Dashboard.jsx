//Equipo 1: Emilia Salazar, Ian Holender, Fernanda Osorio, Rafael Blanga, Martin Palomares
//Octubre 2023
//Integración de seguridad informática en redes y sistemas de software 

//imports from react and chart.js
import React, { useEffect, useState } from "react";
import { DashboardEjecutivo, DashboardNacional, DashboardCoolaborador} from "./Chart";

//declarations of the component Dashboard
export const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState("");

  //useEffect to get the user role from the local storage
  useEffect(() => {
    const role = localStorage.getItem('userRole');
    console.log("dashboard role: ", role);
    setUserRole(role);
    setLoading(false);
  }, []);  

  //return depending on the user role
  return (
    <div>
      {userRole === 'ejecutivo' && (
        <div>
          <DashboardEjecutivo />
        </div>
      )}
      {userRole === 'nacional' &&(
        <div>
          <DashboardNacional />
        </div>
      )}
      { userRole === 'coolaborador' && (
        <div>
          <DashboardCoolaborador />
        </div>
      )}
    </div>
  );
};

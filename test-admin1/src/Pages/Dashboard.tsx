import React, { useEffect, useState } from "react";
import { DashboardEjecutivo, DashboardNacional} from "./Chart";


export const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    console.log("dashboard role: ", role);
    setUserRole(role);
    setLoading(false);
  }, []);  


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
    </div>
  );
};

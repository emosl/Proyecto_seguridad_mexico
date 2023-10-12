import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import {GraficaNivelPrioridad,GraficaClasificacion, GraficaTerminados , GraficaIntermediarios, GraficaPromedioDias} from "./Chart";

export const Dashboard = () => {
  return (
    <div
      className="cards-container"
      style={{ display: "flex", flexWrap: "wrap", padding: "20px" }}
    >
      <Card>
        <CardHeader/>
        <CardContent>
          <GraficaNivelPrioridad />
        </CardContent>
      </Card>
      <Card>
        <CardHeader/>
        <CardContent>
          <GraficaClasificacion />
        </CardContent>
      </Card>
      <Card>
        <CardHeader/>
        <CardContent>
          <GraficaTerminados />
        </CardContent>
      </Card>
      <Card>
        <CardHeader/>
        <CardContent>
          <GraficaIntermediarios/>
        </CardContent>
      </Card>
      <Card>
        <CardHeader/>
        <CardContent>
          <GraficaPromedioDias/>
        </CardContent>
      </Card>
    </div>
  );
};

import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import MyPieChart, { MyBarChart } from "./PieChart"; // Adjust the path as per your project structure

export const Dashboard = () => {
  return (
    <div
      className="cards-container"
      style={{ display: "flex", flexWrap: "wrap", padding: "20px" }}
    >
      <Card>
        <CardHeader title="Categorias" />
        <CardContent>
          <Typography sx={{ fontSize: 22 }} color="text.secondary" gutterBottom>
            Lorem ipsum sic dolor amet...
          </Typography>
          <MyPieChart />
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="Top usuarios" />
        <CardContent>
        <Typography sx={{ fontSize: 22 }} color="text.secondary" gutterBottom>
            Lorem ipsum sic dolor amet...
          </Typography>
          <MyBarChart />
        </CardContent>
      </Card>
    </div>
  );
};

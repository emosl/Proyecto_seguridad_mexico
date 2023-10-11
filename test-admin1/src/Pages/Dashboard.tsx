import { Card, CardContent, CardHeader } from "@mui/material";
import MyPieChart from './PieChart'; // Adjust the path as per your project structure

export const Dashboard = () => (
    <Card>
        <CardHeader title="Welcome to the administration" />
        <CardContent>
            Lorem ipsum sic dolor amet...
            <MyPieChart />
        </CardContent>
    </Card>
);

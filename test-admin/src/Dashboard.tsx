import { Card, CardContent, CardHeader } from "@mui/material";
import { useLogin } from "react-admin";

export const Dashboard = () => {
    const login = useLogin() //Mnadar usuario y contraseña


    return(
    <Card>
    <CardHeader title="Welcome to the administration" />
    <CardContent>Lorem ipsum sic dolor amet...</CardContent>

    </Card>)

}
    
    

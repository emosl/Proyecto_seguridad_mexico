import React from "react";
import "./Dashboard.css";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNotify, useRefresh, useRedirect } from "react-admin";
import { TicketsCreate } from "./tickets";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const DashboardEjecutivo = () => {
  const notify = useNotify();
  const refresh = useRefresh();
  const redirect = useRedirect();

  const onSuccess = () => {
    notify("Moviendo a Tickets");
    redirect("/tickets");
    refresh();
  };
  return (
    <Box>
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Bienvenid@ a tu dashboard
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          Aqui puedes encontrar métricas sobre tus tickets y los de tu equipo.
          También puedes observar todos los tickets de tu equipo.
        </Typography>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
          padding={5}
        >
          <Button variant="contained" onClick={onSuccess}>
            {" "}
            Ver Tickets
          </Button>
        </Stack>
      </Container>
      <Container style={{ height: "90vh" }}>
        <iframe
          className="colab"
          src="https://charts.mongodb.com/charts-project-0-dfuas/embed/dashboards?id=6528323b-5356-4526-8c1d-a97e56ce969b&theme=light&autoRefresh=true&maxDataAge=1209600&showTitleAndDesc=false&scalingWidth=fixed&scalingHeight=fixed"          style={{
            background: "#F1F5F4",
            border: "none",
            borderRadius: "2px",
            boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
            width: "100%",
            height: "100%",
          }}
          title="Nacional"
        ></iframe>
      </Container>
    </Box>
  );
};



// src="https://charts.mongodb.com/charts-project-0-dfuas/embed/dashboards?id=6528323b-5356-4526-8c1d-a97e56ce969b&theme=light&autoRefresh=true&maxDataAge=1209600&showTitleAndDesc=false&scalingWidth=scale&scalingHeight=scale"

const DashboardNacional = () => {
  const notify = useNotify();
  const refresh = useRefresh();
  const redirect = useRedirect();

  const onSuccess = () => {
    notify("Moviendo a Tickets");
    redirect("/tickets");
    refresh();
  };
  return (
    <Box>
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Bienvenid@ a tu dashboard
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          Aqui puedes encontrar métricas sobre tus tickets y los de tu equipo.
          También puedes observar todos los tickets de tu equipo.
        </Typography>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
          padding={5}
        >
          <Button variant="contained" onClick={onSuccess}>
            {" "}
            Ver Tickets
          </Button>
        </Stack>
      </Container>
      <Container style={{ height: "90vh" }}>
        <iframe
          className="colab"
          src="https://charts.mongodb.com/charts-project-0-dfuas/embed/dashboards?id=1c2a1f7f-6978-4323-b7dc-049da6945f81&theme=light&autoRefresh=true&maxDataAge=1209600&showTitleAndDesc=false&scalingWidth=scale&scalingHeight=scale"
          style={{
            background: "#F1F5F4",
            border: "none",
            borderRadius: "2px",
            boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
            width: "100%",
            height: "100%",
          }}
          title="Nacional"
        ></iframe>
      </Container>
    </Box>
  );
};


const DashboardCoolaborador = () => {
  const notify = useNotify();
  const refresh = useRefresh();
  const redirect = useRedirect();

  const onSuccess = () => {
    notify("Moviendo a Tickets");
    redirect("/tickets");
    refresh();
  };

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pt: 8,
        pb: 6,
      }}
    >
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Bienvenido a tu dashboard
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          Aqui puedes encontrar tus tickets y crear nuevos de manera sencilla.
        </Typography>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Button variant="contained" onClick={onSuccess}>
            {" "}
            Ver Tickets
          </Button>
          <Button
            variant="contained"
            onClick={() => redirect("/tickets/create")}
          >
            Crear Ticket
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export { DashboardCoolaborador };

export { DashboardEjecutivo };

export { DashboardNacional };

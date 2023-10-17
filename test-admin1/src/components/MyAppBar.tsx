//Equipo 1: Emilia Salazar, Ian Holender, Fernanda Osorio, Rafael Blanga, Martin Palomares
//Octubre 2023
//Integración de seguridad informática en redes y sistemas de software 

//imports from react, react-admin
// in src/MyAppBar.tsx
import * as React from 'react';
import { AppBar, ToggleThemeButton } from 'react-admin';

export const MyAppBar: React.FC = () => (
    <AppBar toolbar={<ToggleThemeButton />} />
    
);




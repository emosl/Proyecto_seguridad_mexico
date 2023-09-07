// in src/MyAppBar.tsx
import * as React from 'react';
import { AppBar, ToggleThemeButton } from 'react-admin';

export const MyAppBar: React.FC = () => (
    <AppBar toolbar={<ToggleThemeButton />} />
);



import * as React from 'react';
import { forwardRef } from 'react';
import { AppBar, Layout, UserMenu, useLogout } from 'react-admin';
import { MenuItem } from '@mui/material';
import ExitIcon from '@mui/icons-material/PowerSettingsNew';

// It's important to pass the ref to allow Material UI to manage the keyboard navigation
const MyLogoutButton = forwardRef((props, ref) => {
    const logout = useLogout();
    const handleClick = () => logout();
    return (
        <MenuItem
            onClick={handleClick}
            // ref={ref}
            // // It's important to pass the props to allow Material UI to manage the keyboard navigation
            // {...props}
        >
            <ExitIcon /> Logout
        </MenuItem>
    );
});

const MyUserMenu: React.FC = () => (
    <UserMenu>
        <MyLogoutButton />
    </UserMenu>
);

const MyAppBar: React.FC = () => <AppBar userMenu={<UserMenu />} />;

const MyLayout: React.FC = (props) => (
    <Layout {...props} appBar={MyAppBar} />
);

export default MyLayout;

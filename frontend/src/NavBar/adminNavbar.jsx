import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Logo from '../assets/Logo/1.png';

// Icons
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import LoginTwoToneIcon from '@mui/icons-material/LoginTwoTone';
import LogoutIcon from '@mui/icons-material/Logout';
import MeetingRoomTwoToneIcon from '@mui/icons-material/MeetingRoomTwoTone';

const drawerWidth = 240;
const navItems = [
    { label: 'Dashbaord', path: '/admin' },
    { label: 'Add User', path: '/adduser' },
    { label: 'Settings', path: '/contact' }
];

function DrawerAppBar(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.label} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }} component={Link} to={item.path}>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                <Button
                    variant="outlined"
                    startIcon={<AddTwoToneIcon />}
                    sx={{
                        textTransform: 'none',
                        border: 'solid 2px #02824f',
                        color: '#02824f',
                        transition: '0.7s',
                        '&:hover': {
                            border: 'solid 2px #748E63',
                            color: '#748E63',
                            transition: '0.7s',
                        },
                    }}
                >
                    Create
                </Button>
                <Button
                    variant="outlined"
                    color="inherit"
                    startIcon={<LoginTwoToneIcon />}
                    sx={{
                        textTransform: 'none',
                        backgroundColor: '#02824f',
                        transition: '0.7s',
                        color: '#F6FBF4',
                        '&:hover': {
                            backgroundColor: '#388E3C',
                            color: '#ffffff',
                            transition: '0.7s',
                        },
                    }}
                >
                    Login
                </Button>
            </Box>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                component="nav"
                elevation={0}
                sx={{
                    bgcolor: '#F6FBF4',
                    color: '#252525',
                }}
            >
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/* Hamburger menu for small screens */}
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* Logo and Navigation Links */}
                    <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', flexGrow: 1 }}>
                        {/* Logo */}
                        <img src={Logo} alt="Logo" style={{ height: '100px' }} />

                        {/* Centered Navigation Links */}
                        <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
                            {navItems.map((item) => (
                                <Button
                                    key={item.label}
                                    component={Link}
                                    to={item.path}
                                    sx={{
                                        color: '#252525',
                                        textTransform: 'none',
                                        fontSize: '15px',
                                        fontFamily: 'sans-serif',
                                        fontWeight: '500',
                                    }}
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </Box>
                    </Box>

                    {/* Logo for small screens */}
                    <Box sx={{ display: { xs: 'flex', sm: 'none' }, flexGrow: 1, justifyContent: 'flex-end' }}>
                        <img src={Logo} alt="Logo" style={{ height: '50px' }} />
                    </Box>

                    {/* Create and Login Buttons for Desktop */}
                    <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
                        <Button
                            variant="outlined"
                            color="inherit"
                            component={Link}
                            to={"/dashboard"}
                            startIcon={<MeetingRoomTwoToneIcon />}
                            sx={{
                                textTransform: 'none',
                                backgroundColor: '#f1f1f1',
                                transition: '0.7s',
                                color: '#388E3C',
                                '&:hover': {
                                    backgroundColor: '#388E3C',
                                    color: '#ffffff',
                                    transition: '0.7s',
                                },
                            }}
                        >
                            Go to student login
                        </Button>
                        <Button
                            variant="outlined"
                            color="inherit"
                            component={Link}
                            to={"/login"}
                            startIcon={<LogoutIcon />}
                            sx={{
                                textTransform: 'none',
                                backgroundColor: '#02824f',
                                transition: '0.7s',
                                color: '#F6FBF4',
                                '&:hover': {
                                    backgroundColor: '#388E3C',
                                    color: '#ffffff',
                                    transition: '0.7s',
                                },
                            }}
                        >
                            Logout
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Drawer for Mobile */}
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
        </Box>
    );
}

DrawerAppBar.propTypes = {
    window: PropTypes.func,
};

export default DrawerAppBar;

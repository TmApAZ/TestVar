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
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import TuneTwoToneIcon from '@mui/icons-material/TuneTwoTone';
import LoginTwoToneIcon from '@mui/icons-material/LoginTwoTone';

// Logo
import Logo from '../assets/Logo/1.png';
import { Link } from 'react-router-dom';

const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

function DrawerAppBar(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                MUI
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider sx={{ my: 2 }} />
            {/* Add Create and Login buttons inside the Drawer for small screens */}
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
                        <img src={Logo} alt="Logo" style={{
                            height: '100px'
                        }} />

                        {/* Navigation Links */}
                        <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                            {navItems.map((item) => (
                                <Button key={item} sx={{ color: '#252525', textTransform: 'none', fontSize: '15px', fontFamily:'sans-serif', fontWeight:'500' }}>
                                    {item}
                                </Button>
                            ))}
                        </Box>
                    </Box>


                    {/* Search Bar and Logo: Hidden on small screens */}
                    <Box
                        sx={{
                            display: { xs: 'none', sm: 'flex' },
                            alignItems: 'center',
                            flexGrow: 1,
                        }}
                    >
                        {/* Search Bar */}
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: 'flex',
                                justifyContent: 'center',
                                mr: 20,
                            }}
                        >
                            <TextField
                                variant="outlined"
                                size="small"
                                placeholder="Search..."
                                sx={{
                                    bgcolor: '#F6FBF4',
                                    width: '100%',
                                    maxWidth: '450px',
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '40px', // Rounded corners
                                        border: 'solid 2px #02824f', // Custom border
                                        '& fieldset': {
                                            border: 'none', // Removes default fieldset border
                                        },
                                        '&:hover fieldset': {
                                            border: 'none', // Ensures no border on hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            border: 'none', // Removes border on focus as well
                                        },
                                    },
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon sx={{ color: '#02824f' }} />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                sx={{
                                                    border: '1.5px solid #02824f',
                                                    padding: '3px',
                                                    borderRadius: '8px',
                                                }}
                                            >
                                                <TuneTwoToneIcon
                                                    sx={{
                                                        color: '#02824f',
                                                    }}
                                                />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>
                    </Box>

                    {/* Logo and Drawer for small screens */}
                    <Box
                        sx={{
                            display: { xs: 'flex', sm: 'none' },
                            flexGrow: 1,
                            justifyContent: 'flex-end',
                        }}
                    >
                        <img
                            src={Logo}
                            alt="Logo"
                            style={{
                                height: '50px', // Smaller logo for small screens
                            }}
                        />
                    </Box>

                    {/* Create and Login Buttons for Desktop */}
                    <Box
                        sx={{
                            display: { xs: 'none', sm: 'flex' },
                            gap: 1,
                        }}
                    >
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
                            component={Link}
                            to={"/login"}
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
                        keepMounted: true, // Better open performance on mobile.
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
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default DrawerAppBar;

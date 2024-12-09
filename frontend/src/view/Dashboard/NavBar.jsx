import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import { Link, useNavigate } from 'react-router-dom';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Collapse from '@mui/material/Collapse';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';

import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import InputBase from '@mui/material/InputBase';

import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';

import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';

import Logo from '../../assets/Logo/1.png';
import SpeedIcon from '@mui/icons-material/Speed';

import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import SettingsIcon from '@mui/icons-material/Settings';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SellIcon from '@mui/icons-material/Sell';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

// API
import API from "../../api/api";

const drawerWidth = 240;


// Drawer styles
const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                marginLeft: drawerWidth,
                width: `calc(100% - ${drawerWidth}px)`,
                transition: theme.transitions.create(['width', 'margin'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    ...openedMixin(theme),
                    '& .MuiDrawer-paper': openedMixin(theme),
                },
            },
            {
                props: ({ open }) => !open,
                style: {
                    ...closedMixin(theme),
                    '& .MuiDrawer-paper': closedMixin(theme),
                },
            },
        ],
    })
);

const menuItems = [
    {
        text: 'Admin Dashboard',
        icon: <SpeedIcon />,
        path: '/admindashbaord'
    },
    {
        text: 'Inventory Manager Dashbaord',
        icon: <SpeedIcon />,
        path: '/inendashbaord'
    },
    {
        text: 'Staff Dashbaord',
        icon: <SpeedIcon />,
        path: '/staffdashbaord'
    },
    {
        text: 'packer Dashbaord',
        icon: <SpeedIcon />,
        path: '/packdashbaord'
    },
    {
        text: 'User Management',
        icon: <PeopleAltIcon />,
        path: '/user'
    },
    {
        text: 'Product Management',
        icon: <SellIcon />,
        path: '/productlist'
    },
    {
        text: 'Suppliers',
        icon: <LocalShippingIcon />,
        path: '/supplierlist'
    }
];

export default function MiniDrawer() {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);
    const [productDropdownOpen, setProductDropdownOpen] = useState(false);


    const [filterAnchorEl, setFilterAnchorEl] = useState(null);
    const isFilterMenuOpen = Boolean(filterAnchorEl);

    // Handlers for filter menu
    const handleFilterClick = (event) => {
        setFilterAnchorEl(event.currentTarget);
    };

    const handleFilterClose = () => {
        setFilterAnchorEl(null);
    };
    // Handlers for drawer
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    // Handlers for Product Management dropdown
    const toggleProductDropdown = () => {
        setProductDropdownOpen(!productDropdownOpen);
    };

    // Handlers for Avatar menu
    const handleAvatarClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // Greeting message
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const { data } = await API.get("/user", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(data);
            } catch (err) {
                console.error(err);
                alert("Session expired, please log in again.");
                navigate("/login");
            }
        };

        fetchUser();
    }, [navigate]);

    if (!user) return <h2>Loading...</h2>;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} elevation={1} sx={{ height: '70px', backgroundColor: '#F6FBF4', color: '#000000' }}>
                <Toolbar sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={[
                                {
                                    marginRight: 5,
                                },
                                open && { display: 'none' },
                            ]}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                            <img src={Logo} alt="LOGO" style={{ height: '130px', objectFit: 'contain' }} />
                        </Box>
                    </Box>

                    {/* Search Bar */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: '#F6FBF4',
                            borderRadius: '12px',
                            padding: '4px 8px',
                            width: '40%',
                            boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
                            border: 'solid 1px #388E3C',
                        }}
                    >
                        <SearchIcon sx={{ color: '#388E3C', marginRight: '8px' }} />
                        <InputBase
                            placeholder="Search"
                            sx={{
                                flex: 1,
                                fontSize: '16px',
                                color: '#333',
                            }}
                        />
                        <IconButton onClick={handleFilterClick} sx={{
                            border: '1px solid #388E3C', // Light grey border
                            backgroundColor: '#F6FBF4',  // Light background
                            '&:hover': {
                                backgroundColor: '#f1f1f1',
                                color: '#5cacfa',
                                border: 'solid 1px #388E3C',
                                transition: '0.7s',
                            },
                            width: '38px',
                            transition: '0.7s',
                            height: '38px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '10px', // Rounded corners
                        }}
                            color="primary">
                            <TuneOutlinedIcon sx={{ color: '#388E3C' }} />
                        </IconButton>
                    </Box>

                    <Menu
                        anchorEl={filterAnchorEl}
                        open={isFilterMenuOpen}
                        onClose={handleFilterClose}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    >
                        <MenuItem onClick={handleFilterClose}>Filter Option 1</MenuItem>
                        <MenuItem onClick={handleFilterClose}>Filter Option 2</MenuItem>
                        <MenuItem onClick={handleFilterClose}>Filter Option 3</MenuItem>
                    </Menu>

                    {/* Notification Icon and Avatar Menu */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Tooltip title="Notifications">
                            <IconButton
                                sx={{
                                    mr: 2,
                                    border: '1px solid #388E3C', // Light grey border
                                    backgroundColor: '#F6FBF4',  // Light background
                                    '&:hover': {
                                        backgroundColor: '#f1f1f1',
                                        color: '#5cacfa',
                                        border: 'solid 1px #5cacfa',
                                        transition: '0.7s',
                                    },
                                    width: '38px',
                                    transition: '0.7s',
                                    height: '38px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '10px', // Rounded corners
                                }}
                            >
                                <NotificationsOutlinedIcon sx={{ fontSize: '24px', color:'#388E3C' }} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Account settings">
                            <IconButton
                                onClick={handleAvatarClick}
                                size="small"
                                sx={{ ml: 2 }}
                                aria-controls={openMenu ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={openMenu ? 'true' : undefined}
                            >
                                <Avatar
                                    src="https://upload.wikimedia.org/wikipedia/commons/1/11/Dwayne_%22The_Rock%22_Johnson_Visits_the_Pentagon_%2841%29_%28cropped%29.jpg"
                                    sx={{ width: 40, height: 40 }}
                                ></Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
            anchorEl={anchorEl}
            id="avatar-menu"
            open={openMenu}
            onClose={handleMenuClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            PaperProps={{
                sx: {
                    width: 250, // Adjusted width
                    height: "auto", // Flexible height
                    padding: 1,
                    borderRadius: 2, // Rounded corners
                },
            }}
        >
            <MenuItem onClick={handleMenuClose} sx={{ gap: 2 }}>
                <Typography>
                Welcome, {user.fullName}
                </Typography>
            </MenuItem>
            <Divider/>
            <MenuItem onClick={handleMenuClose} sx={{ gap: 2 }}>
                <Avatar
                    src="https://upload.wikimedia.org/wikipedia/commons/1/11/Dwayne_%22The_Rock%22_Johnson_Visits_the_Pentagon_%2841%29_%28cropped%29.jpg"
                    sx={{ width: 35, height: 35 }}
                />
                Profile
            </MenuItem>
            <MenuItem onClick={handleMenuClose} sx={{ gap: 2 }}>
                <Avatar
                    src="https://upload.wikimedia.org/wikipedia/commons/1/11/Dwayne_%22The_Rock%22_Johnson_Visits_the_Pentagon_%2841%29_%28cropped%29.jpg"
                    sx={{ width: 35, height: 35 }}
                />
                My account
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleMenuClose} sx={{ gap: 2 }}>
                <ListItemIcon sx={{ minWidth: "unset" }}>
                    <SettingsIcon fontSize="small" />
                </ListItemIcon>
                Settings
            </MenuItem>
            <MenuItem
                onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/login");
                }}
                sx={{ gap: 2 }}
            >
                <ListItemIcon sx={{ minWidth: "unset" }}>
                    <MeetingRoomIcon fontSize="small" />
                </ListItemIcon>
                Logout
            </MenuItem>
        </Menu>
                        {/* 


            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={openMenu}
              onClose={handleMenuClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
              <MenuItem onClick={handleMenuClose} component={Link} to="/">
                Logout
              </MenuItem>
            </Menu> */}
                    </Box>
                </Toolbar>
            </AppBar>

            <Drawer
                variant="permanent"
                open={open}
                sx={{
                    '& .MuiDrawer-paper': {
                        backgroundColor: '#00712D',
                        color: '#F6FBF4',
                    },
                }}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose} sx={{ color: '#ffffff' }}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <MenuOpenIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider sx={{ backgroundColor: '#ffffff' }} />
                <List>
                    {menuItems.map((item, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemButton component={Link} to={item.path}>
                                <ListItemIcon sx={{ color: '#ffffff' }}>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} sx={{ color: '#ffffff' }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <Box sx={{ marginBottom: 2 }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
}

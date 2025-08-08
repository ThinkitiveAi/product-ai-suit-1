import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  useTheme,
  useMediaQuery,
  Divider,
  Tooltip,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard,
  People,
  Event,
  Schedule,
  Medication,
  Science,
  Receipt,
  Message,
  Settings,
  AccountCircle,
  Notifications,
  Search,
  Logout,
  Help,
  Person,
  LocalHospital,
  Description,
  Payment,
  Forum,
} from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext";

interface DashboardLayoutProps {
  userType: "patient" | "provider";
}

const drawerWidth = 240;

const patientMenuItems = [
  { text: "Dashboard", icon: <Dashboard />, path: "/patient-portal/dashboard" },
  {
    text: "Appointments",
    icon: <Event />,
    path: "/patient-portal/appointments",
  },
  {
    text: "Medical Records",
    icon: <Description />,
    path: "/patient-portal/medical-records",
  },
  {
    text: "Prescriptions",
    icon: <Medication />,
    path: "/patient-portal/prescriptions",
  },
  {
    text: "Lab Results",
    icon: <Science />,
    path: "/patient-portal/lab-results",
  },
  { text: "Billing", icon: <Payment />, path: "/patient-portal/billing" },
  { text: "Messages", icon: <Forum />, path: "/patient-portal/messages" },
  { text: "Profile", icon: <Person />, path: "/patient-portal/profile" },
];

const providerMenuItems = [
  {
    text: "Dashboard",
    icon: <Dashboard />,
    path: "/provider-portal/dashboard",
  },
  { text: "Patients", icon: <People />, path: "/provider-portal/patients" },
  {
    text: "Appointments",
    icon: <Event />,
    path: "/provider-portal/appointments",
  },
  { text: "Schedule", icon: <Schedule />, path: "/provider-portal/schedule" },
  {
    text: "Prescriptions",
    icon: <Medication />,
    path: "/provider-portal/prescriptions",
  },
  {
    text: "Lab Orders",
    icon: <Science />,
    path: "/provider-portal/lab-orders",
  },
  { text: "Billing", icon: <Receipt />, path: "/provider-portal/billing" },
  { text: "Messages", icon: <Message />, path: "/provider-portal/messages" },
  { text: "Settings", icon: <Settings />, path: "/provider-portal/settings" },
];

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ userType }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchorEl, setNotificationAnchorEl] =
    useState<null | HTMLElement>(null);

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems =
    userType === "patient" ? patientMenuItems : providerMenuItems;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleLogout = async () => {
    handleUserMenuClose();
    await logout();
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const drawer = (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
          borderBottom: 1,
          borderColor: "divider",
        }}>
        <LocalHospital sx={{ fontSize: 32, color: "primary.main", mr: 1 }} />
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
          EHR System
        </Typography>
      </Box>
      <Divider />
      <List sx={{ pt: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                selected={isActive}
                sx={{
                  mx: 1,
                  borderRadius: 1,
                  "&.Mui-selected": {
                    backgroundColor: "primary.light",
                    color: "primary.contrastText",
                    "&:hover": {
                      backgroundColor: "primary.main",
                    },
                  },
                }}>
                <ListItemIcon
                  sx={{
                    color: isActive ? "primary.contrastText" : "inherit",
                  }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          zIndex: theme.zIndex.drawer + 1,
        }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}>
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {userType === "patient" ? "Patient Portal" : "Provider Portal"}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* Search */}
            <Tooltip title="Search">
              <IconButton color="inherit">
                <Search />
              </IconButton>
            </Tooltip>

            {/* Notifications */}
            <Tooltip title="Notifications">
              <IconButton color="inherit" onClick={handleNotificationMenuOpen}>
                <Badge badgeContent={3} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
            </Tooltip>

            {/* User Menu */}
            <Tooltip title="User Menu">
              <IconButton
                color="inherit"
                onClick={handleUserMenuOpen}
                sx={{ ml: 1 }}>
                <Avatar
                  sx={{ width: 32, height: 32, bgcolor: "secondary.main" }}>
                  {user?.firstName?.charAt(0) || "U"}
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationAnchorEl}
        open={Boolean(notificationAnchorEl)}
        onClose={handleNotificationMenuClose}
        PaperProps={{
          sx: { width: 320, maxHeight: 400 },
        }}>
        <MenuItem>
          <Typography variant="body2">New lab results available</Typography>
        </MenuItem>
        <MenuItem>
          <Typography variant="body2">
            Appointment reminder for tomorrow
          </Typography>
        </MenuItem>
        <MenuItem>
          <Typography variant="body2">Prescription refill approved</Typography>
        </MenuItem>
      </Menu>

      {/* User Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleUserMenuClose}
        PaperProps={{
          sx: { width: 200 },
        }}>
        <MenuItem onClick={() => navigate(`/${userType}-portal/profile`)}>
          <ListItemIcon>
            <AccountCircle fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Help fontSize="small" />
          </ListItemIcon>
          Help
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      {/* Sidebar */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}>
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open>
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
        }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;

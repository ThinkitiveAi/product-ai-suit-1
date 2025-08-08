import React, { useState } from "react";
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
  InputBase,
  alpha,
  styled,
  useTheme,
  useMediaQuery,
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
  Person,
  Notifications,
  Search,
  Logout,
  Help,
  LocalHospital,
  Description,
  Assessment,
  Payment,
  AccountCircle,
} from "@mui/icons-material";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { logout } from "../../store/slices/authSlice";

// Styled components
const SearchBox = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const drawerWidth = 240;

interface DashboardLayoutProps {
  role: "patient" | "provider";
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ role }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);
  const notifications = useSelector(
    (state: RootState) => state.auth.notifications || []
  );

  // Navigation items based on role
  const navigationItems =
    role === "patient"
      ? [
          {
            text: "Dashboard",
            icon: <Dashboard />,
            path: "/patient-portal/dashboard",
          },
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
          {
            text: "Billing",
            icon: <Payment />,
            path: "/patient-portal/billing",
          },
          {
            text: "Messages",
            icon: <Message />,
            path: "/patient-portal/messages",
          },
          {
            text: "Profile",
            icon: <Person />,
            path: "/patient-portal/profile",
          },
        ]
      : [
          {
            text: "Dashboard",
            icon: <Dashboard />,
            path: "/provider-portal/dashboard",
          },
          {
            text: "Patients",
            icon: <People />,
            path: "/provider-portal/patients",
          },
          {
            text: "Appointments",
            icon: <Event />,
            path: "/provider-portal/appointments",
          },
          {
            text: "Schedule",
            icon: <Schedule />,
            path: "/provider-portal/schedule",
          },
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
          {
            text: "Billing",
            icon: <Receipt />,
            path: "/provider-portal/billing",
          },
          {
            text: "Messages",
            icon: <Message />,
            path: "/provider-portal/messages",
          },
          {
            text: "Settings",
            icon: <Settings />,
            path: "/provider-portal/settings",
          },
        ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const drawer = (
    <Box>
      <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 1 }}>
        <LocalHospital sx={{ color: "primary.main", fontSize: 32 }} />
        <Typography variant="h6" noWrap component="div">
          EHR System
        </Typography>
      </Box>
      <List>
        {navigationItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleNavigation(item.path)}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "primary.light",
                  "&:hover": {
                    backgroundColor: "primary.light",
                  },
                },
              }}>
              <ListItemIcon
                sx={{
                  color:
                    location.pathname === item.path
                      ? "primary.main"
                      : "inherit",
                }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
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

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 0, mr: 3 }}>
            {role === "patient" ? "Patient Portal" : "Provider Portal"}
          </Typography>

          <SearchBox>
            <SearchIconWrapper>
              <Search />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search..."
              inputProps={{ "aria-label": "search" }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchBox>

          <Box sx={{ flexGrow: 1 }} />

          <IconButton color="inherit">
            <Badge badgeContent={notifications.length} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          <IconButton
            color="inherit"
            onClick={handleUserMenuOpen}
            sx={{ ml: 1 }}>
            <Avatar sx={{ width: 32, height: 32 }}>
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} />
              ) : (
                <AccountCircle />
              )}
            </Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* User Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleUserMenuClose}
        onClick={handleUserMenuClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
        <MenuItem onClick={() => navigate(`/${role}-portal/profile`)}>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={() => navigate(`/${role}-portal/settings`)}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Help fontSize="small" />
          </ListItemIcon>
          Help
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      {/* Side Drawer */}
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

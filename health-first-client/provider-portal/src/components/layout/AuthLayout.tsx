import React from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { LocalHospital } from "@mui/icons-material";

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title = "Welcome to EHR System",
  subtitle = "Secure healthcare management platform",
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}>
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 4,
          }}>
          <LocalHospital
            sx={{
              fontSize: 64,
              color: "white",
              mb: 2,
            }}
          />
          <Typography
            variant="h3"
            component="h1"
            sx={{
              color: "white",
              textAlign: "center",
              fontWeight: 600,
              mb: 1,
              fontSize: isMobile ? "2rem" : "3rem",
            }}>
            {title}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "white",
              textAlign: "center",
              opacity: 0.9,
              fontSize: isMobile ? "1rem" : "1.25rem",
            }}>
            {subtitle}
          </Typography>
        </Box>

        <Paper
          elevation={8}
          sx={{
            p: isMobile ? 3 : 4,
            borderRadius: 3,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
          }}>
          {children}
        </Paper>

        <Box
          sx={{
            mt: 4,
            textAlign: "center",
          }}>
          <Typography
            variant="body2"
            sx={{
              color: "white",
              opacity: 0.8,
            }}>
            © 2024 EHR System. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default AuthLayout;

import React from "react";
import { Box, Container, Paper, Typography } from "@mui/material";
import { LocalHospital } from "@mui/icons-material";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}>
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 4,
          }}>
          <LocalHospital sx={{ fontSize: 64, color: "white", mb: 2 }} />
          <Typography
            variant="h3"
            component="h1"
            sx={{
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
              mb: 1,
            }}>
            EHR System
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "white",
              opacity: 0.9,
              textAlign: "center",
            }}>
            Secure Healthcare Management
          </Typography>
        </Box>

        <Paper
          elevation={8}
          sx={{
            p: 4,
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

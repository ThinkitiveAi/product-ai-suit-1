import {
  Box,
  useTheme
} from "@mui/material";
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        minHeight: "100svh",
        minWidth: "100svw",
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        display: "flex",
        // alignItems: "center",
        // justifyContent: "center",
        // p: 2,
      }}>
      {/* <Container maxWidth="sm">
        <Paper
          elevation={8}
          sx={{
            p: isMobile ? 3 : 4,
            borderRadius: 3,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            width: "100svw",
            height: "100svh",
          }}> */}

      <Box
        sx={{
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}>
        {children}
      </Box>
      {/* </Paper> */}

      {/* <Box
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
        </Box> */}
      {/* </Container> */}
    </Box>
  );
};

export default AuthLayout;

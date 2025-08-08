import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Link,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff, Favorite } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/store";
import { loginUser } from "../../store/slices/authSlice";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data: LoginFormData) => {
    dispatch(loginUser(data)).then((result) => {
      if (loginUser.fulfilled.match(result)) {
        const user = result.payload.user;
        navigate(
          user.role === "patient"
            ? "/patient-portal/dashboard"
            : "/provider-portal/dashboard"
        );
      }
    });
  };

  const handleDemoLogin = (role: "patient" | "provider") => {
    const demoData = {
      username: role === "patient" ? "demo_patient" : "demo_provider",
      email: role === "patient" ? "patient@demo.com" : "provider@demo.com",
      password: "demo123",
    };

    setValue("username", demoData.username);
    setValue("email", demoData.email);
    setValue("password", demoData.password);

    dispatch(loginUser(demoData)).then((result) => {
      if (loginUser.fulfilled.match(result)) {
        const user = result.payload.user;
        navigate(
          user.role === "patient"
            ? "/patient-portal/dashboard"
            : "/provider-portal/dashboard"
        );
      }
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}>
      {/* Left Side - Login Form */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 4,
          backgroundColor: "white",
        }}>
        <Box sx={{ width: "100%", maxWidth: 400 }}>
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
            <Favorite sx={{ color: "#1976d2", fontSize: 32, mr: 1 }} />
            <Typography
              variant="h4"
              sx={{ color: "#1976d2", fontWeight: "bold" }}>
              eCarehealth
            </Typography>
          </Box>

          {/* Welcome Text */}
          <Typography
            variant="h4"
            sx={{ color: "#1976d2", fontWeight: "bold", mb: 1 }}>
            Hey, good to see you
          </Typography>
          <Typography variant="h6" sx={{ color: "#1976d2", mb: 4 }}>
            Let's Sign in you
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register("username")}
              fullWidth
              label="Username"
              variant="outlined"
              defaultValue="dev_mt"
              error={!!errors.username}
              helperText={errors.username?.message}
              sx={{ mb: 3 }}
            />

            <TextField
              {...register("email")}
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              defaultValue="rajkumar.rathod+mt@medarch.com"
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{ mb: 3 }}
            />

            <TextField
              {...register("password")}
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              defaultValue="••••••••"
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    sx={{ color: "#1976d2" }}
                  />
                }
                label="Remember Me"
              />
              <Link href="#" sx={{ color: "#1976d2", textDecoration: "none" }}>
                Forgot Password?
              </Link>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading || !isValid}
              sx={{
                py: 1.5,
                backgroundColor: "#1976d2",
                "&:hover": {
                  backgroundColor: "#1565c0",
                },
              }}>
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Let's get Started"
              )}
            </Button>
          </form>

          {/* Demo Login Buttons */}
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Or try with demo credentials:
            </Typography>
            <Box
              sx={{ display: "flex", gap: 2, justifyContent: "center", mb: 3 }}>
              <Button
                variant="outlined"
                onClick={() => handleDemoLogin("patient")}
                disabled={isLoading}
                sx={{ borderColor: "#1976d2", color: "#1976d2" }}>
                Demo Patient
              </Button>
              <Button
                variant="outlined"
                onClick={() => handleDemoLogin("provider")}
                disabled={isLoading}
                sx={{ borderColor: "#1976d2", color: "#1976d2" }}>
                Demo Provider
              </Button>
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Healthcare providers can use our comprehensive sign-in form:
            </Typography>
            <Button
              variant="text"
              onClick={() => navigate("/provider-signin")}
              sx={{ color: "#1976d2", textDecoration: "underline" }}>
              Provider Sign-In Form
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Right Side - Image */}
      <Box
        sx={{
          flex: 1,
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
        {/* Overlay with quote */}
        <Box
          sx={{
            position: "absolute",
            bottom: 60,
            left: 40,
            right: 40,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            color: "white",
            p: 3,
            borderRadius: 2,
          }}>
          <Typography variant="h6" sx={{ mb: 1, fontStyle: "italic" }}>
            "Time and health are two precious assets that we don't recognize and
            appreciate until they have been depleted"
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Marietta Kaufman
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Proton HealthCare • Obstetrics and Gynecology
          </Typography>
        </Box>

        {/* Carousel dots */}
        <Box
          sx={{
            position: "absolute",
            bottom: 20,
            right: 40,
            display: "flex",
            gap: 1,
          }}>
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "white",
              opacity: 1,
            }}
          />
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "white",
              opacity: 0.5,
            }}
          />
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "white",
              opacity: 0.5,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Login;

import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
  CircularProgress,
  Divider,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Person,
} from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "patient" as "patient" | "provider",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { login, isLoading, error } = useAuth();

  const handleInputChange =
    (field: string) =>
    (event: React.ChangeEvent<HTMLInputElement | { value: unknown }>) => {
      setFormData({
        ...formData,
        [field]: event.target.value,
      });
      // Clear error when user starts typing
      if (errors[field]) {
        setErrors({
          ...errors,
          [field]: "",
        });
      }
    };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await login(formData.email, formData.password);
    } catch (error) {
      // Error is handled by the auth context
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
      <Typography variant="h4" component="h2" gutterBottom align="center">
        Welcome Back
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        align="center"
        sx={{ mb: 3 }}>
        Sign in to access your healthcare portal
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Role</InputLabel>
        <Select
          value={formData.role}
          label="Role"
          onChange={handleInputChange("role")}
          startAdornment={
            <InputAdornment position="start">
              <Person />
            </InputAdornment>
          }>
          <MenuItem value="patient">Patient</MenuItem>
          <MenuItem value="provider">Healthcare Provider</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Email Address"
        type="email"
        value={formData.email}
        onChange={handleInputChange("email")}
        error={!!errors.email}
        helperText={errors.email}
        margin="normal"
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Email />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        fullWidth
        label="Password"
        type={showPassword ? "text" : "password"}
        value={formData.password}
        onChange={handleInputChange("password")}
        error={!!errors.password}
        helperText={errors.password}
        margin="normal"
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleTogglePasswordVisibility}
                edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        disabled={isLoading}
        sx={{ mt: 3, mb: 2, py: 1.5 }}>
        {isLoading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
      </Button>

      <Divider sx={{ my: 2 }}>
        <Typography variant="body2" color="text.secondary">
          OR
        </Typography>
      </Divider>

      <Box sx={{ textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          Don't have an account?{" "}
          <Link component={RouterLink} to="/register" variant="body2">
            Sign up here
          </Link>
        </Typography>
      </Box>

      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Link href="#" variant="body2" color="text.secondary">
          Forgot your password?
        </Link>
      </Box>

      {/* Demo credentials */}
      <Box sx={{ mt: 3, p: 2, bgcolor: "grey.50", borderRadius: 1 }}>
        <Typography variant="caption" color="text.secondary">
          <strong>Demo Credentials:</strong>
          <br />
          Patient: patient@demo.com / password123
          <br />
          Provider: provider@demo.com / password123
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;

import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
  SelectChangeEvent,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
  Avatar,
  Divider,
  Tabs,
  Tab,
  FormControlLabel,
  Switch,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Favorite,
  Info,
  CameraAlt,
  Close,
  Person,
  Business,
  Badge,
  School,
  Phone,
  Email,
  LocationOn,
  Language,
  Schedule,
} from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/store";
import { loginUser } from "../../store/slices/authSlice";

const providerSignInSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    providerType: z.string().min(1, "Provider type is required"),
    specialties: z
      .array(z.string())
      .min(1, "At least one specialty is required"),
    role: z.string().min(1, "Role is required"),
    dob: z.string().min(1, "Date of birth is required"),
    gender: z.string().min(1, "Gender is required"),
    npiNumber: z.string().min(1, "NPI number is required"),
    contactNumber: z.string().min(1, "Contact number is required"),
    officeFaxNumber: z.string().optional(),
    insuranceAccepted: z.string().optional(),
    groupNpiNumber: z.string().optional(),
    email: z.string().email("Invalid email address"),
    workLocations: z.array(z.string()).optional(),
    taxonomyNumber: z.string().optional(),
    timeZone: z.string().min(1, "Time zone is required"),
    languagesSpoken: z.string().optional(),
    bio: z.string().optional(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ProviderSignInFormData = z.infer<typeof providerSignInSchema>;

const providerTypes = [
  "MD",
  "DO",
  "NP",
  "PA",
  "RN",
  "LPN",
  "PharmD",
  "DDS",
  "DMD",
];
const specialties = [
  "Cardiology",
  "Dermatology",
  "Endocrinology",
  "Gastroenterology",
  "Hematology",
  "Infectious Disease",
  "Nephrology",
  "Neurology",
  "Oncology",
  "Ophthalmology",
  "Orthopedics",
  "Otolaryngology",
  "Psychiatry",
  "Pulmonology",
  "Radiology",
  "Rheumatology",
  "Urology",
  "Obstetrics and Gynecology",
  "Pediatrics",
  "Family Medicine",
  "Internal Medicine",
  "Emergency Medicine",
  "Anesthesiology",
  "Pathology",
  "Surgery",
];
const timeZones = [
  "Eastern Standard Time (UTC -5)",
  "Central Standard Time (UTC -6)",
  "Mountain Standard Time (UTC -7)",
  "Pacific Standard Time (UTC -8)",
  "Alaska Standard Time (UTC -9)",
  "Hawaii Standard Time (UTC -10)",
  "Indian Standard Time (UTC +5:30)",
  "Greenwich Mean Time (UTC +0)",
  "Central European Time (UTC +1)",
  "Eastern European Time (UTC +2)",
];

const ProviderSignIn: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([
    "Urology",
  ]);
  const [selectedWorkLocations, setSelectedWorkLocations] = useState<string[]>([
    "aa",
  ]);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm<ProviderSignInFormData>({
    resolver: zodResolver(providerSignInSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "Rajkumar",
      lastName: "Rathod",
      providerType: "MD",
      role: "Provider",
      dob: "08-01-2024",
      gender: "Male",
      npiNumber: "1376269530",
      contactNumber: "(978) 987-8976",
      officeFaxNumber: "98789878989",
      groupNpiNumber: "1376269530",
      email: "rajkumar.rathod+mt@medarch.com",
      taxonomyNumber: "207N25623Y",
      timeZone: "Indian Standard Time (UTC +5:30)",
      specialties: ["Urology"],
      workLocations: ["aa"],
    },
  });

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSpecialtyChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[];
    setSelectedSpecialties(value);
    setValue("specialties", value);
  };

  const handleWorkLocationChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[];
    setSelectedWorkLocations(value);
    setValue("workLocations", value);
  };

  const handleDeleteSpecialty = (specialtyToDelete: string) => {
    const newSpecialties = selectedSpecialties.filter(
      (specialty) => specialty !== specialtyToDelete
    );
    setSelectedSpecialties(newSpecialties);
    setValue("specialties", newSpecialties);
  };

  const handleDeleteWorkLocation = (locationToDelete: string) => {
    const newLocations = selectedWorkLocations.filter(
      (location) => location !== locationToDelete
    );
    setSelectedWorkLocations(newLocations);
    setValue("workLocations", newLocations);
  };

  const onSubmit = (data: ProviderSignInFormData) => {
    // Create a user object with provider role
    const userData = {
      ...data,
      role: "provider" as const,
    };

    dispatch(loginUser(userData)).then((result) => {
      if (loginUser.fulfilled.match(result)) {
        navigate("/provider-portal/dashboard");
      }
    });
  };

  const handleDemoLogin = () => {
    const demoData = {
      username: "demo_provider",
      email: "provider@demo.com",
      password: "demo123",
    };

    dispatch(loginUser(demoData)).then((result) => {
      if (loginUser.fulfilled.match(result)) {
        navigate("/provider-portal/dashboard");
      }
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        p: 2,
      }}>
      <Box
        sx={{
          width: "100%",
          maxWidth: 1200,
          mx: "auto",
          display: "flex",
          gap: 3,
        }}>
        {/* Left Sidebar - Profile View */}
        <Paper
          sx={{
            width: 300,
            p: 3,
            backgroundColor: "#f5f5f5",
            borderRadius: 2,
            height: "fit-content",
          }}>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            sx={{ mb: 3 }}>
            <Tab label="Profile" />
            <Tab label="Notification" />
          </Tabs>

          {activeTab === 0 && (
            <Box>
              <Box sx={{ textAlign: "center", mb: 3 }}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    mx: "auto",
                    mb: 2,
                    backgroundColor: "grey.400",
                  }}>
                  <Person sx={{ fontSize: 40 }} />
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Rajkumar Rathod
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mt: 1,
                  }}>
                  <Typography variant="body2" color="text.secondary">
                    Multispecialty
                  </Typography>
                  <Info
                    sx={{ fontSize: 16, ml: 0.5, color: "text.secondary" }}
                  />
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ space: 2 }}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    Role
                  </Typography>
                  <Typography variant="body2">Provider</Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    Provider Type
                  </Typography>
                  <Typography variant="body2">MD</Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    Gender
                  </Typography>
                  <Typography variant="body2">Male</Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    Contact Number
                  </Typography>
                  <Typography variant="body2">(978) 987-8976</Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body2">
                    rajkumar.rathod+mt@medarch.com
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    NPI Number
                  </Typography>
                  <Typography variant="body2">1376269530</Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    Bio
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    (empty)
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    Login URL
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="body2" sx={{ mr: 1 }}>
                      Copy URL
                    </Typography>
                    <IconButton size="small">
                      <Business />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}

          {activeTab === 1 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Notifications
              </Typography>
              <Typography variant="body2" color="text.secondary">
                No notifications at this time.
              </Typography>
            </Box>
          )}
        </Paper>

        {/* Right Side - Edit Profile Form */}
        <Paper
          sx={{
            flex: 1,
            p: 4,
            borderRadius: 2,
            maxHeight: "90vh",
            overflow: "auto",
          }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Provider Sign In
            </Typography>
            <IconButton>
              <Close />
            </IconButton>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              {/* Basic Information */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="First Name*"
                      error={!!errors.firstName}
                      helperText={errors.firstName?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Last Name*"
                      error={!!errors.lastName}
                      helperText={errors.lastName?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="providerType"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.providerType}>
                      <InputLabel>Provider Type</InputLabel>
                      <Select {...field} label="Provider Type">
                        {providerTypes.map((type) => (
                          <MenuItem key={type} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.providerType && (
                        <Typography variant="caption" color="error">
                          {errors.providerType.message}
                        </Typography>
                      )}
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="specialties"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.specialties}>
                      <InputLabel>Specialties</InputLabel>
                      <Select
                        multiple
                        value={selectedSpecialties}
                        onChange={handleSpecialtyChange}
                        input={<OutlinedInput label="Specialties" />}
                        renderValue={(selected) => (
                          <Box
                            sx={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: 0.5,
                            }}>
                            {selected.map((value) => (
                              <Chip
                                key={value}
                                label={value}
                                onDelete={() => handleDeleteSpecialty(value)}
                                size="small"
                              />
                            ))}
                          </Box>
                        )}>
                        {specialties.map((specialty) => (
                          <MenuItem key={specialty} value={specialty}>
                            {specialty}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.specialties && (
                        <Typography variant="caption" color="error">
                          {errors.specialties.message}
                        </Typography>
                      )}
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.role}>
                      <InputLabel>Role*</InputLabel>
                      <Select {...field} label="Role*">
                        <MenuItem value="Provider">Provider</MenuItem>
                        <MenuItem value="Admin">Admin</MenuItem>
                        <MenuItem value="Staff">Staff</MenuItem>
                      </Select>
                      {errors.role && (
                        <Typography variant="caption" color="error">
                          {errors.role.message}
                        </Typography>
                      )}
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="dob"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="DOB"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      error={!!errors.dob}
                      helperText={errors.dob?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.gender}>
                      <InputLabel>Gender*</InputLabel>
                      <Select {...field} label="Gender*">
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </Select>
                      {errors.gender && (
                        <Typography variant="caption" color="error">
                          {errors.gender.message}
                        </Typography>
                      )}
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="npiNumber"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="NPI Number"
                      error={!!errors.npiNumber}
                      helperText={errors.npiNumber?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="contactNumber"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Contact Number"
                      error={!!errors.contactNumber}
                      helperText={errors.contactNumber?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="officeFaxNumber"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Office Fax Number"
                      error={!!errors.officeFaxNumber}
                      helperText={errors.officeFaxNumber?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="insuranceAccepted"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Insurance(s) Accepted</InputLabel>
                      <Select {...field} label="Insurance(s) Accepted">
                        <MenuItem value="">Select</MenuItem>
                        <MenuItem value="medicare">Medicare</MenuItem>
                        <MenuItem value="medicaid">Medicaid</MenuItem>
                        <MenuItem value="bluecross">
                          Blue Cross Blue Shield
                        </MenuItem>
                        <MenuItem value="aetna">Aetna</MenuItem>
                        <MenuItem value="cigna">Cigna</MenuItem>
                        <MenuItem value="unitedhealth">UnitedHealth</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="groupNpiNumber"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Group NPI Number"
                      error={!!errors.groupNpiNumber}
                      helperText={errors.groupNpiNumber?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Email*"
                      type="email"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="workLocations"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Work Locations</InputLabel>
                      <Select
                        multiple
                        value={selectedWorkLocations}
                        onChange={handleWorkLocationChange}
                        input={<OutlinedInput label="Work Locations" />}
                        renderValue={(selected) => (
                          <Box
                            sx={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: 0.5,
                            }}>
                            {selected.map((value) => (
                              <Chip
                                key={value}
                                label={value}
                                onDelete={() => handleDeleteWorkLocation(value)}
                                size="small"
                              />
                            ))}
                          </Box>
                        )}>
                        <MenuItem value="aa">Main Office</MenuItem>
                        <MenuItem value="bb">Branch Office</MenuItem>
                        <MenuItem value="cc">Satellite Location</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="taxonomyNumber"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Taxonomy Number"
                      error={!!errors.taxonomyNumber}
                      helperText={errors.taxonomyNumber?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="timeZone"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.timeZone}>
                      <InputLabel>Time Zone</InputLabel>
                      <Select {...field} label="Time Zone">
                        {timeZones.map((tz) => (
                          <MenuItem key={tz} value={tz}>
                            {tz}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.timeZone && (
                        <Typography variant="caption" color="error">
                          {errors.timeZone.message}
                        </Typography>
                      )}
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="languagesSpoken"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Languages Spoken</InputLabel>
                      <Select {...field} label="Languages Spoken">
                        <MenuItem value="">Select</MenuItem>
                        <MenuItem value="english">English</MenuItem>
                        <MenuItem value="spanish">Spanish</MenuItem>
                        <MenuItem value="french">French</MenuItem>
                        <MenuItem value="german">German</MenuItem>
                        <MenuItem value="chinese">Chinese</MenuItem>
                        <MenuItem value="hindi">Hindi</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>

              {/* Profile Photo */}
              <Grid item xs={12}>
                <Box
                  sx={{
                    border: "2px dashed #ccc",
                    borderRadius: 2,
                    p: 4,
                    textAlign: "center",
                    cursor: "pointer",
                    "&:hover": {
                      borderColor: "primary.main",
                    },
                  }}>
                  <CameraAlt
                    sx={{ fontSize: 48, color: "text.secondary", mb: 2 }}
                  />
                  <Typography variant="h6" color="text.secondary">
                    Upload Profile Photo
                  </Typography>
                </Box>
              </Grid>

              {/* Provider Bio */}
              <Grid item xs={12}>
                <Controller
                  name="bio"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Provider Bio"
                      multiline
                      rows={4}
                      placeholder="Enter Bio"
                      error={!!errors.bio}
                      helperText={errors.bio?.message}
                    />
                  )}
                />
              </Grid>

              {/* Password Fields */}
              <Grid item xs={12} sm={6}>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Password*"
                      type={showPassword ? "text" : "password"}
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleTogglePasswordVisibility}>
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Confirm Password*"
                      type={showConfirmPassword ? "text" : "password"}
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword?.message}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleToggleConfirmPasswordVisibility}>
                              {showConfirmPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading || !isValid}
                sx={{
                  py: 1.5,
                  px: 4,
                  backgroundColor: "#1976d2",
                  "&:hover": {
                    backgroundColor: "#1565c0",
                  },
                }}>
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Sign In"
                )}
              </Button>

              <Button
                variant="outlined"
                onClick={handleDemoLogin}
                disabled={isLoading}
                sx={{ borderColor: "#1976d2", color: "#1976d2" }}>
                Demo Login
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default ProviderSignIn;

import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
} from "@mui/material";
import {
  Science,
  Download,
  TrendingUp,
  TrendingDown,
} from "@mui/icons-material";

const PatientLabResults: React.FC = () => {
  const labResults = [
    {
      id: "1",
      type: "Blood Test",
      date: "2024-01-10",
      status: "normal",
      provider: "Dr. Sarah Johnson",
    },
    {
      id: "2",
      type: "Cholesterol Panel",
      date: "2024-01-10",
      status: "warning",
      provider: "Dr. Sarah Johnson",
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Lab Results
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Results
              </Typography>
              <List>
                {labResults.map((result) => (
                  <ListItem key={result.id}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "primary.main" }}>
                        <Science />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={result.type}
                      secondary={`${result.date} - ${result.provider}`}
                    />
                    <Chip label={result.status} color="primary" />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Button variant="outlined" fullWidth startIcon={<Download />}>
                Download Results
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PatientLabResults;

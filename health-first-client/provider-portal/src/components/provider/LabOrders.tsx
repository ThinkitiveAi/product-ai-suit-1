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
import { Science, Add, Visibility } from "@mui/icons-material";

const ProviderLabOrders: React.FC = () => {
  const labOrders = [
    {
      id: "1",
      patient: "John Smith",
      test: "Blood Test",
      status: "completed",
      date: "2024-01-10",
    },
    {
      id: "2",
      patient: "Sarah Johnson",
      test: "Cholesterol Panel",
      status: "pending",
      date: "2024-01-12",
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Lab Orders
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Orders
              </Typography>
              <List>
                {labOrders.map((order) => (
                  <ListItem key={order.id}>
                    <ListItemAvatar>
                      <Avatar>
                        <Science />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${order.test} - ${order.patient}`}
                      secondary={`Date: ${order.date}`}
                    />
                    <Chip label={order.status} color="primary" />
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
              <Button variant="outlined" fullWidth startIcon={<Add />}>
                New Lab Order
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProviderLabOrders;

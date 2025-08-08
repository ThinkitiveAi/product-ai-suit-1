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
  Chip,
} from "@mui/material";
import { Payment, Receipt, CreditCard } from "@mui/icons-material";

const PatientBilling: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Billing & Payments
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Payment History
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Annual Physical"
                    secondary="2024-01-10 - $150.00"
                  />
                  <Chip label="Paid" color="success" />
                </ListItem>
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
              <Button variant="outlined" fullWidth startIcon={<Payment />}>
                Make Payment
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PatientBilling;

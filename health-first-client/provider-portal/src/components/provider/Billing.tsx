import React from 'react';
import { Box, Typography, Card, CardContent, Button, Grid, List, ListItem, ListItemText, Chip } from '@mui/material';
import { Receipt, Payment, TrendingUp } from '@mui/icons-material';

const ProviderBilling: React.FC = () => {
  const invoices = [
    {
      id: '1',
      patient: 'John Smith',
      amount: 150.00,
      status: 'paid',
      date: '2024-01-10',
    },
    {
      id: '2',
      patient: 'Sarah Johnson',
      amount: 200.00,
      status: 'pending',
      date: '2024-01-12',
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Billing</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Recent Invoices</Typography>
              <List>
                {invoices.map((invoice) => (
                  <ListItem key={invoice.id}>
                    <ListItemText
                      primary={`${invoice.patient} - $${invoice.amount}`}
                      secondary={`Date: ${invoice.date}`}
                    />
                    <Chip label={invoice.status} color="primary" />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Quick Actions</Typography>
              <Button variant="outlined" fullWidth startIcon={<Receipt />}>
                Generate Invoice
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProviderBilling; 
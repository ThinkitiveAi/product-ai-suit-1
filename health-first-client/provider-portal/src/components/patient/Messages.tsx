import React from 'react';
import { Box, Typography, Card, CardContent, Button, Grid, List, ListItem, ListItemText, ListItemAvatar, Avatar, Chip } from '@mui/material';
import { Message, Send, Person } from '@mui/icons-material';

const PatientMessages: React.FC = () => {
  const messages = [
    {
      id: '1',
      from: 'Dr. Johnson',
      subject: 'Test Results Available',
      date: '2024-01-11',
      unread: true,
    },
    {
      id: '2',
      from: 'Pharmacy',
      subject: 'Prescription Ready',
      date: '2024-01-10',
      unread: false,
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Messages</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Recent Messages</Typography>
              <List>
                {messages.map((message) => (
                  <ListItem key={message.id}>
                    <ListItemAvatar>
                      <Avatar>
                        <Person />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={message.subject}
                      secondary={`From: ${message.from} - ${message.date}`}
                    />
                    {message.unread && <Chip label="New" color="primary" size="small" />}
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
              <Button variant="outlined" fullWidth startIcon={<Send />}>
                Send Message
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PatientMessages; 
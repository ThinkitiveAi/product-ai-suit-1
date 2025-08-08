import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { RootState } from '../../store/store';

interface ProtectedRouteProps {
  children: React.ReactNode;
  role?: 'patient' | 'provider';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
  const { isAuthenticated, isLoading, user } = useSelector(
    (state: RootState) => state.auth
  );

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          gap: 2,
        }}
      >
        <CircularProgress size={60} />
        <Typography variant="h6" color="text.secondary">
          Loading...
        </Typography>
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role && user?.role !== role) {
    // Redirect to appropriate portal based on user's actual role
    return <Navigate to={`/${user?.role}-portal/dashboard`} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute; 
import React from 'react';
import { Box,Typography } from '@mui/material';
import './loading.css';

const loading = () => {
  return (
    <Box className="loading-element">
        <Typography variant="h5">Loading...</Typography>
    </Box>
  )
}

export default loading;
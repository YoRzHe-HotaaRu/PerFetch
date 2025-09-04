// src/components/StorageCard.js
import React from 'react';
import { Card, CardContent, Typography, Grid, Box, Paper } from '@mui/material';
import { FaHdd } from 'react-icons/fa';

const StorageCard = React.memo(({ storage }) => {
  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <FaHdd color="#2c3e50" size={24} style={{ marginRight: 8 }} />
          <Typography variant="h5">Storage Information</Typography>
        </Box>
        
        <Grid container spacing={2}>
          {storage.map((drive, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper 
                sx={{ 
                  p: 2, 
                  height: '100%',
                  border: '1px solid #e1e8ed',
                  borderRadius: 2
                }}
              >
                <Typography variant="h6" color="#3498db" gutterBottom>
                  Drive {index + 1}
                </Typography>
                
                <Box mb={1}>
                  <Typography variant="body2" color="textSecondary">Name</Typography>
                  <Typography variant="body1">{drive.name}</Typography>
                </Box>
                
                <Box mb={1}>
                  <Typography variant="body2" color="textSecondary">Type</Typography>
                  <Typography variant="body1">{drive.type}</Typography>
                </Box>
                
                <Box>
                  <Typography variant="body2" color="textSecondary">Size</Typography>
                  <Typography variant="body1">{(drive.size / 1073741824).toFixed(2)} GB</Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
});

export default StorageCard;
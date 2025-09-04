import React from 'react';
import { Card, CardContent, Typography, LinearProgress, Box } from '@mui/material';
import { FaMemory, FaChartPie } from 'react-icons/fa';

const MemoryCard = React.memo(({ memory }) => {
  const usedPercentage = (memory.used / memory.total) * 100;
  
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <FaMemory color="#2c3e50" size={24} style={{ marginRight: 8 }} />
          <Typography variant="h5">Memory</Typography>
        </Box>
        
        <Box mb={1}>
          <Typography variant="body2" color="textSecondary">Total</Typography>
          <Typography variant="body1">{(memory.total / 1073741824).toFixed(1)} GB</Typography>
        </Box>
        
        <Box mb={1}>
          <Typography variant="body2" color="textSecondary">Used</Typography>
          <Typography variant="body1">{(memory.used / 1073741824).toFixed(1)} GB</Typography>
        </Box>
        
        <Box mb={1}>
          <Typography variant="body2" color="textSecondary">Free</Typography>
          <Typography variant="body1">{(memory.free / 1073741824).toFixed(1)} GB</Typography>
        </Box>
        
        <Box>
          <Box display="flex" alignItems="center" mb={1}>
            <FaChartPie color="#3498db" size={16} style={{ marginRight: 4 }} />
            <Typography variant="body2" color="textSecondary">Usage</Typography>
          </Box>
          <Typography variant="body1" mb={1}>
            {usedPercentage.toFixed(1)}%
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={usedPercentage} 
            sx={{ 
              height: 6, 
              borderRadius: 3,
              backgroundColor: '#e1e8ed',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#3498db',
              }
            }} 
          />
        </Box>
      </CardContent>
    </Card>
  );
});

export default MemoryCard;
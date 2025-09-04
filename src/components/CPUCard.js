import React from 'react';
import { Card, CardContent, Typography, LinearProgress, Box } from '@mui/material';
import { FaMicrochip, FaThermometerHalf, FaTachometerAlt } from 'react-icons/fa';

const CPUCard = React.memo(({ cpu }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <FaMicrochip color="#2c3e50" size={24} style={{ marginRight: 8 }} />
          <Typography variant="h5">CPU</Typography>
        </Box>
        
        <Box mb={1}>
          <Typography variant="body2" color="textSecondary">Model</Typography>
          <Typography variant="body1" noWrap>{cpu.brand || 'N/A'}</Typography>
        </Box>
        
        <Box mb={1}>
          <Typography variant="body2" color="textSecondary">Cores</Typography>
          <Typography variant="body1">{cpu.cores || 'N/A'} Threads / {cpu.physicalCores || 'N/A'} Cores</Typography>
        </Box>
        
        <Box mb={1}>
          <Typography variant="body2" color="textSecondary">Speed</Typography>
          <Typography variant="body1">{cpu.speed ? `${cpu.speed} GHz` : 'N/A'}</Typography>
        </Box>
        
        <Box mb={1}>
          <Box display="flex" alignItems="center">
            <FaThermometerHalf color="#e74c3c" size={16} style={{ marginRight: 4 }} />
            <Typography variant="body2" color="textSecondary">Temp</Typography>
          </Box>
          <Typography variant="body1">{cpu.temperature ? `${cpu.temperature}°C` : 'N/A'}</Typography>
        </Box>
        
        <Box>
          <Box display="flex" alignItems="center" mb={1}>
            <FaTachometerAlt color="#3498db" size={16} style={{ marginRight: 4 }} />
            <Typography variant="body2" color="textSecondary">Load</Typography>
          </Box>
          <Typography variant="body1" mb={1}>
            {cpu.currentLoad ? `${cpu.currentLoad.toFixed(1)}%` : 'N/A'}
          </Typography>
          {cpu.currentLoad !== undefined && (
            <LinearProgress 
              variant="determinate" 
              value={cpu.currentLoad} 
              sx={{ 
                height: 6, 
                borderRadius: 3,
                backgroundColor: '#e1e8ed',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#3498db',
                }
              }} 
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
});

export default CPUCard;
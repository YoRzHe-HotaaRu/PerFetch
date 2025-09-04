import React from 'react';
import { Card, CardContent, Typography, LinearProgress, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { FaMicrochip, FaThermometerHalf, FaTachometerAlt } from 'react-icons/fa';

const CPUCard = React.memo(({ cpu }) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <FaMicrochip color="#00e5ff" size={24} style={{ marginRight: 8 }} />
          <Typography variant="h5">CPU Information</Typography>
        </Box>
        
        <Box mb={2}>
          <Typography variant="body2" color="textSecondary">Manufacturer</Typography>
          <Typography variant="body1">{cpu.manufacturer || 'N/A'}</Typography>
        </Box>
        
        <Box mb={2}>
          <Typography variant="body2" color="textSecondary">Model</Typography>
          <Typography variant="body1">{cpu.brand || 'N/A'}</Typography>
        </Box>
        
        <Box mb={2}>
          <Typography variant="body2" color="textSecondary">Cores / Threads</Typography>
          <Typography variant="body1">{cpu.cores || 'N/A'} / {cpu.physicalCores || 'N/A'}</Typography>
        </Box>
        
        <Box mb={2}>
          <Typography variant="body2" color="textSecondary">Speed</Typography>
          <Typography variant="body1">{cpu.speed ? `${cpu.speed} GHz` : 'N/A'}</Typography>
        </Box>
        
        <Box mb={2}>
          <Box display="flex" alignItems="center" mb={1}>
            <FaThermometerHalf color="#ff9e80" style={{ marginRight: 8 }} />
            <Typography variant="body2" color="textSecondary">Temperature</Typography>
          </Box>
          <Typography variant="body1">{cpu.temperature ? `${cpu.temperature}°C` : 'N/A'}</Typography>
        </Box>
        
        <Box>
          <Box display="flex" alignItems="center" mb={1}>
            <FaTachometerAlt color="#64ffda" style={{ marginRight: 8 }} />
            <Typography variant="body2" color="textSecondary">Current Load</Typography>
          </Box>
          <Typography variant="body1" mb={1}>
            {cpu.currentLoad ? `${cpu.currentLoad.toFixed(1)}%` : 'N/A'}
          </Typography>
          {cpu.currentLoad !== undefined && (
            <LinearProgress 
              variant="determinate" 
              value={cpu.currentLoad} 
              sx={{ 
                height: 8, 
                borderRadius: 4,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#64ffda',
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
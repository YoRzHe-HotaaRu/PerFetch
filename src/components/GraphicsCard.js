import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { FaDesktop } from 'react-icons/fa';

const GraphicsCard = React.memo(({ graphics }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <FaDesktop color="#2c3e50" size={24} style={{ marginRight: 8 }} />
          <Typography variant="h5">GPU</Typography>
        </Box>
        
        {graphics.controllers.map((controller, index) => (
          <Box key={index}>
            <Typography variant="h6" color="#3498db" gutterBottom>
              GPU {index + 1}
            </Typography>
            
            <Box mb={1}>
              <Typography variant="body2" color="textSecondary">Model</Typography>
              <Typography variant="body1" noWrap>{controller.model}</Typography>
            </Box>
            
            <Box mb={1}>
              <Typography variant="body2" color="textSecondary">Vendor</Typography>
              <Typography variant="body1" noWrap>{controller.vendor}</Typography>
            </Box>
            
            <Box>
              <Typography variant="body2" color="textSecondary">VRAM</Typography>
              <Typography variant="body1">{controller.vram} MB</Typography>
            </Box>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
});

export default GraphicsCard;
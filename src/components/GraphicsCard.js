import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Box } from '@mui/material';
import { FaDesktop } from 'react-icons/fa';

const GraphicsCard = React.memo(({ graphics }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <FaDesktop color="#2c3e50" size={24} style={{ marginRight: 8 }} />
          <Typography variant="h5">Graphics Information</Typography>
        </Box>
        
        <List disablePadding>
          {graphics.controllers.map((controller, index) => (
            <Box key={index} mb={index < graphics.controllers.length - 1 ? 2 : 0}>
              <Typography variant="h6" color="#3498db" gutterBottom>
                GPU {index + 1}
              </Typography>
              
              <Box mb={1}>
                <Typography variant="body2" color="textSecondary">Model</Typography>
                <Typography variant="body1">{controller.model}</Typography>
              </Box>
              
              <Box mb={1}>
                <Typography variant="body2" color="textSecondary">Vendor</Typography>
                <Typography variant="body1">{controller.vendor}</Typography>
              </Box>
              
              <Box>
                <Typography variant="body2" color="textSecondary">VRAM</Typography>
                <Typography variant="body1">{controller.vram} MB</Typography>
              </Box>
            </Box>
          ))}
        </List>
      </CardContent>
    </Card>
  );
});

export default GraphicsCard;
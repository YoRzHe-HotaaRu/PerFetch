import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Box } from '@mui/material';
import { FaHdd } from 'react-icons/fa';

const StorageCard = React.memo(({ storage }) => {
  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <FaHdd color="#ff9e80" size={24} style={{ marginRight: 8 }} />
          <Typography variant="h5">Storage Information</Typography>
        </Box>
        
        <List disablePadding>
          {storage.map((drive, index) => (
            <Box key={index} mb={index < storage.length - 1 ? 2 : 0}>
              <Typography variant="h6" color="#00e5ff" gutterBottom>
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
            </Box>
          ))}
        </List>
      </CardContent>
    </Card>
  );
});

export default StorageCard;
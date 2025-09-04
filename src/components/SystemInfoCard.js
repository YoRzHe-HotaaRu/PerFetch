import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { FaDesktop, FaWindows } from 'react-icons/fa';

const SystemInfoCard = React.memo(({ os }) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <FaDesktop color="#ff4081" size={24} style={{ marginRight: 8 }} />
          <Typography variant="h5">System Information</Typography>
        </Box>
        
        <Box mb={2}>
          <Typography variant="body2" color="textSecondary">Platform</Typography>
          <Typography variant="body1">{os.platform}</Typography>
        </Box>
        
        <Box mb={2}>
          <Typography variant="body2" color="textSecondary">Distribution</Typography>
          <Typography variant="body1">{os.distro || os.hostname}</Typography>
        </Box>
        
        <Box mb={2}>
          <Typography variant="body2" color="textSecondary">Release</Typography>
          <Typography variant="body1">{os.release}</Typography>
        </Box>
        
        <Box mb={2}>
          <Typography variant="body2" color="textSecondary">Kernel</Typography>
          <Typography variant="body1">{os.kernel}</Typography>
        </Box>
        
        <Box>
          <Typography variant="body2" color="textSecondary">Architecture</Typography>
          <Typography variant="body1">{os.arch}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
});

export default SystemInfoCard;
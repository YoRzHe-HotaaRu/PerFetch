import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { FaDesktop } from 'react-icons/fa';

const SystemInfoCard = React.memo(({ os }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <FaDesktop color="#2c3e50" size={24} style={{ marginRight: 8 }} />
          <Typography variant="h5">System</Typography>
        </Box>
        
        <Box mb={1}>
          <Typography variant="body2" color="textSecondary">Platform</Typography>
          <Typography variant="body1" noWrap>{os.platform}</Typography>
        </Box>
        
        <Box mb={1}>
          <Typography variant="body2" color="textSecondary">OS</Typography>
          <Typography variant="body1" noWrap>{os.distro || os.hostname}</Typography>
        </Box>
        
        <Box mb={1}>
          <Typography variant="body2" color="textSecondary">Release</Typography>
          <Typography variant="body1" noWrap>{os.release}</Typography>
        </Box>
        
        <Box>
          <Typography variant="body2" color="textSecondary">Arch</Typography>
          <Typography variant="body1" noWrap>{os.arch}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
});

export default SystemInfoCard;
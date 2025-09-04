// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Grid, 
  Container, 
  CssBaseline, 
  ThemeProvider, 
  createTheme, 
  Typography, 
  Button,
  Paper,
  Box,
  IconButton,
  Tooltip,
  Divider
} from '@mui/material';
import { 
  FaMicrochip, 
  FaMemory, 
  FaDesktop, 
  FaHdd, 
  FaThermometerHalf, 
  FaSync,
  FaPause,
  FaPlay,
  FaInfoCircle
} from 'react-icons/fa';
import CPUCard from './components/CPUCard';
import MemoryCard from './components/MemoryCard';
import GraphicsCard from './components/GraphicsCard';
import StorageCard from './components/StorageCard';
import SystemInfoCard from './components/SystemInfoCard';
import TemperatureChart from './components/TemperatureChart';
import './App.css';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2c3e50',
      light: '#34495e',
      dark: '#1a252f',
    },
    secondary: {
      main: '#3498db',
      light: '#5dade2',
      dark: '#2874a6',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#2c3e50',
      secondary: '#7f8c8d',
    },
    divider: '#e1e8ed',
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 600,
      color: '#2c3e50',
    },
    h5: {
      fontWeight: 600,
      color: '#2c3e50',
    },
    h6: {
      fontWeight: 600,
      color: '#3498db',
    },
    body2: {
      color: '#7f8c8d',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e1e8ed',
          transition: 'box-shadow 0.3s ease',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          fontWeight: 500,
          textTransform: 'none',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: '#e1e8ed',
        },
      },
    },
  },
});

function App() {
  const [systemSpecs, setSystemSpecs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/specs');
        setSystemSpecs(response.data);
        setLoading(false);
        setLastUpdated(new Date());
      } catch (err) {
        console.error('Error fetching system specs:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Poll dynamic data
  useEffect(() => {
    if (!systemSpecs || isPaused) return;
    
    const fetchDynamicData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/specs/dynamic');
        setSystemSpecs(prev => ({
          ...prev,
          cpu: {
            ...prev.cpu,
            temperature: response.data.cpu.temperature,
            currentLoad: response.data.cpu.currentLoad
          },
          memory: response.data.memory
        }));
        setLastUpdated(new Date());
      } catch (err) {
        console.error('Error fetching dynamic system specs:', err);
        setError(err.message);
      }
    };

    const intervalId = setInterval(fetchDynamicData, 15000);
    
    return () => clearInterval(intervalId);
  }, [systemSpecs, isPaused]);

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/specs');
      setSystemSpecs(response.data);
      setLoading(false);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error refreshing system specs:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
        sx={{ backgroundColor: theme.palette.background.default }}
      >
        <Box textAlign="center">
          <FaSync size={48} color={theme.palette.primary.main} style={{ animation: 'spin 2s linear infinite' }} />
          <Typography variant="h6" mt={2} color={theme.palette.text.primary}>
            Loading System Information
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );

  if (error) return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
        sx={{ backgroundColor: theme.palette.background.default }}
      >
        <Paper sx={{ p: 4, maxWidth: 500, textAlign: 'center' }}>
          <Typography variant="h5" color="error" gutterBottom>
            Error Loading System Information
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            {error}
          </Typography>
          <Button variant="contained" onClick={handleRefresh}>
            Retry
          </Button>
        </Paper>
      </Box>
    </ThemeProvider>
  );

  if (!systemSpecs) return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
        sx={{ backgroundColor: theme.palette.background.default }}
      >
        <Typography variant="h5">
          No system information available
        </Typography>
      </Box>
    </ThemeProvider>
  );

  // Prepare data for temperature chart
  const tempData = [
    { name: 'CPU', temperature: systemSpecs.cpu.temperature },
    { name: 'System', temperature: systemSpecs.cpu.temperature },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box 
        sx={{ 
          minHeight: '100vh', 
          backgroundColor: theme.palette.background.default,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 4,
        }}
      >
        <Container 
          maxWidth="lg" 
          sx={{ 
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Header */}
          <Box 
            display="flex" 
            justifyContent="space-between" 
            alignItems="center" 
            mb={4}
            width="100%"
          >
            <Box>
              <Typography variant="h3" component="h1" gutterBottom>
                System Dashboard
              </Typography>
              <Box display="flex" alignItems="center">
                <FaInfoCircle color={theme.palette.text.secondary} size={16} style={{ marginRight: 8 }} />
                <Typography variant="body2" color="textSecondary">
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </Typography>
              </Box>
            </Box>
            
            <Box display="flex" gap={2}>
              <Tooltip title={isPaused ? "Resume Updates" : "Pause Updates"}>
                <IconButton 
                  color="primary" 
                  onClick={() => setIsPaused(!isPaused)}
                  sx={{ 
                    backgroundColor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`,
                    '&:hover': { backgroundColor: theme.palette.action.hover }
                  }}
                >
                  {isPaused ? <FaPlay /> : <FaPause />}
                </IconButton>
              </Tooltip>
              
              <Tooltip title="Refresh Data">
                <IconButton 
                  color="primary" 
                  onClick={handleRefresh}
                  sx={{ 
                    backgroundColor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`,
                    '&:hover': { backgroundColor: theme.palette.action.hover }
                  }}
                >
                  <FaSync />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          
          {/* Stats Overview */}
          <Grid container spacing={3} mb={4} width="100%">
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 3, display: 'flex', alignItems: 'center' }}>
                <Box sx={{ mr: 2, color: theme.palette.primary.main }}>
                  <FaMicrochip size={24} />
                </Box>
                <Box>
                  <Typography variant="body2" color="textSecondary">CPU</Typography>
                  <Typography variant="h6">{systemSpecs.cpu.brand.split(' ')[0]}</Typography>
                </Box>
              </Paper>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 3, display: 'flex', alignItems: 'center' }}>
                <Box sx={{ mr: 2, color: theme.palette.secondary.main }}>
                  <FaMemory size={24} />
                </Box>
                <Box>
                  <Typography variant="body2" color="textSecondary">RAM</Typography>
                  <Typography variant="h6">{(systemSpecs.memory.total / 1073741824).toFixed(1)} GB</Typography>
                </Box>
              </Paper>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 3, display: 'flex', alignItems: 'center' }}>
                <Box sx={{ mr: 2, color: theme.palette.primary.main }}>
                  <FaDesktop size={24} />
                </Box>
                <Box>
                  <Typography variant="body2" color="textSecondary">GPU</Typography>
                  <Typography variant="h6">{systemSpecs.graphics.controllers[0]?.model.split(' ')[0] || 'N/A'}</Typography>
                </Box>
              </Paper>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 3, display: 'flex', alignItems: 'center' }}>
                <Box sx={{ mr: 2, color: theme.palette.secondary.main }}>
                  <FaHdd size={24} />
                </Box>
                <Box>
                  <Typography variant="body2" color="textSecondary">Storage</Typography>
                  <Typography variant="h6">{systemSpecs.storage.length} Drives</Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
          
          {/* Main Cards - Row 1: SystemInfo and Memory */}
          <Grid container spacing={3} mb={3} width="100%">
            <Grid item xs={12} md={6}>
              <SystemInfoCard os={systemSpecs.os} />
            </Grid>
            <Grid item xs={12} md={6}>
              <MemoryCard memory={systemSpecs.memory} />
            </Grid>
          </Grid>
          
          {/* Main Cards - Row 2: CPU and Graphics */}
          <Grid container spacing={3} mb={3} width="100%">
            <Grid item xs={12} md={6}>
              <CPUCard cpu={systemSpecs.cpu} />
            </Grid>
            <Grid item xs={12} md={6}>
              <GraphicsCard graphics={systemSpecs.graphics} />
            </Grid>
          </Grid>
          
          {/* Main Cards - Row 3: Storage */}
          <Grid container spacing={3} mb={3} width="100%">
            <Grid item xs={12}>
              <StorageCard storage={systemSpecs.storage} />
            </Grid>
          </Grid>
          
          {/* Main Cards - Row 4: Temperature Chart */}
          <Grid container spacing={3} width="100%">
            <Grid item xs={12}>
              <TemperatureChart data={tempData} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
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
  Tooltip
} from '@mui/material';
import { 
  FaMicrochip, 
  FaMemory, 
  FaDesktop, 
  FaHdd, 
  FaThermometerHalf, 
  FaSync,
  FaPause,
  FaPlay
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import CPUCard from './components/CPUCard';
import MemoryCard from './components/MemoryCard';
import GraphicsCard from './components/GraphicsCard';
import StorageCard from './components/StorageCard';
import SystemInfoCard from './components/SystemInfoCard';
import TemperatureChart from './components/TemperatureChart';
import './App.css';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00e5ff',
      light: '#6effff',
      dark: '#00b2cc',
    },
    secondary: {
      main: '#ff4081',
      light: '#ff79b0',
      dark: '#c60055',
    },
    background: {
      default: '#0a0e27',
      paper: 'rgba(20, 25, 47, 0.7)',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b8bcc8',
    },
  },
  typography: {
    fontFamily: '"Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 700,
      background: 'linear-gradient(90deg, #00e5ff, #ff4081)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h5: {
      fontWeight: 600,
      color: '#00e5ff',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0, 229, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 12px 40px rgba(0, 229, 255, 0.2)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          padding: '8px 24px',
          fontWeight: 600,
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
        sx={{ background: 'linear-gradient(135deg, #0a0e27, #1a1f3a)' }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <FaSync size={48} color="#00e5ff" />
        </motion.div>
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
        sx={{ background: 'linear-gradient(135deg, #0a0e27, #1a1f3a)' }}
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
        sx={{ background: 'linear-gradient(135deg, #0a0e27, #1a1f3a)' }}
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
          background: 'linear-gradient(135deg, #0a0e27, #1a1f3a)',
          py: 4,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Background decorative elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '-150px',
            right: '-150px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0, 229, 255, 0.1) 0%, rgba(0, 229, 255, 0) 70%)',
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '-100px',
            left: '-100px',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 64, 129, 0.1) 0%, rgba(255, 64, 129, 0) 70%)',
            zIndex: 0,
          }}
        />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          {/* Header */}
          <Box 
            display="flex" 
            justifyContent="space-between" 
            alignItems="center" 
            mb={4}
          >
            <Box>
              <Typography variant="h3" component="h1" gutterBottom>
                System Dashboard
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </Typography>
            </Box>
            
            <Box display="flex" gap={2}>
              <Tooltip title={isPaused ? "Resume Updates" : "Pause Updates"}>
                <IconButton 
                  color="primary" 
                  onClick={() => setIsPaused(!isPaused)}
                  sx={{ 
                    background: 'rgba(0, 229, 255, 0.1)',
                    '&:hover': { background: 'rgba(0, 229, 255, 0.2)' }
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
                    background: 'rgba(0, 229, 255, 0.1)',
                    '&:hover': { background: 'rgba(0, 229, 255, 0.2)' }
                  }}
                >
                  <FaSync />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          
          {/* Stats Overview */}
          <Grid container spacing={3} mb={4}>
            <Grid item xs={12} sm={6} md={3}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Paper sx={{ p: 3, display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ mr: 2, color: '#00e5ff' }}>
                    <FaMicrochip size={24} />
                  </Box>
                  <Box>
                    <Typography variant="body2" color="textSecondary">CPU</Typography>
                    <Typography variant="h6">{systemSpecs.cpu.brand.split(' ')[0]}</Typography>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Paper sx={{ p: 3, display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ mr: 2, color: '#ff4081' }}>
                    <FaMemory size={24} />
                  </Box>
                  <Box>
                    <Typography variant="body2" color="textSecondary">RAM</Typography>
                    <Typography variant="h6">{(systemSpecs.memory.total / 1073741824).toFixed(1)} GB</Typography>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Paper sx={{ p: 3, display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ mr: 2, color: '#64ffda' }}>
                    <FaDesktop size={24} />
                  </Box>
                  <Box>
                    <Typography variant="body2" color="textSecondary">GPU</Typography>
                    <Typography variant="h6">{systemSpecs.graphics.controllers[0]?.model.split(' ')[0] || 'N/A'}</Typography>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Paper sx={{ p: 3, display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ mr: 2, color: '#ff9e80' }}>
                    <FaHdd size={24} />
                  </Box>
                  <Box>
                    <Typography variant="body2" color="textSecondary">Storage</Typography>
                    <Typography variant="h6">{systemSpecs.storage.length} Drives</Typography>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
          
          {/* Main Cards */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <SystemInfoCard os={systemSpecs.os} />
              </motion.div>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <CPUCard cpu={systemSpecs.cpu} />
              </motion.div>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <MemoryCard memory={systemSpecs.memory} />
              </motion.div>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <GraphicsCard graphics={systemSpecs.graphics} />
              </motion.div>
            </Grid>
            
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <StorageCard storage={systemSpecs.storage} />
              </motion.div>
            </Grid>
            
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <TemperatureChart data={tempData} />
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
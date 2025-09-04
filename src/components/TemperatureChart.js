import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaThermometerHalf } from 'react-icons/fa';

const TemperatureChart = React.memo(({ data }) => {
  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <FaThermometerHalf color="#ff9e80" size={24} style={{ marginRight: 8 }} />
          <Typography variant="h5">Temperature Monitor</Typography>
        </Box>
        
        <Box sx={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis dataKey="name" stroke="#b8bcc8" />
              <YAxis stroke="#b8bcc8" label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft', fill: '#b8bcc8' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(20, 25, 47, 0.9)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
                itemStyle={{ color: '#ffffff' }}
                labelStyle={{ color: '#00e5ff' }}
              />
              <Legend />
              <Bar 
                dataKey="temperature" 
                fill="#ff9e80" 
                name="Temperature" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
});

export default TemperatureChart;
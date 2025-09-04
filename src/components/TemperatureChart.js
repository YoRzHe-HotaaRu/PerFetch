// src/components/TemperatureChart.js
import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaThermometerHalf } from 'react-icons/fa';

const TemperatureChart = React.memo(({ data }) => {
  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <FaThermometerHalf color="#2c3e50" size={24} style={{ marginRight: 8 }} />
          <Typography variant="h5">Temperature Monitor</Typography>
        </Box>
        
        <Box sx={{ width: '100%', height: 250 }}>
          <ResponsiveContainer>
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e1e8ed" />
              <XAxis dataKey="name" stroke="#7f8c8d" />
              <YAxis stroke="#7f8c8d" label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft', fill: '#7f8c8d' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e1e8ed', borderRadius: 8 }}
                itemStyle={{ color: '#2c3e50' }}
                labelStyle={{ color: '#3498db', fontWeight: 600 }}
              />
              <Legend />
              <Bar 
                dataKey="temperature" 
                fill="#3498db" 
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
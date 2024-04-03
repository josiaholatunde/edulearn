import React from 'react';
import { Bar } from 'react-chartjs-2';

const ElectionChart = ({ data }) => {
    console.log('Data ', data)
  const parties = data && data.seats && data.seats.map(item => item.party);
  const seats = data && data.seats && data.seats.map(item => parseInt(item.seat, 10));

  const chartData = {
    labels: parties,
    datasets: [{
      label: 'Number of Seats',
      data: seats,
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)', // Red Party
        'rgba(54, 162, 235, 0.5)', // Blue Party
        'rgba(255, 206, 86, 0.5)', // Yellow Party
        'rgba(75, 192, 192, 0.5)'  // Independent
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)'
      ],
      borderWidth: 1
    }]
  };

  const chartOptions = {
    plugins: {
        title: {
          display: true,
          text: 'Shangri-La Member of Parliament Election Results',
        },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: Math.max(...(seats || [])) + 1 
      }
    },
    height: 200
  };

  return (
    <div>
      <Bar data={chartData} options={chartOptions} height="100px" width={'300px'} />
    </div>
  );
};

export default ElectionChart;

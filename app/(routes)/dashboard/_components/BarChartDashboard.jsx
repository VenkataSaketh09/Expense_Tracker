import React, { useEffect, useState } from 'react';
import { BarChart, Legend, Tooltip, XAxis, YAxis, Bar, ResponsiveContainer } from 'recharts';

function BarChartDashboard({ budgetList }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Ensures rendering happens only on the client
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Render nothing until the client side
  }

  console.log(budgetList); // Check if `amount` exists in the data

  return (
    <div className='border rounded-lg p-5'>
      <h2 className='font-bold text-xl'>Activity</h2>
      <ResponsiveContainer width={'80%'} height={500}>
      <BarChart   data={budgetList}
      margin={{
        top:7,
        left:7,
        right:7,
        bottom:7,
      }}>
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey='totalSpend' stackId="a" fill="#4845d2" />
        <Bar dataKey='amount' stackId="a" fill="#C3C2FF" />
      </BarChart>
      </ResponsiveContainer>

    </div>
  );
}

export default BarChartDashboard;

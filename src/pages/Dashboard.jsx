import React, { useEffect, useState } from 'react';
import { getToken } from '../common/tokenFunc';
import { API_URL } from '../common/common';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

const COLORS = ['#FF4D4F', '#FAAD14', '#52C41A']; // High, Medium, Low

const Dashboard = () => {
  const [priorityData, setPriorityData] = useState([]);
  const [completionData, setCompletionData] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);

  useEffect(() => {
   const fetchDashboardData = async () => {
  try {
    const token = getToken();
    const res = await fetch(`${API_URL}dashboard-data`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw new Error('Failed to fetch dashboard data');

    const data = await res.json();
    const dashboard = data.data;
    console.log("Dashboard data fetched:", dashboard);
    // Priority Distribution
    const priorityChart = dashboard.priorityDistribution.map((item) => ({
      priority: item._id,
      count: item.count,
    }));
    setPriorityData(priorityChart);

    // Completion Progress
    const completionChart = dashboard.completionProgress
      .map((item) => {
        const { year, month, day } = item._id;
        const date = new Date(year, month - 1, day);
        return {
          date: date.toLocaleDateString(),
          completed: item.completedCount,
        };
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    setCompletionData(completionChart);

    // Upcoming Deadlines (next 7 days)
    const today = new Date();
    const upcoming = dashboard.upcomingDeadlines
      .filter(
        (task) =>
          new Date(task.dueDate) >= today &&
          new Date(task.dueDate) <= new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
      )
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
      console.log("upcoming tasks:", upcoming);
    setUpcomingTasks(upcoming);

  } catch (error) {
    console.error('Error fetching dashboard data:', error);
  }
};

    fetchDashboardData();
  }, []);

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      {/* Priority Distribution */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Priority Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={priorityData}
              dataKey="count"
              nameKey="priority"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {priorityData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Completion Progress */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Completion Progress</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={completionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="completed"
              stroke="#4F46E5"
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Upcoming Deadlines */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Upcoming Deadlines (Next 7 Days)</h2>
        {upcomingTasks.length === 0 ? (
          <p className="text-gray-500">No upcoming tasks!</p>
        ) : (
          <ul className="space-y-3">
            {upcomingTasks.map((task) => (
              <li
                key={task._id}
                className="flex justify-between items-center p-3 border rounded hover:bg-gray-50"
              >
                <div>
                  <span className="font-semibold">{task.title}</span>
                  <p className="text-sm text-gray-600">{task.description}</p>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(task.dueDate).toLocaleDateString()}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

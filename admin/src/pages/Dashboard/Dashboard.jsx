import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    totalRevenue: 0,
    activeUsers: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io('http://localhost:4000');

    // Fetch initial data
    fetchDashboardData();

    // Socket event listeners
    newSocket.on('orderUpdate', handleOrderUpdate);
    newSocket.on('statsUpdate', handleStatsUpdate);

    return () => newSocket.close();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:4000/api/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setStats(data.stats);
        setRecentOrders(data.recentOrders);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const handleOrderUpdate = (order) => {
    setRecentOrders(prev => {
      const updated = [order, ...prev].slice(0, 10);
      return updated;
    });
  };

  const handleStatsUpdate = (newStats) => {
    setStats(prev => ({ ...prev, ...newStats }));
  };

  return (
    <div className="dashboard">
      <div className="page-header">
        <h1>Dashboard</h1>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p className="stat-value">{stats.totalOrders}</p>
          <div className="stat-chart">
            {/* Add Chart.js or other visualization library here */}
          </div>
        </div>
        <div className="stat-card">
          <h3>Pending Orders</h3>
          <p className="stat-value">{stats.pendingOrders}</p>
          <div className="stat-chart">
            {/* Add Chart.js or other visualization library here */}
          </div>
        </div>
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p className="stat-value">${stats.totalRevenue}</p>
          <div className="stat-chart">
            {/* Add Chart.js or other visualization library here */}
          </div>
        </div>
        <div className="stat-card">
          <h3>Active Users</h3>
          <p className="stat-value">{stats.activeUsers}</p>
          <div className="stat-chart">
            {/* Add Chart.js or other visualization library here */}
          </div>
        </div>
      </div>

      <div className="analytics-section">
        <div className="card revenue-chart">
          <h2>Revenue Trends</h2>
          {/* Add revenue chart component */}
        </div>
        <div className="card order-stats">
          <h2>Order Statistics</h2>
          {/* Add order statistics component */}
        </div>
      </div>

      <div className="card recent-orders">
        <h2>Recent Orders</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order._id}>
                <td>#{order._id}</td>
                <td>{order.user.name}</td>
                <td>{order.items.length}</td>
                <td>${order.totalAmount}</td>
                <td>
                  <span className={`status-badge ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
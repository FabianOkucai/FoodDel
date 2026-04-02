import { useState } from 'react';
import './Users.css';

const Users = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234-567-8900',
      joinDate: '2024-01-15',
      orders: 12,
      totalSpent: 450.99,
      status: 'Active'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1 234-567-8901',
      joinDate: '2024-02-20',
      orders: 8,
      totalSpent: 325.50,
      status: 'Active'
    },
    // Add more mock users here
  ]);

  const [showUserDetails, setShowUserDetails] = useState(null);

  const handleStatusChange = (userId, newStatus) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };

  return (
    <div className="users">
      <div className="page-header">
        <h1>Users</h1>
      </div>

      <div className="users-filters">
        <input 
          type="text" 
          placeholder="Search users..." 
          className="search-input"
        />
        <select className="filter-select">
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Join Date</th>
              <th>Orders</th>
              <th>Total Spent</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.joinDate}</td>
                <td>{user.orders}</td>
                <td>${user.totalSpent.toFixed(2)}</td>
                <td>
                  <select
                    value={user.status}
                    onChange={(e) => handleStatusChange(user.id, e.target.value)}
                    className={`status-select ${user.status.toLowerCase()}`}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Blocked">Blocked</option>
                  </select>
                </td>
                <td>
                  <button 
                    className="view-details-button"
                    onClick={() => setShowUserDetails(user)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showUserDetails && (
        <div className="modal">
          <div className="modal-content">
            <h2>User Details</h2>
            <div className="user-details">
              <div className="detail-group">
                <label>Name</label>
                <p>{showUserDetails.name}</p>
              </div>
              <div className="detail-group">
                <label>Email</label>
                <p>{showUserDetails.email}</p>
              </div>
              <div className="detail-group">
                <label>Phone</label>
                <p>{showUserDetails.phone}</p>
              </div>
              <div className="detail-group">
                <label>Join Date</label>
                <p>{showUserDetails.joinDate}</p>
              </div>
              <div className="detail-group">
                <label>Total Orders</label>
                <p>{showUserDetails.orders}</p>
              </div>
              <div className="detail-group">
                <label>Total Spent</label>
                <p>${showUserDetails.totalSpent.toFixed(2)}</p>
              </div>
              <div className="detail-group">
                <label>Status</label>
                <p>{showUserDetails.status}</p>
              </div>
            </div>
            <div className="modal-actions">
              <button onClick={() => setShowUserDetails(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users; 
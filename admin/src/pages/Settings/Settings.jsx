import { useState } from 'react';
import './Settings.css';

const Settings = () => {
  const [settings, setSettings] = useState({
    restaurantName: 'FoodDel Restaurant',
    email: 'contact@fooddel.com',
    phone: '+1 234-567-8900',
    address: '123 Main St, City, Country',
    deliveryRadius: '10',
    minimumOrder: '15',
    deliveryFee: '2',
    workingHours: {
      monday: { open: '09:00', close: '22:00', isOpen: true },
      tuesday: { open: '09:00', close: '22:00', isOpen: true },
      wednesday: { open: '09:00', close: '22:00', isOpen: true },
      thursday: { open: '09:00', close: '22:00', isOpen: true },
      friday: { open: '09:00', close: '23:00', isOpen: true },
      saturday: { open: '10:00', close: '23:00', isOpen: true },
      sunday: { open: '10:00', close: '22:00', isOpen: true },
    },
    paymentMethods: {
      cash: true,
      creditCard: true,
      debitCard: true,
      upi: false,
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleWorkingHoursChange = (day, field, value) => {
    setSettings(prev => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [day]: {
          ...prev.workingHours[day],
          [field]: field === 'isOpen' ? !prev.workingHours[day].isOpen : value
        }
      }
    }));
  };

  const handlePaymentMethodChange = (method) => {
    setSettings(prev => ({
      ...prev,
      paymentMethods: {
        ...prev.paymentMethods,
        [method]: !prev.paymentMethods[method]
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Save settings to backend
    alert('Settings saved successfully!');
  };

  return (
    <div className="settings">
      <div className="page-header">
        <h1>Settings</h1>
      </div>

      <form onSubmit={handleSubmit} className="settings-form">
        <div className="settings-section">
          <h2>General Information</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>Restaurant Name</label>
              <input
                type="text"
                name="restaurantName"
                value={settings.restaurantName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={settings.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={settings.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={settings.address}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h2>Delivery Settings</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>Delivery Radius (km)</label>
              <input
                type="number"
                name="deliveryRadius"
                value={settings.deliveryRadius}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Minimum Order ($)</label>
              <input
                type="number"
                name="minimumOrder"
                value={settings.minimumOrder}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Delivery Fee ($)</label>
              <input
                type="number"
                name="deliveryFee"
                value={settings.deliveryFee}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h2>Working Hours</h2>
          <div className="working-hours">
            {Object.entries(settings.workingHours).map(([day, hours]) => (
              <div key={day} className="working-hours-row">
                <div className="day-toggle">
                  <input
                    type="checkbox"
                    checked={hours.isOpen}
                    onChange={() => handleWorkingHoursChange(day, 'isOpen')}
                    id={`${day}-toggle`}
                  />
                  <label htmlFor={`${day}-toggle`}>
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </label>
                </div>
                <div className="hours-inputs">
                  <input
                    type="time"
                    value={hours.open}
                    onChange={(e) => handleWorkingHoursChange(day, 'open', e.target.value)}
                    disabled={!hours.isOpen}
                  />
                  <span>to</span>
                  <input
                    type="time"
                    value={hours.close}
                    onChange={(e) => handleWorkingHoursChange(day, 'close', e.target.value)}
                    disabled={!hours.isOpen}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="settings-section">
          <h2>Payment Methods</h2>
          <div className="payment-methods">
            {Object.entries(settings.paymentMethods).map(([method, enabled]) => (
              <div key={method} className="payment-method-item">
                <input
                  type="checkbox"
                  id={method}
                  checked={enabled}
                  onChange={() => handlePaymentMethodChange(method)}
                />
                <label htmlFor={method}>
                  {method.split(/(?=[A-Z])/).join(' ')}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="primary-button">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings; 
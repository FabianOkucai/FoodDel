import React, { useContext, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount, cartItems, food_list, clearCart } = useContext(StoreContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to place order');
      return;
    }

    const orderItems = food_list
      .filter(item => cartItems[item._id] > 0)
      .map(item => ({
        food: item._id,
        quantity: cartItems[item._id],
        price: item.price
      }));

    const orderData = {
      items: orderItems,
      totalAmount: getTotalCartAmount() + 2,
      shippingAddress: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
        phone: formData.phone
      }
    };

    try {
      const response = await fetch('http://localhost:4000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      const data = await response.json();
      if (data.success) {
        alert('Order placed successfully!');
        clearCart();
        navigate('/');
      } else {
        alert(data.message || 'Failed to place order');
      }
    } catch (error) {
      alert('Error placing order. Please try again.');
    }
  };

  return (
    <div>
      <form className='place-order' onSubmit={handleSubmit}>
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input 
              type="text" 
              name="firstName"
              placeholder='First Name'
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input 
              type="text"
              name="lastName" 
              placeholder='Last Name'
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <input 
            type="email"
            name="email" 
            placeholder='Email Address'
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input type="text" placeholder='Street' />
          <div className="multi-fields">

            <input type="text" placeholder='City' />
            <input type="text" placeholder='State' />

          </div>
          <div className="multi-fields">

            <input type="text" placeholder='Zip Code' />
            <input type="text" placeholder='Country' />

          </div>
          <input type="text" placeholder='Phone' />

        </div>
        <div className="place-order-right">

          <div className="cart-total">

            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>

              </div>

              <hr />
              <div className="cart-total-details">

                <p>Delivery Fee</p>

                <p>$ 2</p>

              </div>

              <hr />

              <div className="cart-total-details">

                <b>Total</b>
                <b>$ {getTotalCartAmount() + 2}</b>

              </div>
            </div>
            <button type="submit">PLACE ORDER</button>
          </div>

        </div>
      </form>

    </div>
  )
}

export default PlaceOrder
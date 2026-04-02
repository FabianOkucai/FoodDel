import { useContext, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js';
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
// import { useNavigate } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'your_stripe_public_key_here');

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount } = useContext(StoreContext);
  // const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const handlePromoCode = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/promo/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code: promoCode })
      });
      const data = await response.json();
      if (data.success) {
        setDiscount(data.discount);
        alert('Promo code applied successfully!');
      } else {
        alert('Invalid promo code');
      }
    } catch {
      alert('Error applying promo code');
    }
  };

  const handleCheckout = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to proceed with checkout');
      return;
    }

    setLoading(true);
    try {
      // Create order first
      const orderItems = food_list
        .filter(item => cartItems[item._id] > 0)
        .map(item => ({
          food: item._id,
          quantity: cartItems[item._id],
          price: item.price
        }));

      const orderResponse = await fetch('http://localhost:4000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          items: orderItems,
          totalAmount: getTotalCartAmount() + 2 - discount
        })
      });

      const orderData = await orderResponse.json();
      if (!orderData.success) throw new Error(orderData.message);

      // Create payment intent
      const paymentResponse = await fetch('http://localhost:4000/api/payment/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          amount: getTotalCartAmount() + 2 - discount,
          orderId: orderData.order._id
        })
      });

      const paymentData = await paymentResponse.json();
      if (!paymentData.success) throw new Error(paymentData.message);

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: paymentData.sessionId
      });

      if (error) throw new Error(error.message);

    } catch (error) {
      alert('Error processing checkout: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const finalAmount = getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 2) - discount;

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map(item => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className='cart-items-title cart-items-item'>
                  <img src={item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <p>$ {item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>$ {item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>
                </div>
                <hr />
              </div>
            )
          }
          return null;
        })}
      </div>

      <div className="cart-bottom">
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
              <p>$ {getTotalCartAmount()===0?0:2}</p>
            </div>
            {discount > 0 && (
              <>
                <hr />
                <div className="cart-total-details">
                  <p>Discount</p>
                  <p>-$ {discount}</p>
                </div>
              </>
            )}
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>$ {finalAmount}</b>
            </div>
          </div>
          <button 
            onClick={handleCheckout} 
            disabled={loading || getTotalCartAmount() === 0}
          >
            {loading ? 'Processing...' : 'PROCEED TO CHECKOUT'}
          </button>
        </div>

        <div>
          <p>If you have a promo code, Enter it here</p>
          <div className='cart-promocode-input'>
            <input 
              type="text" 
              placeholder='promo code'
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <button onClick={handlePromoCode}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
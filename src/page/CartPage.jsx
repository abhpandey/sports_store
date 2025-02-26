import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./cartPage.css";

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const goBackToProducts = () => {
    navigate("/product");
  };

  const handlePurchase = () => {
    if (cart.length === 0) {
      alert("Error: Your cart is empty! 🛑 Please add items before purchasing.");
      return;
    }

    const confirmOrder = window.confirm("Are you sure you want to place the order?");
    if (confirmOrder) {
      alert("Order placed successfully! 🎉");
      clearCart(); // This will now trigger a re-render immediately
    }
  };

  const totalAmount = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div>
      <h1 className="cart-title">Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <div className="cart-container">
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-image" />
              <div className="cart-details">
                <h3 className="cart-name">{item.name}</h3>
                <p className="cart-price">₹{item.price}</p>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                  ❌ Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <div className="cart-total">
          <h2>Total: ₹{totalAmount}</h2>
        </div>
      )}

      <div className="cart-buttons">
        <button onClick={goBackToProducts} className="go-back-button">
          🔙 Go Back to Products
        </button>
        <button onClick={handlePurchase} className="purchase-button">
          🛒 Purchase
        </button>
      </div>
    </div>
  );
};

export default CartPage;

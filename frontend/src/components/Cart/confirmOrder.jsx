import React, { useState } from "react";
import axios from "axios";



const ConfirmOrderModal = ({ show, handleClose, cart, clearCart }) => {
  const [address, setAddress] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
 
  if (!show) return null; // Hide modal if 'show' is false

  const handleConfirmOrder = async () => {
    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    if (!address.trim()) {
      setError("Please enter your address.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    

    // Prepare order data
    // const orderData = {
    //   desserts: cart.map(item => ({
    //     dessertId: item.id,
    //     quantity: item.quantity,
    //     price: item.price
    //   })),
    //   customer: {
    //     address: address
    //   },
    //   total: cart.reduce((total, item) => total + item.price * item.quantity, 0)
    // };

     const orderData = {
      cart, 
      address
    };

    try {
      // Replace with your actual backend URL
      const token = localStorage.getItem("token");
      const response = await axios.post("https://my-project-mubw.onrender.com", orderData, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.status === 201) {
        setOrderSuccess(true);
        clearCart(); // Clear the cart in the parent component
        // Optionally, you can close the modal after a delay
        setTimeout(() => {
          setOrderSuccess(false);
          handleClose();
        }, 3000); 
      } else {
        setError("Failed to place the order. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleModalClose = () => {
    setAddress("");
    setError("");
    setOrderSuccess(false);
    handleClose();
    clearCart(); // Ensure the cart is cleared when closing the modal
  };

  return (
    <>
      {/* Modal */}
      <div
        className="modal fade show d-block"
        id="confirmOrderModal"
        tabIndex="-1"
        aria-labelledby="confirmOrderModalLabel"
        aria-hidden={!show}
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} // Semi-transparent background
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="confirmOrderModalLabel">
                Confirm Your Order
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleModalClose}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {orderSuccess ? (
                <div className="alert alert-success" role="alert">
                  Order Successful! Thank you for your purchase.
                </div>
              ) : (
                <>
                  {cart.length === 0 ? (
                    <p>No items in the cart.</p>
                  ) : (
                    <>
                      <ul className="list-group mb-3">
                        {cart.map((item) => (
                          <li
                            className="list-group-item d-flex justify-content-between align-items-center"
                            key={item.id}
                          >
                            <div className="d-flex align-items-center">
                              <img
                                src={item.img}
                                alt={item.tittle}
                                style={{ height: "3rem", width: "3rem", objectFit: "cover", marginRight: "10px" }}
                              />
                              <div>
                                <h6 className="my-0">{item.tittle}</h6>
                                <small className="text-muted">
                                  {item.quantity} x ${item.price}
                                </small>
                              </div>
                            </div>
                            <span className="text-muted">
                              ${item.quantity * item.price}
                            </span>
                          </li>
                        ))}
                        <li className="list-group-item d-flex justify-content-between">
                          <span>Total (USD)</span>
                          <strong>
                            $
                            {cart.reduce(
                              (total, item) => total + item.price * item.quantity,
                              0
                            ).toFixed(2)}
                          </strong>
                        </li>
                      </ul>

                      {/* Address Input */}
                      <div className="mb-3">
                        <label htmlFor="address" className="form-label">Delivery Address</label>
                        <textarea
                          className="form-control"
                          id="address"
                          rows="3"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Enter your delivery address"
                          required
                        ></textarea>
                      </div>

                      {/* Display Error if any */}
                      {error && <div className="alert alert-danger" role="alert">{error}</div>}
                    </>
                  )}
                </>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleModalClose}
                disabled={isSubmitting}
              >
                Close
              </button>
              {!orderSuccess && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleConfirmOrder}
                  disabled={isSubmitting || cart.length === 0}
                >
                  {isSubmitting ? "Processing..." : "Confirm Order"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrderModal;


import React, { useState } from "react";
import Data from "../../data";
import Cart from "../Cart/cart";
import ConfirmOrderModal from "../Cart/confirmOrder"; // Renamed for clarity
import Footer from "../Footer/footer";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [hoveredItemId, setHoveredItemId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
   const navigate = useNavigate();

  // Function to open the modal
  const handleConfirmOrder = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  //Funtion to clear the cart
  const clearCart = () => {
    setCart([]);
    setQuantities({});
  };

  // Function to add an item to the cart
  const addToCart = (item) => {
    const newQuantity = quantities[item.id] || 1;
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      const updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: newQuantity }
          : cartItem
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...item, quantity: newQuantity }]);
    }
  };

  // Function to handle quantity change
  const handleQuantityChange = (item, amount) => {
    const newQuantity = (quantities[item.id] || 1) + amount;
    if (newQuantity >= 1) {
      setQuantities({ ...quantities, [item.id]: newQuantity });
    }
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cart.filter((cartItem) => cartItem.id !== itemId);
    setCart(updatedCart);
  };
  // ... (other functions remain unchanged)
   const goToProfile = () => {
     navigate("/profile"); // Assuming "/profile" is the route for the profile page
   };

   const goToIntro = () =>{
    navigate("/intro");
   }

  return (
    <>
      <div className="container-fluid">
        <span style={{display:"flex", justifyContent:"space-between"}}>
          <button className="pbh" onClick={goToIntro}>
            Home
          </button>
          <button
            className="pbh"
            onClick={goToProfile} // Navigate to the profile page on click
          >
            Profile
          </button>
        </span>

        <div className="row">
          <h1 style={{ color: "#322f2d" }}>David's Desserts</h1>

          {/* <div className="row tttt"> */}
          <div className="col-lg-9 main">
            {isModalOpen && (
              <ConfirmOrderModal
                show={isModalOpen} // Pass the 'show' prop
                handleClose={handleCloseModal} // Ensure the prop name matches
                cart={cart}
              />
            )}

            {Data.map(({ id, tittle, desc, price, img }) => {
              const isHovered = hoveredItemId === id; // Check if the item is hovered

              return (
                <div key={id}>
                  <div className="main">
                    <div className="card2">
                      <span
                        className="image-container"
                        onMouseEnter={() => setHoveredItemId(id)}
                        onMouseLeave={() => setHoveredItemId(null)}
                      >
                        <img className="mainImg" src={img} alt={tittle} />
                        <div
                          className={`quantity-controls ${
                            isHovered ? "visible" : ""
                          }`} // Corrected syntax
                        >
                          <button
                            className="minus"
                            onClick={() =>
                              handleQuantityChange({ id, tittle, price }, -1)
                            }
                          >
                            -
                          </button>
                          <span
                            className="quantity"
                            onClick={() =>
                              addToCart({ id, tittle, price, desc, img })
                            }
                          >
                            {quantities[id] || 1}
                          </span>
                          <button
                            className="plus"
                            onClick={() =>
                              handleQuantityChange({ id, tittle, price }, 1)
                            }
                          >
                            +
                          </button>
                        </div>
                        <button
                          className={`add-to-cart-btn ${
                            isHovered ? "hidden" : ""
                          }`} // Corrected syntax
                          onClick={() =>
                            addToCart({ id, tittle, price, desc, img })
                          }
                        >
                          {/* SVG */}
                          Add to Cart
                        </button>
                      </span>
                      <span>
                        <p className="tittle">{tittle}</p>
                        <p className="desc">{desc}</p>
                        <p className="price">${price}</p>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="col-lg-3">
            <Cart
              onConfirmOrder={handleConfirmOrder}
              cart={cart}
              removeFromCart={removeFromCart}
            />{" "}
            {/* Pass the cart state to the Cart component */}
          </div>
        </div>
      </div>
      <ConfirmOrderModal
        show={isModalOpen}
        handleClose={handleCloseModal}
        cart={cart}
        clearCart={clearCart}
      />
      {/* <div className="co"></div> */}
      <Footer />
    </>
  );
};

export default Home;

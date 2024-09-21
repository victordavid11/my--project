const Order = require("./../models/Order");

exports.createOrder = async (req, res) => {
  const { cart, address } = req.body;

  if (!cart || cart.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  if (!address || address.trim() === "") {
    return res.status(400).json({ message: "Address is required" });
  }

  try {
    const total = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    // Create new order
    const newOrder = new Order({
      user: res.locals.user.id,
      cart: cart.map((item) => ({
        dessertId: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
      address,
      total,
    });

    const savedOrder = await newOrder.save();
    // const token = user.getJwtToken();
    // TODO: Send order confirmation email to restaurant owner/admin

    res
      .status(201)
      .json({ message: "Order placed successfully", order: savedOrder });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

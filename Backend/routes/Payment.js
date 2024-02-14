const express = require("express");
const router = express.Router();
const stripe = require("stripe")("sk_test_51ON9IWGOffRjuiXbCfwShaPB16cpqR8MXlj0vVmJSM12B6W3WfiYks6O85PGCxsHzX1FF5LYEZyttiQyAk20H2nR00FrmHMLpP");

// checkout api
router.post("/create-checkout-session", async (req, res) => {
  try {
    const { products } = req.body;

    const lineItems = products.map((product) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: product.title,
          images: [product.image],
        },
        unit_amount: product.price * 100,
      },
      quantity: product.qnty,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    console.log("Created Checkout Session:", session.id);

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

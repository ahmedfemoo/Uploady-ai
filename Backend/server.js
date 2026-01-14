// Backend باستخدام Node.js + Express
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
app.use(bodyParser.json());

// مفتاح API الخاص بك من Pi Developer Portal
const PI_API_KEY = "ضع هنا الـ API Key من بوابة المطورين";

const PI_API_URL = "https://api.minepi.com/v2";

// التحقق من الدفع
app.post("/verify-payment", async (req, res) => {
  const { paymentId } = req.body;

  try {
    const response = await fetch(`${PI_API_URL}/payments/${paymentId}`, {
      headers: {
        Authorization: `Key ${PI_API_KEY}`
      }
    });

    const payment = await response.json();

    if (payment && payment.status === "completed") {
      // الدفع ناجح
      console.log("Payment verified:", payment);
      res.json({ success: true, payment });
    } else {
      // الدفع غير مكتمل
      res.json({ success: false, payment });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ error: "Verification failed" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

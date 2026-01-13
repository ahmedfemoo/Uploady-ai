const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// الموافقة على الدفع
app.post("/approve", (req, res) => {
  const { paymentId } = req.body;
  console.log("موافقة على الدفع:", paymentId);
  // هنا تقدر تضيف منطق التحقق (مثلاً: تحقق من orderId أو المبلغ)
  res.send({ status: "APPROVED" });
});

// إكمال الدفع
app.post("/complete", (req, res) => {
  const { paymentId, txid } = req.body;
  console.log("إكمال الدفع:", paymentId, txid);
  // هنا تقدر تضيف منطق الإكمال (مثلاً: تحديث قاعدة البيانات)
  res.send({ status: "COMPLETED" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

Pi.init({ version: "2.0", sandbox: true });

const paymentData = {
  amount: 1,
  memo: "Test payment",
  metadata: { orderId: 123 }
};

document.getElementById("pay").addEventListener("click", () => {
  Pi.createPayment(paymentData, {
    onReadyForServerApproval: (paymentId) => {
      console.log("جاهز لموافقة السيرفر:", paymentId);
    },
    onReadyForServerCompletion: (paymentId, txid) => {
      console.log("المعاملة اكتملت:", paymentId, txid);
    },
    onCancel: (paymentId) => {
      console.log("المستخدم لغى الدفع:", paymentId);
    },
    onError: (error, paymentId) => {
      console.error("خطأ:", error, paymentId);
    }
  });
});

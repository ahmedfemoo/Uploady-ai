// تسجيل الدخول باستخدام Pi SDK
function login() {
  const scopes = ['username', 'payments'];

  function onIncompletePaymentFound(payment) {
    console.log("Incomplete payment:", payment);
  }

  Pi.authenticate(scopes, onIncompletePaymentFound)
    .then(function(auth) {
      console.log("User authenticated:", auth);
      alert("Welcome " + auth.user.username);
    })
    .catch(function(error) {
      console.error(error);
    });
}

// الدفع باستخدام Pi SDK
function pay(amount) {
  const paymentData = {
    amount: amount,
    memo: "Uploady Ai test payment",
    metadata: { type: "upload" }
  };

  const paymentCallbacks = {
    onReadyForServerApproval: function(paymentId) {
      console.log("Ready for server approval:", paymentId);
    },
    onReadyForServerCompletion: function(paymentId, txid) {
      console.log("Ready for server completion:", paymentId, txid);
    },
    onCancel: function(paymentId) {
      console.log("Payment cancelled:", paymentId);
    },
    onError: function(error, payment) {
      console.error("Payment error:", error, payment);
    }
  };

  Pi.createPayment(paymentData, paymentCallbacks)
    .then(function(payment) {
      console.log("Payment successful:", payment);
      alert("Payment successful!");
    })
    .catch(function(error) {
      console.error(error);
    });
}

// رفع ملف (نسخة تجريبية)
function uploadFile() {
  const fileInput = document.getElementById("fileInput");
  if (fileInput.files.length === 0) {
    alert("Please select a file first.");
    return;
  }
  const file = fileInput.files[0];
  console.log("File selected:", file.name);
  alert("File " + file.name + " uploaded successfully (demo).");
}

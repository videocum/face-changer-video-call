import React from "react";

export default function PaymentGate({ onSuccess }) {
  return (
    <div style={{ textAlign: "center", paddingTop: "100px" }}>
      <h2>Unlock Video Call with Face Changer</h2>
      <p>Pay ₦7,000 weekly to continue</p>
      <a
        href="https://flutterwave.com/pay/ukrxrhhsp47e"
        target="_blank"
        rel="noreferrer"
      >
        <button style={{ fontSize: "18px", padding: "10px 20px" }}>
          Pay Now with Flutterwave
        </button>
      </a>
      <br /><br />
      <button onClick={onSuccess}>✅ I Have Paid</button>
    </div>
  );
}

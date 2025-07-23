import React, { useState } from "react";
import PaymentGate from "./PaymentGate.jsx";
import VideoCall from "./VideoCall.jsx";

export default function App() {
  const [isPaid, setIsPaid] = useState(false);

  return (
    <div>
      {isPaid ? (
        <VideoCall />
      ) : (
        <PaymentGate onSuccess={() => setIsPaid(true)} />
      )}
    </div>
  );
}

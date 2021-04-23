import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SimpleCardForm from "./SimpleCardForm";
import SplitCardForm from "./SplitCardForm";


const stripePromise = loadStripe(
  "pk_test_51IgBWFJnP3U4GjEnXtSaq5Z35nZ4hwRJ4E56AXuViQLNYB8Gowg0nOsjGpHCrX4FGJWUBFdvmagrt0j27jqTZety00U9iLswPR"
);

const ProcessPayment = ({handlePayment}) => {
  return (
    <Elements stripe={stripePromise}>
      <SimpleCardForm handlePayment={handlePayment}></SimpleCardForm>
      {/* <SplitCardForm></SplitCardForm> */}
    </Elements>
  );
};

export default ProcessPayment;

import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

import './stripe-button.styles.scss';


const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publihableKey = 'pk_test_51I7tZgCj6FuGdmqwOlO5lSWBi9IiCbqjRkoA3qe4HVwzoDryZV2rayA8Wr3fQJW01Af72jQO9OKSYZo9YOo70lDO00uwWBhX4R';

    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
    }

    return (
        <StripeCheckout
            label='Pay Now'
            name='Clothing'
            billingAddress
            shippingAddress
            image='https://sendeyo.com/up/d/f3eb2117da'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publihableKey}
        />
    )
};

export default StripeCheckoutButton;
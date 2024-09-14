import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useState } from "react";
import useAxiosPublic from "../Hooks/axiosPublic";
import { AuthContext } from "../../Shared/AuthContext/AuthProvider";

const CheckOut = () => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosPublic = useAxiosPublic();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [fundAmount, setFundAmount] = useState('');
    const {user} = useContext(AuthContext);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error.message);
            return;
        }

        setError('');
        try {
            // Send the payment method ID and amount to the server to create a payment intent
            const response = await axiosPublic.post("/create-payment-intent", {
                amount: fundAmount,
                paymentMethodId: paymentMethod.id,
            });

            const { clientSecret } = response.data;

            // Confirm the payment with Stripe using the clientSecret
            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethod.id,
            });

            if (confirmError) {
                setError(confirmError.message);
                return;
            }

            // If payment is successful, store payment info in the database
            const payment = {
                name: user?.displayName,
                email: user?.email,
                amount: fundAmount,  // Use fundAmount here
                date: new Date(),
                transactionId: paymentIntent.id,
            };

             axiosPublic.post('/funds', payment )
             .then(res=>console.log(res))

            setSuccess('Payment successful!');
        } catch (error) {
            setError('Payment failed. Please try again.');
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Give a Fund</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="number" 
                    placeholder="Amount" 
                    value={fundAmount} 
                    onChange={(e) => setFundAmount(e.target.value)} 
                    className="input input-bordered mb-4" 
                    required 
                />
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn btn-primary mt-4" type="submit" disabled={!stripe}>
                    Pay
                </button>
            </form>
            {error && <p className="text-red-600 mt-2">{error}</p>}
            {success && <p className="text-green-600 mt-2">{success}</p>}
        </div>
    );
};

export default CheckOut;

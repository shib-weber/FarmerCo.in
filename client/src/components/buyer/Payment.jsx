import farmerimg from '../../assets/farmer.webp';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './navbar';

export default function Payment() {
    const location = useLocation();
    const { item } = location.state;

    const [offer, setOffer] = useState({});
    const [paymentMethod, setPaymentMethod] = useState(''); // State for payment method
    const [deliveryAddress, setDeliveryAddress] = useState(''); // State for delivery address
    const [deliveryOption, setDeliveryOption] = useState('standard'); // State for delivery option

    useEffect(() => {
        const offerLoad = async () => {
            const response = await fetch(`http://localhost:4000/api/buyer/offerc/${item._id}`, {
                method: "GET",
                credentials: "include"
            });
            const result = await response.json();
            setOffer(result);
        };

        offerLoad();
    }, [item._id]);

    const handleClickPay = async () => {
        if (!paymentMethod || !deliveryAddress) {
            alert("Please fill in all the fields.");
            return;
        }

        const response = await fetch(`http://localhost:4000/api/buyer/pay`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify({
                paymentMethod,
                deliveryAddress,
                deliveryOption,
                itemId: item._id,
                totalPrice: item.weight * offer.price
            })
        });
        const result = await response.json();
        console.log(result);

        if (result === 'done') {
            // Payment success actions
            console.log('Payment successful');
        } else {
            console.log('Error paying');
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
                <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 bg-white shadow-md rounded-lg overflow-hidden">
                    {/* Image section */}
                    <div className="relative h-48 w-full overflow-hidden">
                        <img
                            className="absolute top-0 left-0 w-full h-full object-cover"
                            src={farmerimg}
                            alt="Crop"
                        />
                    </div>

                    {/* Card body section */}
                    <div className="p-6">
                        <h2 className="text-2xl font-semibold mb-4">{item.name}</h2>
                        <p className="mb-2 text-gray-700">Crop: <span className="font-medium">{item.crop}</span></p>
                        <p className="mb-2 text-gray-700">Rating: <span className="font-medium">{item.rate}</span></p>
                        <p className="mb-2 text-gray-700">Total Amount in Kg: <span className="font-medium">{item.weight}</span></p>
                        <p className="mb-2 text-gray-700">Selling Price per Kg: <span className="font-medium">₹{item.sp}</span></p>
                        <p className="mb-2 text-gray-700">Selling Price Offered per Kg: <span className="font-medium">₹{offer.price}</span></p>
                        <p className="mb-2 text-gray-700">Description: <span className="font-medium">{item.description}</span></p>
                        <p className="text-xl font-bold text-green-700 mt-4">Total: ₹{item.weight * offer.price}</p>

                        {/* Payment Method Section */}
                        <div className="mt-6">
                            <label className="block text-gray-600 font-semibold mb-2">Choose Payment Method:</label>
                            <select
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            >
                                <option  value="">Select Payment Method</option>
                                <option className='justify-center' value="credit-card">Credit Card</option>
                                <option value="debit-card">Debit Card</option>
                                <option value="net-banking">Net Banking</option>
                                <option value="upi">UPI</option>
                                <option value="cash-on-delivery">Cash on Delivery</option>
                            </select>
                        </div>

                        {/* Delivery Address Section */}
                        <div className="mt-6">
                            <label className="block text-gray-600 font-semibold mb-2">Enter Delivery Address:</label>
                            <input
                                type="text"
                                value={deliveryAddress}
                                onChange={(e) => setDeliveryAddress(e.target.value)}
                                placeholder="Enter delivery address"
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            />
                        </div>

                        {/* Delivery Options Section */}
                        <div className="mt-6">
                            <label className="block text-gray-600 font-semibold mb-2">Select Delivery Option:</label>
                            <select
                                value={deliveryOption}
                                onChange={(e) => setDeliveryOption(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            >
                                <option value="standard">Standard Delivery</option>
                                <option value="express">Express Delivery</option>
                                <option value="self-pickup">Self Pickup</option>
                            </select>
                        </div>

                        {/* Proceed to Pay Button */}
                        <div className="mt-6">
                            <button
                                onClick={handleClickPay}
                                className="w-full bg-green-700 text-white p-2 rounded-lg hover:bg-green-800 transition duration-300"
                            >
                                Proceed To Pay
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

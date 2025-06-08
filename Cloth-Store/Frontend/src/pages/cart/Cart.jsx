import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'

const Cart = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate()
    
    
    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:8081/api/user/cart/getcart',
                    {
                        headers: {
                            id: localStorage.getItem('id'),
                        },
                    }
                );
                if (response.status === 200) {
                    // Add manual quantity to each item
                    const updatedData = response.data.cart.map(item => ({
                        ...item,
                        quantity: 1 // default quantity (manually set to 1 for now)
                    }));
                    setData(updatedData);
                }
            } catch (err) {
                console.error("Error fetching cart:", err);
            }
        };

        fetch();
    }, [data]);

    // Compute price after discount
    const getDiscountedPrice = (item) => {
        return item.price - (item.price * item.discount / 100);
    };

    //remove from the cart
    const removefromCart = async(id)=>{
        try{
            const response = await axios.put('http://localhost:8081/api/user/cart/removecart',{},{
                headers:{
                    'Authorization':`Bearer ${localStorage.getItem('token')}`,
                    id:localStorage.getItem('id'),
                    clothid:id,
                }
            })
           if(response.status===200){
            fetch()
           }
        }
        catch(err){
            console.log(err)
        }
    }
    const handleOrder = async()=>{
        try{
            const response = await axios.post('http://localhost:8081/api/user/order/order-place',{order:data},{
                headers:{
                    'Authorization':`Bearer ${localStorage.getItem('token')}`,
                    id:localStorage.getItem('id')
                }
            })
            if(response.status===200){
              alert(response.data.message)
              navigate('/profile')
            }
        }
        catch(err){
            console.log(err)
        }
    }

    const subtotal = data.reduce((sum, item) => { //it accumaltes through array elements and allow to acess the single value
        return sum + getDiscountedPrice(item) * item.quantity;
    }, 0);

    const tax = 5;
    const total = subtotal + tax;

    return (
        <div className="p-8">
            <table className="w-full">
                <thead>
                    <tr className="bg-orange-500 text-white text-left">
                        <th className="p-3">Product</th>
                        <th className="p-3">Quantity</th>
                        <th className="p-3">Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item._id} className="border-b relative text-neutral-800">
                            <td className="p-3 flex md:flex-row flex-col gap-4 items-center">
                                <img
                                    src={`http://localhost:8081/${item.img}`}
                                    alt={item.title}
                                    className="w-16 h-16 object-cover border rounded"
                                />
                                <span className='absolute top-4 left-4 px-1 py-1 border-2 rounded-sm font-bold text-red-400'>
                                    <small>{item.discount}% off</small>
                                </span>
                                <div>
                                    <h1 className="font-semibold">{item.title}</h1>
                                    <div className="text-sm text-gray-600">
                                        <span className="text-green-400">${item.price}</span>
                                    </div>
                                    <button onClick={()=>removefromCart(item._id)} className="text-red-500 text-sm hover:underline mt-1">Remove</button>
                                </div>
                            </td>
                            <td className="p-3">{item.quantity}</td>
                            <td className="p-3">${(getDiscountedPrice(item) * item.quantity).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Totals */}
            <div className="mt-8 w-full flex justify-end">
                <div className="w-full max-w-sm">
                    <div className="flex justify-between py-2 border-b">
                        <span className="font-medium">Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                        <span className="font-medium">Tax</span>
                        <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-t font-semibold text-lg">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <button 
                    className='p-3 rounded-2xl shadow-sm flex items-center bg-red-500/80 text-neutral-200 hover:bg-red-500 transition-all ease-in-out duration-300'
                    onClick={handleOrder}
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;

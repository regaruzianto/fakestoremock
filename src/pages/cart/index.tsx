import React from 'react'
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { CartItem } from '@/Interface/interface';
import { useAuth } from '@/context/AuthContext';


const Cart: React.FC   =() => {

    const { cartItem , addCartItem, removeCartItem, updateQuantity, clearCart} = useCart();
    const {isAuthenticated, login, logout}= useAuth();
    const [modalOpen, setModalOpen] = useState(false);

    
    const calculateTotal = (item : CartItem ) => {
      return item.price*item.quantity;
    }

    const calculateTotalPrice = ( )=> {
        return cartItem.reduce((total, item ) => {
            return total + (item.price*item.quantity)
        },0);
    }
    
    const handleCheckOut = () => {
        if(cartItem.length > 0){
            clearCart();
            setModalOpen(true);
        }
    }
    const handleCloseModal = () => setModalOpen(false);




  return (
    <div className='flex items-center justify-center'>
        <div className='w-full max-w-6xl p-8 space-y-8 bg-white rounded min-h-screen'>
        <h1 className='text-left text-2xl font-bold'>Your Cart</h1>
        <table className='w-full'>
            <thead>
                <tr className='border-b-2 border-b-gray-300'>
                    <th className='text-left text-gray-400 font-normal text-sm'>Product</th>
                    <th className=' text-gray-400 font-normal text-sm'>Quantity</th>
                    <th className=' text-gray-400 font-normal text-sm'>Total</th>
                    <th className=' text-gray-400 font-normal text-sm'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {cartItem.map(item => (
                    <tr key={item.id} className='border-b-2 border-b-gray-300 h-40'>
                        <td>
                            <div className='flex gap-4'>
                                <img src={item.image} alt="" className='w-32' />
                                <div className='flex flex-col justify-center'>
                                    <span>{item.title}</span>
                                </div>    

                            </div>
                            </td>
                        <td>
                            <input
                                name='quantity'
                                type='number'
                                min='1'
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                className='w-12'
                            />
                        </td>
                        <td>{calculateTotal(item).toFixed(2)}</td>
                        <td>
                            <button onClick={() => removeCartItem(item.id)}>Remove</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

        <div className='text-right'>
            <h1>
                Estimated total 
            </h1>
            <span className='text-xl font-bold'>
                $ {calculateTotalPrice().toFixed(2)}
            </span>
            
        </div>

        <div className='text-right'>
            <button className="border w-52 bg-black text-white py-2 px-4 rounded hover:border-gray-700" onClick={handleCheckOut}>Checkout</button>
        </div>
    </div>




    </div>
  )
}

export default Cart
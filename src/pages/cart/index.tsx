import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { CartItem } from '@/Interface/interface';
import { useAuth } from '@/context/AuthContext';
import { Snackbar, Alert } from '@mui/material';

const Cart: React.FC = () => {
  const {
    cartItem,
    removeCartItem,
    updateQuantity,
    clearCart,
  } = useCart();

  const { isAuthenticated } = useAuth();

  const [modalOpen, setModalOpen] = useState(false);
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');
  const [alertMessage, setAlertMessage] = useState('');

  const calculateTotal = (item: CartItem) => {
    return item.price * item.quantity;
  };

  const calculateTotalPrice = () => {
    return cartItem.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  const handleCheckOut = () => {
    // cek login dulu
    if (!isAuthenticated) {
      setAlertType('error');
      setAlertMessage('Silakan login terlebih dahulu!');
      setModalOpen(true);
      return;
    }

    // cek cart kosong
    if (cartItem.length === 0) {
      setAlertType('error');
      setAlertMessage('Keranjang masih kosong!');
      setModalOpen(true);
      return;
    }

    // checkout berhasil
    clearCart();

    setAlertType('success');
    setAlertMessage('Checkout berhasil!');
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className='flex items-center justify-center'>
      <div className='w-full max-w-6xl p-8 space-y-8 bg-white rounded min-h-screen'>
        <h1 className='text-left text-2xl font-bold'>Your Cart</h1>

        <table className='w-full'>
          <thead>
            <tr className='border-b-2 border-b-gray-300'>
              <th className='text-left text-gray-400 font-normal text-sm'>
                Product
              </th>
              <th className='text-gray-400 font-normal text-sm'>
                Quantity
              </th>
              <th className='text-gray-400 font-normal text-sm'>
                Total
              </th>
              <th className='text-gray-400 font-normal text-sm'>
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {cartItem.map((item) => (
              <tr
                key={item.id}
                className='border-b-2 border-b-gray-300 h-40'
              >
                <td>
                  <div className='flex gap-4'>
                    <img src={item.image} alt='' className='w-32' />

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
                    onChange={(e) =>
                      updateQuantity(
                        item.id,
                        parseInt(e.target.value)
                      )
                    }
                    className='w-12'
                  />
                </td>

                <td>
                  ${calculateTotal(item).toFixed(2)}
                </td>

                <td>
                  <button
                    onClick={() => removeCartItem(item.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className='text-right'>
          <h1>Estimated total</h1>

          <span className='text-xl font-bold'>
            $ {calculateTotalPrice().toFixed(2)}
          </span>
        </div>

        <div className='text-right'>
          <button
            className='border w-52 bg-black text-white py-2 px-4 rounded hover:border-gray-700'
            onClick={handleCheckOut}
          >
            Checkout
          </button>
        </div>
      </div>

      <Snackbar
        open={modalOpen}
        autoHideDuration={3000}
        onClose={handleCloseModal}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Alert
          onClose={handleCloseModal}
          severity={alertType}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Cart;
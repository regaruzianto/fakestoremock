import React, { useState } from 'react'
import { GetServerSideProps } from 'next';
import { ProductsData } from '@/Interface/interface';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';


interface ProductsProps {
    products : ProductsData;
}

function productId({products}: ProductsProps) {

    const {cartItem, addCartItem, removeCartItem, updateQuantity} = useCart();
    const {isAuthenticated} = useAuth();
    const [alertOpen,setAlertOpen] = useState(false)

    const addCart = (product : ProductsData) => {
        if(isAuthenticated){
            addCartItem(product);
            setAlertOpen(true);
        }else{ 

            setAlertOpen(true);
        }
    };
    console.log(cartItem);
    
    
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
        setAlertOpen(false); 
        
    };

   
  return (
    <div className='flex flex-col items-center justify-center margin mt-6 mb-9 mx-36 min-h-[450px]'>
        
        <div className='flex justify-around '>
            <div className='flex flex-col items-center w-3/5'>
                <img className='max-w-sm' src={products.image} alt="" />
            </div>
  
            <div className='w-2/5 ml-2'>
                <h1 className='text-2xl font-bold text-start' >{products.title}</h1>
                <p className='text-justify my-4'>{products.description}</p>
                <p className='text-justify my-4 text-2xl'>$ {products.price}</p>
                <button className="border w-96 text-black py-2 px-4 rounded hover:border-gray-700" onClick={() => addCart(products)} >Add to Cart</button>

            </div>
  
        </div>
        <Snackbar
                open={alertOpen}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                {isAuthenticated ? (
                    <Alert onClose={handleClose} severity="success">
                        berhasil menambahakan ke keranjang !
                    </Alert>
                ) : (
                    <Alert onClose={handleClose} severity="error">
                        Login untuk menambahkan ke keranjang !
                    </Alert>
                )}
        </Snackbar>
        
    </div>
  )
}

export default productId

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const response = await fetch (`https://fakestoreapi.com/products/${params?.productId}`);
    const products = await response.json();
    console.log(products)
    return{
        props :{
            products,
        }
    };
};
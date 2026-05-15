import React, { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next';
import { ProductsData } from '@/Interface/interface';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
import { useRouter } from 'next/router';
import { getProductById } from '../../api/Api';

interface ProductsProps {
    products : ProductsData;
}

function productId() {

    const router = useRouter();

    const {cartItem, addCartItem, removeCartItem, updateQuantity} = useCart();
    const {isAuthenticated} = useAuth();
    const [alertOpen,setAlertOpen] = useState(false)
    const {productId} = router.query;

    const [product, setProduct] = useState<ProductsData>();

    useEffect(() => {
        if (!productId) return;
        const fetchProductData = async () => {
            try {
                const productData = await getProductById(Number(productId));
                setProduct(productData.data);
            } catch (error) {
                console.error('Failed to fetch product data', error);
            }
        };

        fetchProductData();
    }, [productId]);

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
                <img className='max-w-sm' src={product?.image} alt="" />
            </div>
  
            <div className='w-2/5 ml-2'>
                <h1 className='text-2xl font-bold text-start' >{product?.title}</h1>
                <p className='text-justify my-4'>{product?.description}</p>
                <p className='text-justify my-4 text-2xl'>$ {product?.price}</p>
                <button className="border w-96 text-black py-2 px-4 rounded hover:border-gray-700" onClick={() => addCart(product!)} >Add to Cart</button>

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

<<<<<<< HEAD
=======
export const getServerSideProps: GetServerSideProps = async ({params}) => {

    let products : ProductsData[] = [];
    try {
        const response = await fetch (`https://fakestoreapi.com/products/${params?.productId}`);

        if (!response.ok) {
            const html = await response.text();
            console.error("Products API Error:", response.status, html);
            return { notFound: true };
        }

        products = await response.json();

    }catch(error){
        console.log(error);
    }

    console.log(products)
    return{
        props :{
            products,
        }
    };
};
>>>>>>> 72e506e3ea50a17f8d409da11f77f680a3cc2223

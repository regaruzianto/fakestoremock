import React, { useEffect, useState } from 'react'
import CategoryProducts from '@/components/CategoryProducts'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router';
import { ProductsData } from '@/Interface/interface';
<<<<<<< HEAD
import { getCategory, getProducts } from '../../api/Api';

interface CategoryProductsProps {
  categories : string[],
  products : ProductsData[] 
}

=======
import { CategoryProductsProps } from '@/Interface/interface';
>>>>>>> 72e506e3ea50a17f8d409da11f77f680a3cc2223


function index() {
  const [products, setProducts] = useState<ProductsData[]>([]);
  const [categories, setCategories] = useState<string[]>([])

  useEffect(()=> {
    const fetchProduct = async ()=> {
      try{
        const response = await getProducts();
        setProducts(response.data)
      }catch(error){
        console.error('failed fetch products');

      };
      
    }
    fetchProduct();
  },[])

  useEffect(() => {
    const fetchCategories = async ()=> {
      try{
        const response = await getCategory();
        setCategories(response.data)
      }catch(error){
        console.error('failed fetch category');
      };
    }
    fetchCategories();
  },[])
  
  
  
  return (
    <div>
      <CategoryProducts products={products} categories={categories} />
        
    </div>
  )
}

export default index

<<<<<<< HEAD
// export const getServerSideProps: GetServerSideProps = async () => {
//     const response = await fetch ("https://fakestoreapi.com/products");
//     const products = await response.json();

//     const responseCategory = await fetch ("https://fakestoreapi.com/products/categories");
//     const categories = await responseCategory.json();
=======
export const getServerSideProps: GetServerSideProps = async () => {
  let products : ProductsData[] = [];
  let categories : string[] = [];


  try {
    const response = await fetch ("https://fakestoreapi.com/products");

    if (!response.ok) {
      
      const html = await response.text();                                 

      console.error("Products API Error:", response.status, html);
      return { notFound: true };
    
    }else {
      products = await response.json();
    }

    const responseCategory = await fetch ("https://fakestoreapi.com/products/categories");

    if(!responseCategory.ok) {
      
      const html = await responseCategory.text();                                 

      console.error("Categories API Error:", responseCategory.status, html);
      return { notFound: true };
    
    }else {
      categories = await responseCategory.json();
    }
  
  }catch (error) {
    console.error("FETCH FAILED:", error);
  }  
>>>>>>> 72e506e3ea50a17f8d409da11f77f680a3cc2223
   
//     return{
//         props :{
//             products,
//             categories
//         }
//     };
// };

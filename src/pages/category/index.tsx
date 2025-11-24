import React from 'react'
import CategoryProducts from '@/components/CategoryProducts'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router';
import { ProductsData } from '@/Interface/interface';
import { CategoryProductsProps } from '@/Interface/interface';


function index({products,categories}:CategoryProductsProps) {
  return (
    <div>
      <CategoryProducts products={products} categories={categories} />
        
    </div>
  )
}

export default index

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
   
    return{
        props :{
            products,
            categories
        }
    };
};

import React from 'react'
import { ProductsData } from '@/Interface/interface'
import { GetServerSideProps } from 'next'
import CategoryProducts from '@/components/CategoryProducts'
import { CategoryProductsProps } from '@/Interface/interface'


function categoryName({products,categories}:CategoryProductsProps) {


  return (
    <div>
        <CategoryProducts products={products} categories={categories} />
    </div>
  )
}

export default categoryName

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    
  let products : ProductsData[] = [];
  let categories : string[] = [];


  try {
    const categoryName = params?.categoryName
    const response = await fetch (`https://fakestoreapi.com/products/category/${categoryName}`);

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
}
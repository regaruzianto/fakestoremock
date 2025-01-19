import React from 'react'
import CategoryProducts from '@/components/CategoryProducts'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router';
import { ProductsData } from '@/Interface/interface';

interface CategoryProductsProps {
  categories : string[],
  products : ProductsData[] 
}



function index({products,categories}:CategoryProductsProps) {
  return (
    <div>
      <CategoryProducts products={products} categories={categories} />
        
    </div>
  )
}

export default index

export const getServerSideProps: GetServerSideProps = async () => {
    const response = await fetch ("https://fakestoreapi.com/products");
    const products = await response.json();

    const responseCategory = await fetch ("https://fakestoreapi.com/products/categories");
    const categories = await responseCategory.json();
   
    return{
        props :{
            products,
            categories
        }
    };
};

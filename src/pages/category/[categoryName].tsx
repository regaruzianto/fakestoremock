import React from 'react'
import { ProductsData } from '@/Interface/interface'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import CategoryProducts from '@/components/CategoryProducts'


interface CategoryProductsProps {
  categories : string[],
  products : ProductsData[] 
}

function categoryName({products,categories}:CategoryProductsProps) {
  return (
    <div>
        <CategoryProducts products={products} categories={categories} />
    </div>
  )
}

export default categoryName

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    
    const response = await fetch (`https://fakestoreapi.com/products/category/${params?.categoryName}`);
    const products = await response.json();
    console.log(products)
    
    const responseCategory = await fetch ("https://fakestoreapi.com/products/categories");
    const categories = await responseCategory.json();
    
    return{
        props :{
            products,
            categories
        }
    };
}
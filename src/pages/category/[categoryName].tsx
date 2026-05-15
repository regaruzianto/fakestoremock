<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { ProductsData } from '@/Interface/interface';
import { useRouter } from 'next/router';
=======
import React from 'react'
import { ProductsData } from '@/Interface/interface'
import { GetServerSideProps } from 'next'
import CategoryProducts from '@/components/CategoryProducts'
import { CategoryProductsProps } from '@/Interface/interface'
>>>>>>> 72e506e3ea50a17f8d409da11f77f680a3cc2223

import CategoryProducts from '@/components/CategoryProducts';

<<<<<<< HEAD
import {
  getCategory,
  getProductByCategory,
} from '../../api/Api';

function CategoryName() {
  const router = useRouter();
=======
function CategoryName({products,categories}:CategoryProductsProps) {
>>>>>>> 72e506e3ea50a17f8d409da11f77f680a3cc2223

  const { categoryName } = router.query;

  const [productData, setProductData] =
    useState<ProductsData[]>([]);

  const [categoryData, setCategoryData] =
    useState<string[]>([]);

  useEffect(() => {
    if (!categoryName) return;

    const fetchProductData = async () => {
      try {
        const response = await getProductByCategory(
          categoryName as string
        );

        setProductData(response.data);

        console.log(response, 'product by category data');
      } catch (error) {
        console.error(
          'failed get product data',
          error
        );
      }
    };

    fetchProductData();
  }, [categoryName]);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await getCategory();

        setCategoryData(response.data);

        console.log(response, 'category data');
      } catch (error) {
        console.error(
          'failed get category data',
          error
        );
      }
    };

    fetchCategoryData();
  }, []);

  return (
    <div>
      <CategoryProducts
        products={productData}
        categories={categoryData}
      />
    </div>
  );
}

<<<<<<< HEAD
export default CategoryName;
=======
export default CategoryName

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
>>>>>>> 72e506e3ea50a17f8d409da11f77f680a3cc2223

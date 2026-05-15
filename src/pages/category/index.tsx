import React, { useEffect, useState } from 'react'
import CategoryProducts from '@/components/CategoryProducts'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router';
import { ProductsData } from '@/Interface/interface';
import { getCategory, getProducts } from '../../api/Api';

interface CategoryProductsProps {
  categories : string[],
  products : ProductsData[] 
}



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



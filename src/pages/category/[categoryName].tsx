import React, { useEffect, useState } from 'react';
import { ProductsData } from '@/Interface/interface';
import { useRouter } from 'next/router';

import CategoryProducts from '@/components/CategoryProducts';

import {
  getCategory,
  getProductByCategory,
} from '../../api/Api';

function CategoryName() {
  const router = useRouter();

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

export default CategoryName;

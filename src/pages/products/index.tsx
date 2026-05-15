import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,

} from '@mui/material';

import Grid from '@mui/material/Grid2';

import { ProductsData } from '@/Interface/interface';
import { useRouter } from 'next/router';
import { getCategory, getProducts } from '../../api/Api';

function Products() {
  const router = useRouter();

  const [products, setProducts] = useState<ProductsData[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();

        // kalau api service sudah return response.data
        setProducts(response.data);

        console.log(response, 'product data');
      } catch (error) {
        console.error('failed fetch product', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategory();

        setCategories(response.data);

        console.log(response, 'category data');
      } catch (error) {
        console.error('failed fetch category', error);
      }
    };

    fetchCategories();
  }, []);

  const handleClick = (item: ProductsData) => {
    router.push(`/products/${item.id}`);
  };

  const handleClickCategory = (category: string) => {
    router.push(`/category/${category}`);
  };

  return (
    <div className='flex flex-col items-center justify-center p-8 space-y-8 max-w-7xl m-auto'>
      
      {/* CATEGORY */}
      <div className='w-full text-center'>
        <h1 className='text-2xl font-bold mb-4'>
          Category Products
        </h1>

        <ul className='flex flex-wrap gap-3 justify-center'>
          {categories.map((category) => (
            <li
              key={category}
              onClick={() => handleClickCategory(category)}
              className='border-green-500 border-2 px-4 py-1 rounded-full hover:bg-green-500 hover:text-white cursor-pointer capitalize transition-all duration-200'
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      {/* PRODUCT GRID */}
      <Grid
        container
        spacing={3}
        justifyContent='center'
        sx={{ width: '100%' }}
      >
        {products.map((product) => (
          <Grid            
          key={product.id}
            
            sx={{
              display: 'flex',
              justifyContent: 'center'}}
            size={3}
          >
            <Card
              sx={{
                width: '100%',
                maxWidth: 250,
                height: 340,
                margin: 'auto',
                borderRadius: '12px',
                boxShadow: 3,
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6,
                },
              }}
            >
              <CardActionArea
                onClick={() => handleClick(product)}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'stretch',
                }}
              >
                <CardMedia
                  component='img'
                  image={product.image}
                  alt={product.title}
                  sx={{
                    height: 180,
                    objectFit: 'contain',
                    padding: 2,
                    backgroundColor: '#f5f5f5',
                  }}
                />

                <CardContent
                  sx={{
                    flexGrow: 1,
                    width: '100%',
                  }}
                >
                  <Typography
                    gutterBottom
                    variant='h6'
                    sx={{
                      height: 60,
                      fontSize: '0.95rem',
                      lineHeight: '1.2rem',
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {product.title}
                  </Typography>

                  <Typography
                    variant='body2'
                    color='text.secondary'
                    sx={{
                      textTransform: 'capitalize',
                      mb: 1,
                      fontSize: '0.8rem',
                    }}
                  >
                    {product.category}
                  </Typography>

                  <Typography
                    variant='h6'
                    color='success.main'
                    sx={{
                      fontWeight: 'bold',
                    }}
                  >
                    ${product.price}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Products;
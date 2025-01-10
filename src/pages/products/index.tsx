import React from 'react';
import { GetServerSideProps } from 'next';
import { Card, CardContent, CardMedia, Grid, Grid2, Typography, Pagination, CardActionArea } from '@mui/material';
import { ProductsData } from '@/Interface/interface';
import { useRouter } from 'next/router';


interface ProductsProps {
    products : ProductsData[];
}



function Products({products}: ProductsProps) {
    const router = useRouter()
    
    const handleclick = (item: ProductsData) => {
        router.push(`/products/${item.id}`)
    }


  return (
    <div className='flex flex-col items-center justify-center p-8 space-y-8 max-w-6xl m-auto'>
        <Grid2 container spacing={2} sx={{justifyContent : 'center'}}>
        {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={2}  >
            <CardActionArea>
                <Card onClick={()=>handleclick(product)}  sx={{ width: 200, height: 300, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <CardMedia
                    component="img"
                    sx={{ height:"130px", objectFit: "contain"}}
                    image={product.image}
                    alt={product.title}
                    />
                    <CardContent sx={{ padding : '8px', width: '100%'}}>
                        <Typography gutterBottom variant="h6" component="div" sx={{ height : '80px', letterSpacing : '0px', lineHeight : '1.1rem' ,fontSize : '0.85rem', textAlign:'left'}}>
                            {product.title}
                        </Typography>

                        <Typography variant="body2" color="text.primary" sx={{ height :'16px', textAlign: 'left', fontSize :"0.7rem", marginBottom: "0.35em"  }}>
                            {product.category}
                        </Typography>

                        <Typography variant="body2" color="text.primary" sx={{ textAlign: 'left', fontSize :"0.9rem" }}>
                        ${product.price}
                        </Typography>
                    </CardContent>
                </Card>

            </CardActionArea>

            </Grid>

        ))}
        </Grid2>





    </div>
  )
}

export default Products


export const getServerSideProps: GetServerSideProps = async () => {
    const response = await fetch ("https://fakestoreapi.com/products");
    const products = await response.json();
   
    return{
        props :{
            products,
        }
    };
};
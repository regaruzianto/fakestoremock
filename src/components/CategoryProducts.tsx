import React from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { ProductsData } from '@/Interface/interface';
import { Grid2, Card, CardMedia, CardContent, Typography, CardActionArea } from '@mui/material';



interface CategoryProductsProps {
  categories : string[],
  products : ProductsData[] 
}


function CategoryProducts({categories, products}: CategoryProductsProps) {

  const router = useRouter()


  const handleClick = (item:ProductsData) => {
    router.push(`/products/${item.id}`)
  }

  const handleClickCategory = (category: string) => {
    router.push(`/category/${category}`)
  }

  return (
    <>
      <div className='w-[1200px] place-self-center my-6'>
        <div className='flex gap-4'>
          <div className='w-[15vw] flex flex-col gap-3'>
            <h1 className='text-lg font-bold'>Category</h1>
            <ul className='flex flex-col gap-5'>
              {categories.map((category) => (<li key={category} onClick={()=> handleClickCategory(category)} className='no-underline p-2 hover:opacity-50 cursor-pointer '>{category}</li>))}
            </ul>
            <div className='w-full bg-gray-300 h-[2px] my-6'></div>
          </div>
          
          <div className='w-[85vw] flex justify-center flex-wrap gap-4'>
            
            {products.map((product) => 
                <Grid2 key={product.id} sx={{ display: 'flex',  justifyContent: 'center',  alignItems: 'center'}} >
                  <CardActionArea>
                    <Card onClick={()=> handleClick(product)} sx={{ width: 200, height: 300, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding : '8px'}}>
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
                </Grid2>                 
            )}
            
          </div>    
        
        </div>

      </div>   
        
    </>
  )
}

export default CategoryProducts



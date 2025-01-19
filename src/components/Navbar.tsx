import React from 'react'
import Link from 'next/link'
import { Home, Login, Logout, Person } from '@mui/icons-material';
import {Badge} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAuth } from '@/context/AuthContext';
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
import { useCart } from '@/context/CartContext';
import gambar from '../assets/Shopbag (1).png'
import Image from 'next/image';



function Navbar() {

  const {isAuthenticated, login, logout}= useAuth();
  const {cartItem, getTotalQuantity}=useCart();
  const totalCartitem = getTotalQuantity();

  const handleLogout =() => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    logout();
  }

  return (
    <nav className="border-b-2 border-gray-100 p-6 ">
      <div className="container max-w-7xl mx-auto px-24 flex justify-between items-center">
          
        <div >        
            <Link href={'/category'} className='text-gray-500 hover:text-green-600'>
             <h1>Semua kategori</h1>
            </Link>             
        </div>
        
        <div className="text-lg">
          
          <Link href={'/'} className='text-gray-500 hover:text-gray-700'>
          <Image src={gambar} alt="Deskripsi Gambar" className="max-w-md object-cover" width={240} height={150} />

          </Link>
        
        </div>



        <ul className='flex gap-x-3'>
          <li>
            <Link href={'/products'} className='text-gray-500 hover:text-green-600'>
             <Home className='mr-2'  />
            </Link>
             
          </li>
          {isAuthenticated?( 
            <li>
              <button onClick={handleLogout} className='text-gray-500 hover:text-green-600'>
                <Logout className='mr-2'  />
              </button>                    
            </li>
          ) : ( 
            <li>
            <Link href={'/login'} className='text-gray-500 hover:text-green-600'>
              <Person className='mr-2'  />
            </Link>
            </li>
          )
          }
          <li>  
            <Badge badgeContent={typeof totalCartitem === 'number' ? totalCartitem : 0  } color="success">
              <Link href={'/cart'} className='text-gray-500 hover:text-green-600'>
                <ShoppingCartIcon className='mr-2' />
              </Link>
            </Badge>

          </li>
          
        </ul>
                  
      </div>
    </nav>
  )
}

export default Navbar
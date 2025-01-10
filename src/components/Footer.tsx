import React from 'react'
import Link from 'next/link'

function Footer() {
  return (
    <footer className="flex flex-col mt-24 text-gray-500 py-0 border-t-2 border-gray-100 max-h-52">
      <div>
        <h5 className='text-center my-6 text-black font-bold'>Pages</h5>
        <ul className='flex flex-wrap gap-x-5 justify-center text-sm max-w-2xl m-auto leading-8'>
          <li className='hover:underline'><Link href={''}>Collection</Link></li>
          <li className='hover:underline'><Link href={''}></Link>Delivery & return</li>
          <li className='hover:underline'><Link href={''}>FAQs</Link></li>
          <li className='hover:underline'><Link href={''}>About Us</Link></li>
          <li className='hover:underline'><Link href={''}>Contact Us</Link></li>
          <li className='hover:underline'><Link href={''}>Privacy policy</Link></li>
          <li className='hover:underline'><Link href={''}>Term of Service</Link></li>
          <li className='hover:underline'><Link href={''}>Refund policy</Link></li>
          <li className='hover:underline'><Link href={''}>Blog</Link></li>
          <li className='hover:underline'><Link href={''}>Home</Link></li>
        </ul>
      </div>
      <div className="container mx-auto text-center my-4 text-sm">
        <p>&copy; 2024 Tokomadura. All rights reserved.</p>
        <p>
          Follow us on{' '}
          <a href="https://twitter.com" className="text-blue-400 hover:underline">
            Twitter
          </a>{' '}
          and{' '}
          <a href="https://facebook.com" className="text-blue-400 hover:underline">
            Facebook
          </a>.
        </p>
      </div>
    </footer>
  )
}

export default Footer
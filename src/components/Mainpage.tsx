import React, { useEffect, useState } from 'react'
import gambar from '../assets/gambar.png'
import Router, { useRouter } from 'next/router';
import Image from 'next/image';
import grill from '../assets/grill.png';
import hedphone from '../assets/hedphone.png';
import hoodie from '../assets/hoodie.png';
import NB from '../assets/NB.png';
import relax from '../assets/relax.png';



function Mainpage() {

  const router = useRouter();
  const [imageIndex,setImageIndex] = useState(0);
  const carouselImages = [gambar,grill,hedphone,hoodie,NB,relax];
  const interval = 3000;


  const handleClick = ()=>{
    router.push('/products');
  }

  const handleNext = () => { 
    setImageIndex((prev)=> (prev === carouselImages.length -1 ? 0 : prev + 1  ));
  }
  const handlePrev = () => { 
    setImageIndex((prev)=> (prev === 0 ?carouselImages.length -1  : prev - 1  ));
  }

  useEffect(() => {
    const slideInterval = setInterval(() => {
      handleNext();
    }, interval);

    return () => clearInterval(slideInterval);
  }, [imageIndex, interval]);
  
  return (
    <div className="flex items-center justify-center my-6">
      <div className="flex w-full max-w-6xl p-4">
        <div className="w-1/2 flex justify-center ">
          {/* <Image src={gambar} alt="Deskripsi Gambar" className="max-w-md object-cover" width={500} height={500} loading="lazy"/> */}
          <div className='carousel relative w-full max-w-lg overflow-hidden content-center'>
            <button className='absolute top-1/2 translate-y-[-50%]  text-4xl cursor-pointer z-10 left-2 p-1 bg-transparent text-gray-400 hover:text-green-600' 
            onClick={handlePrev}>
              &#10094;
            </button>
            
            <div className='carousel-item flex justify-center items-center '>
              <Image src={carouselImages[imageIndex]} className='max-w-full' alt='gambar-1' width={500} height={500} loading="lazy"/>
            </div>
            
            <button className='absolute top-1/2 translate-y-[-50%]  text-4xl cursor-pointer z-10 right-2 bg-transparent p-1 text-gray-400 hover:text-green-600' 
            onClick={handleNext}>
              &#10095;
            </button> 
          </div>
        </div>
        
        <div className="w-1/2 text-left">
          <div className="p-20">
            <h1 className="text-left text-3xl font-bold my-7">"Temukan Semua Kebutuhan Anda Disini"</h1>
            <p className="text-left text-lg text-gray-500">"Buka setiap hari 24 jam, kiamat buka setengah hari"</p>
            <button className="border w-44 mt-7 bg-black text-white py-2 px-4 rounded hover:bg-green-600" onClick={handleClick}>
              Belanja sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mainpage
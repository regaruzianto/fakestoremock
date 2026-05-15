import localFont from "next/font/local";
import Mainpage from "@/components/Mainpage";
import { useEffect, useState } from "react";
import { ProductsData } from "@/Interface/interface";
import { getCategory, getProducts } from "@/api/Api";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  const [product, setProduct] = useState<ProductsData[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productData = await getProducts();
        setProduct(productData.data);
      }catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const categoryData = await getCategory();
        setCategories(categoryData.data);
      }catch (error) {
        console.error("Failed to fetch categories", error);
      };
    };

    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <div>
      
      <Mainpage products={product} categories={categories} />
      
    </div>
  );
}

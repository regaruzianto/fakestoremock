import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Mainpage from "@/components/Mainpage";
import Navbar from "@/components/Navbar";
import Layout from "@/components/Layout";
import { AuthProvider } from "@/context/AuthContext";
import { CartContextProvider } from "@/context/CartContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
        <CartContextProvider>
          <Layout>
            <Component {...pageProps} />

          </Layout>
        </CartContextProvider>
      </AuthProvider>


    </>
 
  );
}

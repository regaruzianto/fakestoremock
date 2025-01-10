import React, {createContext, ReactNode, useContext, useState} from 'react'
import { ProductsData } from '@/Interface/interface';


interface CartItem extends ProductsData {
  quantity: number;
}



interface CartContextType {
 cartItem : CartItem[];
 addCartItem : (product : Omit<ProductsData, 'quantity'>) => void;
 removeCartItem : (id : number) => void;
 updateQuantity : (id : number, quantity: number) => void;
 clearCart : ()=> void;
 getTotalQuantity : () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartContextProvider: React.FC<{children: ReactNode}> = ({children}) => {
  
  const [cartItem,setCartItem] = useState<CartItem[]>([])
  

  const addCartItem = (item : Omit<ProductsData, 'quantity'>) => {
    setCartItem( prevItem => {
      const existingItem = prevItem.find(element => element.id === item.id);
      if(existingItem){
        return prevItem.map(element => 
          element.id === item.id ? {...element, quantity: element.quantity + 1 } : element
        );
      }
      return [...prevItem, {...item, quantity:1}];
    });
  };


  const removeCartItem = (id: number) => {
    setCartItem(prevItem => prevItem.filter(elemen => elemen.id !== id));
  };


  const updateQuantity = (id: number, quantity: number) => {
    setCartItem(prevItem =>
      prevItem.map(element =>
        element.id === id ? { ...element, quantity } : element
      )
    );
  };

  
  const clearCart = () =>{
    setCartItem([]);
  };
  
  const getTotalQuantity = () : number => {
    return cartItem.reduce((total, item) => total + item.quantity,0);
  };
  
  
  return (
    <CartContext.Provider value={{cartItem , addCartItem, removeCartItem, updateQuantity, clearCart, getTotalQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};


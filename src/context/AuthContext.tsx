import React, { ReactNode, useState, createContext, useContext, useEffect} from 'react'


interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider : React.FC<{ children : ReactNode}> = ({children,}) => {
  
   
  const [isAuthenticated,setisAuthenticated] = useState<boolean>(false);

  useEffect(()=>{
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');
    if(token){
      setisAuthenticated(true);
    }
  },[]);



  const login = () => {
    setisAuthenticated(true);
  }

  const logout = () => {
    setisAuthenticated(false);
    localStorage.removeItem('token');
  }


    return (
     <AuthContext.Provider value = {{ isAuthenticated, login,logout}}>
        {children}
     </AuthContext.Provider>
    );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if(context === undefined) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
  return context;
};
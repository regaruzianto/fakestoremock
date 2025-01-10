import React, { useState } from 'react';
import { Formik, useFormik } from 'formik';
import * as Yup from "yup";
import { loginUser } from '@/pages/api/Api';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import Alert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';
import { useRouter } from 'next/router';



function Login() {
    
    const router = useRouter();
    const {isAuthenticated,login} = useAuth();
    const [rememberMe,setRememberMe] = useState(false);
    const [alertOpen,setAlertOpen] =useState(false);


    const validateSchema = Yup.object().shape({
        email : Yup.string().email().required('email required'),
        password : Yup.string().required('password required'),
    })


    const formik = useFormik({
        initialValues :{
            email : '',
            password : '',
        },
        validationSchema : validateSchema,
        onSubmit : async (values :{email : string, password : string}) => {
            try {
                const data = await loginUser(values)
                const token = data.access_token;
                if (token) {                    
                    rememberMe ? localStorage.setItem('token',token) : sessionStorage.setItem('token',token);                    
                }
                console.log(data);
                console.log(token);
                login();
                setAlertOpen(true);
                router.push('/products');
            }
            catch(error){
                console.log('error login failed',error);
                // alert('email or password wrong');
                setAlertOpen(true);
            }
        }
    }) 

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
        setAlertOpen(false); 
        
    };
 
    return (
        <div className='flex items-center justify-center min-h-screen'>
            <div className='w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md'>
                <h1 className='text-lg font-bold'>Login</h1>
                <form onSubmit={formik.handleSubmit} className='flex flex-col justify-normal text-left gap-2'>
                    
                    <label htmlFor='email' className='text-sm font-medium text-gray-700'>Email</label>
                    <input type="email" name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"/>
                    {
                        formik.touched.email && formik.errors.email && (
                            <small className='text-red-500'>
                                {formik.errors.email}
                            </small>
                        )
                    }


                    <label htmlFor="password" className='text-sm font-medium text-gray-700'>Password</label>
                    <input type="password" name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} className='className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"'/>
                    {
                        formik.touched.password && formik.errors.password && (
                            <small className='text-red-500'>
                                {formik.errors.password}
                            </small>
                        )
                    }

                    
                    <label htmlFor=""> 
                        <input type="checkbox" name='rememberMe' onChange={()=> {setRememberMe(true)}} className='mr-1'/>
                        Remember Me
                    </label>

                    <button type='submit' name='login' className="bg-green-500 text-white py-2 px-4 rounded my-4">Log in</button>

                    <small className='text-center'>Don't have an accout? <Link href="/" className='hover:underline text-green-500'> Sign Up</Link></small>
                </form>               


            </div>
            <Snackbar
                open={alertOpen}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                {isAuthenticated ? (
                    <Alert onClose={handleClose} severity="success">
                        Login berhasil! — Selamat datang!
                    </Alert>
                ) : (
                    <Alert onClose={handleClose} severity="error">
                        Login gagal! — Periksa username dan password Anda!
                    </Alert>
                )}
            </Snackbar>
            
        </div>
  )
}

export default Login
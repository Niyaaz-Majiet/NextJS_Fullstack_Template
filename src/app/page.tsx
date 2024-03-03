'use client';
import styles from './page.module.css';
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getAuthState, loginUser } from '@/redux/slices/auth_slice';
import { useRouter } from 'next/navigation'
import { useEffect } from 'react';

const HomePage = (): JSX.Element => {
  const router = useRouter()
  const authState = useAppSelector(getAuthState);
  const dispatch = useAppDispatch();

  useEffect(()=>{
  const isLoggedIn = authState.isLoggedIn;
  if(isLoggedIn){
    router.push('/dashboard');
  }
  },[])

  const user = {
    username: '',
    password: ''
  };

  return <div className={styles.page}>
    <div className={styles.container}>
      <label
        htmlFor='username'
      >
        Username:
        <input id='username' autoComplete='true'/>
      </label>

      <label
        htmlFor='password'
      >
        Password:
        <input id='password' autoComplete='true'/>
      </label>

      <button onClick={() => dispatch(loginUser(user)).then(()=> router.push('/dashboard'))}>Login</button>
    </div>
  </div>
}




export default HomePage;
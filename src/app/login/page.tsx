"use client"
import React, { useEffect, useState } from 'react';
import styles from './login.module.css';
import InputText from '../Components/InputText/InputText';
import InputPassword from '../Components/InputPassword/InputPassword';
import Button from '../Components/Button/Button';
import Link from 'next/link';
import useFormState from '../useFormState';
import Image from 'next/image';
import MockRequest from '../Components/MockRequest/MockRequest';
import { useRouter } from 'next/navigation'; // Use 'next/router' if you're using Next.js 12

const LoginPage = () => {
  const [formState, handleFormChange] = useFormState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [showMobileMessage, setShowMobileMessage] = useState(false);

  useEffect(() => {
    // Check if the user is on a mobile device
    const checkMobile = () => {
      const mobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      setIsMobileDevice(mobile);
    };
    checkMobile();
  }, []);

  useEffect(() => {
    if (isLogged) {
      if (isMobileDevice) {
        // Display a message if logged in from mobile
        setShowMobileMessage(true);
      }
    }
  }, [isLogged, isMobileDevice]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log('Form submitted:', formState);
    setLoading(true);
    // Simulate a server request
    setTimeout(() => {
      setLoading(false);
      setIsLogged(true);
    }, 100);
    window.location.href='/'

  };
  

  if (loading) {
    return <MockRequest />;
  } else if (showMobileMessage) {
    return (
      <div className={styles.loginWrapper}>
        <div className={styles.loginContainer} style={{textAlign:"center"}}>
        <Image src='/checkmark.svg' alt='logo' width={160} height={160}></Image>
          <div className={styles.title}>Use your desktop to access Chad</div>
          <div className={styles.welcome}>Chad doesn’t support mobile browsers. To access your dashboard, login from your laptop or desktop computer.</div>
          <Button onclick={()=>window.location.href='/login'}>Ok</Button>
          <span className={styles.misc}>
            Not {formState.email}?{' '}
            <Link href="/login" className={styles.miscLink} onClick={()=>window.location.href='/login'}>
              Log out
            </Link>
          </span>
          </div>
          </div>
    );
  } else {
    return (
      <div className={styles.loginWrapper}>
        <div className={styles.loginContainer}>
          <div className={styles.title}>
            <Image src="/logo.svg" alt="logo" width={32} height={32} />
            Chad
          </div>
          <div className={styles.title}>Welcome back</div>
          <div className={styles.welcome}>
            Feeling ready to take on the day? Chad is too!
          </div>
          <form action="" onSubmit={handleSubmit}>
            <InputText
              label="Email"
              id="email"
              placeholder="megachad@trychad.com"
              type="email"
              onChange={handleFormChange}
            />
            <InputPassword
              label="Password"
              id="password"
              placeholder="Enter your password"
              onChange={handleFormChange}
            />
            <Button>Log In</Button>
          </form>
          <span className={styles.misc}>
            Don't have an account?{' '}
            <Link href="/register" className={styles.miscLink}>
              Join the waitlist
            </Link>
          </span>
        </div>
      </div>
    );
  }
};

export default LoginPage;
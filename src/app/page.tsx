"use client"
import React, { useEffect, useState } from 'react';
import styles from './login/login.module.css'
import Button from '../.././src/app/Components/Button/Button';
import Image from 'next/image';


const HomePage = () => {
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  useEffect(() => {
    // Check if the user is on a mobile device
    const checkMobile = () => {
      const mobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      setIsMobileDevice(mobile);
    };
    checkMobile();
  }, []);

  const handleLogout = () => {
    // Handle user logout logic here
   window.location.href = 'luna/login';
  };

  if (isMobileDevice) {
    return (
      <div className={styles.loginWrapper}>
        <div className={styles.loginContainer} style={{ textAlign: 'center' }}>
          <Image src='/luna/checkmark.svg' alt='logo' width={160} height={160} />
          <div className={styles.title}>Use your desktop to access Chad</div>
          <div className={styles.welcome}>
            Chad doesn’t support mobile browsers. To access your dashboard, login from your laptop or desktop computer.
          </div>
          <Button onclick={()=>window.location.href='/login'}>Ok</Button>
          <span className={styles.misc}>
            Not logged in?{' '}
            <a className={styles.miscLink} onClick={handleLogout}>
              Log out
            </a>
          </span>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.homeWrapper}>
        <div className={styles.homeContainer}>
          {/* Your homepage content for desktop users */}
          <h1>Hello, Luna Edge, my name is Dmytro!</h1>
          <a href="/luna/login" style={{textDecoration:"solid underline"}}>Login</a><br />
          <a href="/luna/register" style={{textDecoration:"solid underline"}}>Register</a>
          {/* Add your dashboard components here */}
        </div>
      </div>
    );
  }
};

export default HomePage;
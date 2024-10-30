"use client"
import React, { FormEvent, useEffect, useState } from 'react';
import styles from './login.module.css';
import InputText from '../Components/InputText/InputText';
import InputPassword from '../Components/InputPassword/InputPassword';
import Button from '../Components/Button/Button';
import Link from 'next/link';
import useFormState from '../useFormState';
import Image from 'next/image';
import MockRequest from '../Components/MockRequest/MockRequest';


const LoginPage = () => {
  const [formState, handleFormChange] = useFormState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log('Form submitted:', formState);
    setLoading(true);
    // Simulate a server request
    setTimeout(() => {
      setLoading(false);
      setIsLogged(true);
    }, 100);
  };

  useEffect(() => {
    if (isLogged) {
      // Redirect to homepage after login
      window.location.href = '/luna';
    }
  }, [isLogged]);

  if (loading) {
    return <MockRequest />;
  } else {
    return (
      <div className={styles.loginWrapper}>
        <div className={styles.loginContainer}>
          <div className={styles.title}>
            <Image src="/luna/logo.svg" alt="logo" width={32} height={32} />
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
            Don&apos;t have an account?{' '}
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
"use client"
import React, { useState } from 'react';
import styles from './register.module.css';
import InputText from '../Components/InputText/InputText';
import InputPassword from '../Components/InputPassword/InputPassword';
import Button from '../Components/Button/Button';
import Link from 'next/link';
import useFormState from '../useFormState';
import Image from 'next/image';
import MockRequest from '../Components/MockRequest/MockRequest';

const RegisterPage = () => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const nextStep = () => {
    setStep(prevStep => (prevStep < 3 ? prevStep + 1 : prevStep));
  };

  const prevStep = () => {
    setStep(prevStep => (prevStep > 0 ? prevStep - 1 : prevStep));
  };

  const ProgressIndicator = () => {
    const steps = [
      "Welcome",
      "Connect your Shopify store",
      "Connect your customer support email",
      "Done"
    ];

    return (
      <div className={styles.progressIndicator}>
        <div className={styles.stepsAndButtons}>
          <div className={styles.stepsWrapper}>
            <div className={styles.steps}>
              {steps.map((_, index) => (
                <React.Fragment key={index}>
                  <div className={index < step ? styles.stepCompleted : index === step ? styles.stepActive : styles.stepInactive}></div>
                  {index < steps.length - 1 && (
                    <div className={index < step ? styles.connectorActive : styles.connectorInactive}></div>
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className={styles.stepsNames}>
              <ul className={styles.stepsList}>
                {steps.map((stepName, index) => (
                  <li key={index} className={index <= step ? styles.listItemActive : styles.listItemInactive}>
                    {stepName}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={styles.buttonsWrapper}>
            {step > 0 && (
              <>
                <button onClick={prevStep} className={`${styles.btnPrev} ${step === 1 ? styles.disabled : ''}`} disabled={step === 1}>&#129168; Back</button>
                <button onClick={nextStep} className={`${styles.btnNext} ${step === steps.length - 1 ? styles.disabled : ''}`} disabled={step === steps.length - 1}>Next &#129170;</button>
              </>
            )}
          </div>
        </div>
        <div className={styles.onboardingStats}>
          <div className={styles.stats}>
            <span className={styles.stat1}>5X</span>
            <span className={styles.stat2}>Acquiring a new customer is 5x more costly than making an unhappy customer happy</span>
          </div>
          <div className={styles.dots}>
            <div className={styles.dotActive}></div>
            <div className={styles.dotInactive}></div>
            <div className={styles.dotInactive}></div>
            <div className={styles.dotInactive}></div>
            <div className={styles.dotInactive}></div>
          </div>
        </div>
      </div>
    );
  };

  const Step0 = () => {
    const [formState, handleFormChange] = useFormState({
      email: '',
      name: '',
      password: ''
    });

    const handleSubmit = (event: any) => {
      event.preventDefault();
      console.log("Form submitted:", formState);
      setLoading(true);

      // Simulate a server request
      setTimeout(() => {
        setLoading(false);
        nextStep();
      }, 2000); // Simulate a 2-second server request
    };

    return (
      <div className={styles.formContainer}>
        <div className={styles.title}>
          <Image src='/logo.svg' alt='logo' width={32} height={32}></Image>
          Chad
        </div>
        <div className={styles.title}>Welcome to Chad</div>
        <div className={styles.welcome}>Go live in 10 minutes! Our self-service widget empowers your customers to manage orders and track shipments 24/7 without driving you crazy.</div>
        <form action="" onSubmit={handleSubmit}>
          <InputText label='Email' id='email' placeholder='megachad@trychad.com' type='email' onChange={handleFormChange}></InputText>
          <InputText label='Your name' id='name' placeholder='Mega Chad' type='text' onChange={handleFormChange}></InputText>
          <InputPassword label='Password' id='password' placeholder='Enter your password' onChange={handleFormChange}></InputPassword>
          <Button>Create account</Button>
        </form>
        <span className={styles.login}>Already have an account? <Link href='/login' className={styles.loginLink}>Login</Link></span>
      </div>
    );
  };

  return (
    <div className={styles.registerWrapper}>
      <div className={styles.registerContainer}>
        <ProgressIndicator />
        <div className={styles.formWrapper}>
          {loading ? <MockRequest /> : step === 0 && <Step0 />}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
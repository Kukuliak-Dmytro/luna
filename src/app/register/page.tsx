"use client"
import React, { useState } from 'react';
import styles from './register.module.css';
import InputText from '../Components/InputText/InputText';
import InputPassword from '../Components/InputPassword/InputPassword';
import Button from '../Components/Button/Button';
import Link from 'next/link';
import useFormState from '../useFormState';
const RegisterPage = () => {

  const [step, setStep] = useState(0);

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
            <button onClick={prevStep} className={`${styles.btnPrev} ${step === 0 ? styles.disabled : ''}`} disabled={step === 0}>&#129168; Back</button>
            <button onClick={nextStep} className={`${styles.btnNext} ${step === steps.length - 1 ? styles.disabled : ''}`} disabled={step === steps.length - 1}>Next &#129170;</button>
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
    const [formState, handleFormChange] =useFormState({
      email: '',
      name: '',
      password: ''
    });
    const handleSubmit = (event: any) => {
      event.preventDefault();
      console.log("Form submitted:", formState);
    }
    return <div className={styles.formContainer}>
      <div className={styles.title}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.1144 20.0641C12.1542 20.3325 11.4283 21.0092 11.0695 21.4628C10.9179 21.6573 10.8503 21.9767 10.7326 22.195C10.6806 22.2903 9.98199 23.6404 9.35337 24.0439C8.65913 24.4848 8.03245 24.5806 7.69651 25.2734C7.56136 25.55 7.50496 25.8544 7.54774 26.1456C7.61046 26.5909 7.90216 27.0105 8.49966 27.2706C9.49339 27.7042 13.0555 27.307 15.0415 24.8538C15.6167 24.2583 15.8714 23.4109 15.975 22.634C16.1899 21.0126 14.6915 19.6246 13.1144 20.0641Z" fill="#32ABF2" />
          <path d="M10.761 20.0958C10.7901 20.052 10.8193 20.0102 10.8495 19.9567C10.8956 19.876 10.9433 19.7846 10.9938 19.6869C10.2695 19.226 9.22662 18.4049 9.18092 18.3689L9.10751 18.312L9.11043 18.3081C9.04237 18.2532 8.9743 18.2021 8.90575 18.1428C8.7531 18.1798 8.60627 18.223 8.46869 18.2746C7.60574 18.5974 7.02525 19.1774 6.61347 19.6203C6.47588 19.7681 6.35775 19.8998 6.24982 20.0048C5.65864 20.5756 5.01009 20.8999 4.73054 21.0239C4.67366 21.0598 4.6158 21.0958 4.55698 21.1318C3.52581 21.7619 3.58027 22.7639 3.69354 23.1489C3.80682 23.5339 4.24048 24.57 5.69607 24.5442C6.82349 24.5243 8.05058 23.9248 8.54696 23.6555C8.54696 23.6555 10.6472 22.3078 11.429 20.6913C11.4304 20.6908 11.1635 20.4594 10.761 20.0958Z" fill="#32ABF2" />
          <path d="M7.59752 16.5263C7.3311 16.166 7.0958 15.8145 6.92613 15.5476C6.85806 15.4397 6.80069 15.3468 6.75548 15.271C6.55566 15.3235 6.30675 15.4081 6.03449 15.5471C5.38011 15.8816 4.71114 16.0644 4.31346 15.9108C3.91626 15.7567 3.04213 15.3648 2.42129 15.8087C1.80045 16.2526 1.59967 17.0654 1.9429 17.6663C2.23801 18.1831 3.00275 18.998 3.86667 19.3295C3.86667 19.3295 5.85072 20.279 8.13231 18.3003C10.0979 16.5963 8.46436 16.5073 7.59752 16.5263Z" fill="#32ABF2" />
          <path d="M15.9848 23.129C21.2681 23.129 25.5511 18.846 25.5511 13.5627C25.5511 8.27933 21.2681 3.99634 15.9848 3.99634C10.7014 3.99634 6.41846 8.27933 6.41846 13.5627C6.41846 18.846 10.7014 23.129 15.9848 23.129Z" fill="#32ABF2" />
          <path d="M18.8558 20.0641C19.816 20.3325 20.5418 21.0092 20.9006 21.4628C21.0523 21.6573 21.1199 21.9767 21.2375 22.195C21.2895 22.2903 21.9882 23.6404 22.6168 24.0439C23.3105 24.4848 23.9377 24.5806 24.2736 25.2734C24.4088 25.55 24.4652 25.8544 24.4224 26.1456C24.3597 26.5909 24.068 27.0105 23.4705 27.2706C22.4767 27.7042 18.9146 27.307 16.9286 24.8538C16.3535 24.2583 16.0987 23.4109 15.9952 22.634C15.7808 21.0126 17.2791 19.6246 18.8558 20.0641Z" fill="#32ABF2" />
          <path d="M21.209 20.0958C21.1798 20.052 21.1507 20.0102 21.1205 19.9567C21.0743 19.876 21.0267 19.7846 20.9761 19.6869C21.7005 19.226 22.7434 18.4049 22.7891 18.3689L22.8625 18.312L22.8595 18.3081C22.9276 18.2532 22.9957 18.2021 23.0637 18.1428C23.2164 18.1798 23.3632 18.223 23.5008 18.2746C24.3637 18.5974 24.9442 19.1774 25.356 19.6203C25.4936 19.7681 25.6117 19.8998 25.7197 20.0048C26.3109 20.5756 26.9594 20.8999 27.2389 21.0239C27.2958 21.0598 27.3537 21.0958 27.4125 21.1318C28.4437 21.7619 28.3892 22.7639 28.2759 23.1489C28.1627 23.5339 27.729 24.57 26.2734 24.5442C25.1465 24.5243 23.9189 23.9248 23.4225 23.6555C23.4225 23.6555 21.3218 22.3078 20.54 20.6913C20.5396 20.6908 20.8069 20.4594 21.209 20.0958Z" fill="#32ABF2" />
          <path d="M24.3734 16.5263C24.6399 16.166 24.8752 15.8145 25.0448 15.5476C25.1129 15.4397 25.1703 15.3468 25.2155 15.271C25.4153 15.3235 25.6642 15.4081 25.9365 15.5471C26.5909 15.8816 27.2598 16.0644 27.6575 15.9108C28.0547 15.7567 28.9288 15.3648 29.5497 15.8087C30.1705 16.2526 30.3713 17.0654 30.0281 17.6663C29.733 18.1831 28.9682 18.998 28.1043 19.3295C28.1043 19.3295 26.1202 20.279 23.8387 18.3003C21.8731 16.5963 23.5066 16.5073 24.3734 16.5263Z" fill="#32ABF2" />
          <path d="M12.6877 14.1848C13.1528 14.1848 13.5298 13.705 13.5298 13.1133C13.5298 12.5215 13.1528 12.0417 12.6877 12.0417C12.2227 12.0417 11.8457 12.5215 11.8457 13.1133C11.8457 13.705 12.2227 14.1848 12.6877 14.1848Z" fill="#34056F" />
          <path d="M13.0245 12.655C13.0245 12.8655 12.8539 13.0361 12.6434 13.0361C12.4329 13.0361 12.2622 12.8655 12.2622 12.655C12.2622 12.4444 12.4329 12.2738 12.6434 12.2738C12.8539 12.2733 13.0245 12.444 13.0245 12.655Z" fill="#F9F9F9" />
          <path d="M19.2825 14.1848C19.7475 14.1848 20.1245 13.705 20.1245 13.1133C20.1245 12.5215 19.7475 12.0417 19.2825 12.0417C18.8174 12.0417 18.4404 12.5215 18.4404 13.1133C18.4404 13.705 18.8174 14.1848 19.2825 14.1848Z" fill="#34056F" />
          <path d="M19.6188 12.655C19.6188 12.8655 19.4481 13.0361 19.2376 13.0361C19.0271 13.0361 18.8564 12.8655 18.8564 12.655C18.8564 12.4444 19.0271 12.2738 19.2376 12.2738C19.4481 12.2733 19.6188 12.444 19.6188 12.655Z" fill="#F9F9F9" />
          <path d="M17.5336 16.41C17.4534 17.3765 17.1282 18.608 15.9857 18.608C15.4217 18.608 15.0571 18.308 14.8232 17.888C15.1072 17.2803 15.8588 16.1981 17.5336 16.41Z" fill="#EB5A55" />
          <path d="M17.5334 16.4101C15.858 16.1981 15.1069 17.2803 14.823 17.888C14.2736 16.9074 14.436 15.271 14.436 15.271C14.8983 15.4694 15.9854 15.429 15.9854 15.429C15.9854 15.429 17.071 15.4694 17.5348 15.271C17.5348 15.271 17.5859 15.7859 17.5334 16.4101Z" fill="#79292A" />
        </svg>
        Chad
      </div>


      <div className={styles.title}>Welcome to Chad</div>
      <div className={styles.welcome}>Go live in 10 minutes! Our self-service widget empowers your customers to manage orders and track shipments 24/7 without driving you crazy.</div>
      <form action="login" onSubmit={handleSubmit}>
        <InputText label='Email' id='email' placeholder='megachad@trychad.com' type='email' onChange={handleFormChange}></InputText>
        <InputText label='Your name' id='name' placeholder='Mega Chad' type='text' onChange={handleFormChange}></InputText>
        <InputPassword label='Password' id='password' placeholder='Enter your password' onChange={handleFormChange}></InputPassword>
        <Button>Create account</Button>
      </form>
      <span className={styles.login}>Already have an account?  <Link href='/login' className={styles.loginLink}>Login</Link></span>
    </div>
  }
  return (
    <div className={styles.registerWrapper}>
      <div className={styles.registerContainer}>
        <ProgressIndicator />
        <div className={styles.formWrapper}>
          {step === 0 && <Step0 />}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

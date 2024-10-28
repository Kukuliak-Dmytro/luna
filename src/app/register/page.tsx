"use client"
import React, { useState } from 'react';
import styles from './register.module.css';


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
          <div className={styles.stats}></div>
          <div className={styles.dots}></div>
        </div>
      </div>
    );
  };
  
  return (
    <div className={styles.registerWrapper}>
      <div className={styles.registerContainer}>
        <ProgressIndicator/>
        <div className={styles.formContainer}>
          step {step} form
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

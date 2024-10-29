"use client"
import React, { useState } from 'react';
import styles from './register.module.css';
import InputText from '../Components/InputText/InputText';
import InputPassword from '../Components/InputPassword/InputPassword';
import InputSelect from '../Components/InputSelect/InputSelect';
import Button from '../Components/Button/Button';
import Link from 'next/link';
import useFormState from '../useFormState';
import Image from 'next/image';
import MockRequest from '../Components/MockRequest/MockRequest';
import Benefit from '../Components/Benefit/Benefit';

const RegisterPage = () => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isStoreConnected, setIsStoreConnected] = useState(false);
  const [isGmailConnected, setIsGmailConnected] = useState(false);

  const nextStep = () => {
    setStep(prevStep => (prevStep < 3 ? prevStep + 1 : prevStep));
  };

  const prevStep = () => {
    setStep(prevStep => (prevStep > 0 ? prevStep - 1 : prevStep));
  };
  const handleConnectShopify = async (service: string, stopLoading: () => void) => {
    const popup = window.open(`/popup?service=${service}`, '_blank', 'width=400,height=300');

    if (!popup) {
      console.error("Failed to open popup");
      return;
    }

    const messageListener = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) {
        return;
      }
    };

    window.addEventListener('message', messageListener);

    const checkPopupClosed = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkPopupClosed);
        stopLoading();
        setIsStoreConnected(true);
        window.removeEventListener('message', messageListener);
      }
    }, 500);
  };
  const handleConnectGmail = async (service: string, stopLoading: () => void) => {
    const popup = window.open(`/popup?service=${service}`, '_blank', 'width=400,height=300');

    if (!popup) {
      console.error("Failed to open popup");
      return;
    }

    const messageListener = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) {
        return;
      }
    };

    window.addEventListener('message', messageListener);

    const checkPopupClosed = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkPopupClosed);
        stopLoading();
        setIsGmailConnected(true);
        window.removeEventListener('message', messageListener);
      }
    }, 500);
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
      }, 1000); // Simulate a 1-second server request
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
        <span className={styles.misc}>Already have an account? <Link href='/login' className={styles.miscLink}>Login</Link></span>
      </div>
    );
  };
  const Step1 = () => {
    const [iUseShopify, setIUseShopify] = useState(true);
    const [platform, setPlatform] = useFormState({ platformId: 1 });
    const [isPlatformSet, setIsPlatformSet] = useState(false);
    const handleConnectToShopify = () => {
      setLoading(true);
      handleConnectShopify('Shopify', () => setLoading(false));

    }
    if (loading) {
      return <MockRequest />;
    }
    if (iUseShopify === true && isStoreConnected === true) {
      return (
        <div className={styles.formContainer} style={{ textAlign: "center" }}>
          <Image src='/store.svg' alt='logo' width={90} height={90}></Image>

          <div className={styles.title}>Store connected</div>
          <div className={styles.welcome}>Chad is now able to manage customer support requests for [STORE-NAME].</div>
          <Button onclick={() => nextStep()}>Continue</Button>

          <span className={styles.misc}>Not your store? <a onClick={()=>setIsStoreConnected(false)} className={styles.miscLink}>Connect another one</a></span>
        </div>
      );
    }
    if (iUseShopify === true) {
      return (
        <div className={styles.formContainer}>
          <div className={styles.title}>
            <Image src='/logo.svg' alt='logo' width={32} height={32}></Image>
            Chad
          </div>
          <div className={styles.title}>Connect your shopify store</div>
          <div className={styles.welcome}>
            Installs the Chad widget in your Shopify store and sets it up to display your customers’ order information and self-serve options.
          </div>
          <div className={styles.benefitsWrapper}>
            <Benefit title='Track orders and shipping' description='Global coverage with 600+ couriers supported'></Benefit>
            <Benefit title='Manage orders' description='Allow customers to track, return, exchange, or report problems with their orders'></Benefit>
            <Benefit title='Process returns and exchanges' description='Automatically checks your store policy and existing inventory before resolving or escalating each request'></Benefit>
          </div>
          <Button onclick={() => handleConnectToShopify()}>Connect store</Button>
          <a onClick={() => setIUseShopify(false)} className={styles.no}>I don't use Shopify</a>
        </div>
      );
    }
    else if (iUseShopify === false && isPlatformSet === false) {
      return (
        <div className={styles.formContainer}>
          <div className={styles.title}>
            <Image src='/logo.svg' alt='logo' width={32} height={32}></Image>
            Chad
          </div>
          <div className={styles.title}>Don’t use Shopify?</div>
          <div className={styles.welcome}>
            Chad Beta is currently only available on Shopify. We’ll send you an email when Chad becomes available on your platform.
          </div>
          <form
            action=""
            onSubmit={(event: any) => {
              event.preventDefault();
              setIsPlatformSet(true)
            }}
          >
            <InputSelect
              options={[
                { name: "Platform 1", value: 1 },
                { name: "Platform 2", value: 2 },
                { name: "Platform 3", value: 3 },
                { name: "Platform 4", value: 4 }
              ]}
              label="Platform"
              onChange={setPlatform}
              id='platformId'
            ></InputSelect>
            <Button>Submit</Button>
            <span className={styles.misc}>Actually use Shopify? <a onClick={()=>setIUseShopify(true)} className={styles.miscLink}>Connect</a></span>
          </form>
        </div>
      );
    } else if (iUseShopify === false && isPlatformSet === true) {
      return (
        <div className={styles.formContainer} style={{ textAlign: "center" }}>
         

          <div className={styles.title}>Response received</div>
          <div className={styles.welcome}>Thank you for your interest in Chad! We’ll be hard at work building integrations to support your platform.</div>
          <Button onclick={() => nextStep()}>Done</Button>
        </div>
      );
    }
  };
  const Step2 = () => {
    const [iUseGmail, setiUseGmail] = useState(true);
    const [email, setemail] = useFormState({ emailId: 1 });
    const [isemailSet, setIsemailSet] = useState(false);
    const handleConnectToGmail = () => {
      setLoading(true);
      handleConnectGmail('Gmail', () => setLoading(false));

    }
    if (loading) {
      return <MockRequest />;
    }
    if (iUseGmail === true && isGmailConnected === true) {
      return (
        <div className={styles.formContainer} style={{ textAlign: "center" }}>
          


          <div className={styles.title}>Gmail connected</div>
          <div className={styles.welcome}>Chad is now able to manage customer support requests for [STORE-NAME].</div>
          <Button onclick={() => nextStep()}>Continue</Button>

          <span className={styles.misc}>Not your store? <a onClick={()=>setIsGmailConnected(false)} className={styles.miscLink}>Connect another one</a></span>
        </div>
      );
    }
    if (iUseGmail === true) {
      return (
        <div className={styles.formContainer}>
          <div className={styles.title}>
            <Image src='/logo.svg' alt='logo' width={32} height={32}></Image>
            Chad
          </div>
          <div className={styles.title}>Connect your customer support email </div>
          <div className={styles.welcome}>
          Allows Chad to send automated responses on your behalf from your usual support mailbox  
          </div>
          <div className={styles.benefitsWrapper}>
            <Benefit title='Contextual responses' description='Custom responses to any support situation from “where’s my stuff?” to “I want a refund”'></Benefit>
            <Benefit title='Reply from anywhere' description='Respond to your customers via email or Chad chat—it’s all saved in the same thread'></Benefit>
            <Benefit title='Categorical inbox tags' description='Automatically checks your store policy and existing inventory before resolving or escalating each request'></Benefit>
          </div>
          <Button onclick={() => handleConnectToGmail()}>Connect Gmail account</Button>
          <a onClick={() => setiUseGmail(false)} className={styles.no}>I don't use Gmail</a>
        </div>
      );
    }
    else if (iUseGmail === false && isemailSet === false) {
      return (
        <div className={styles.formContainer}>
          <div className={styles.title}>
            <Image src='/logo.svg' alt='logo' width={32} height={32}></Image>
            Chad
          </div>
          <div className={styles.title}>Don’t use Gmail?</div>
          <div className={styles.welcome}>
          Chad Beta is currently only integrated with Gmail. We’ll send you an email when Chad becomes compatible with your support ticket platform.
          </div>
          <form
            action=""
            onSubmit={(event: any) => {
              event.preventDefault();
              setIsemailSet(true)
            }}
          >
            <InputSelect
              options={[
                { name: "email 1", value: 1 },
                { name: "email 2", value: 2 },
                { name: "email 3", value: 3 },
                { name: "email 4", value: 4 }
              ]}
              label="Platform"
              onChange={setemail}
              id='emailId'
            ></InputSelect>
            <Button>Submit</Button>
            <span className={styles.misc}>Actually use Gmail? <a onClick={()=>setiUseGmail(true)} className={styles.miscLink}>Connect</a></span>
          </form>
        </div>
      );
    } else if (iUseGmail === false && isemailSet === true) {
      return (
        <div className={styles.formContainer} style={{ textAlign: "center" }}>
         
         <Image src='/checkmark.svg' alt='logo' width={160} height={160}></Image>
          <div className={styles.title}>Response received</div>
          <div className={styles.welcome}>Thank you for your interest in Chad! We’ll be hard at work building integrations to support your email client.</div>
          <Button onclick={() => nextStep()}>Done</Button>
        </div>
      );
    }
  };

  return (
    <div className={styles.registerWrapper}>
      <div className={styles.registerContainer}>
        <ProgressIndicator />
        <div className={styles.formWrapper}>
          {loading ? <MockRequest /> : (step === 0 && <Step0 />)}
          {loading ? null : (step === 1 && <Step1 />)}
          {loading ? null : (step === 2 && <Step2 />)}


        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
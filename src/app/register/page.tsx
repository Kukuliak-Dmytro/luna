"use client"
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
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
import ProgressBar from '../Components/ProgressBar/ProgressBar';

const RegisterPage = () => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [iUseGmail, setiUseGmail] = useState(true);
  const [iUseShopify, setIUseShopify] = useState(true);
  const [isStoreConnected, setIsStoreConnected] = useState(false);
  const [isEmailConnected, setisEmailConnected] = useState(false);
  const [isBackButtonEnabled, setIsBackButtonEnabled] = useState(false);
  const [isNextButtonEnabled, setIsNextButtonEnabled] = useState(false);
  const nextStep = () => {
    if (step < 3) {
      setStep(prevStep => prevStep + 1);
    } else {
      window.location.href = '/luna';
    }
  };

  const prevStep = () => {
    setStep(prevStep => (prevStep > 0 ? prevStep - 1 : prevStep));
  };
  const handleConnectShopify = async (service: string, stopLoading: () => void) => {
    const popup = window.open(`popup?service=${service}`, '_blank', 'width=400,height=300');

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
    const popup = window.open(`popup?service=${service}`, '_blank', 'width=400,height=300');

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
        setisEmailConnected(true);
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
                <button onClick={prevStep} className={`${styles.btnPrev} ${step === 1 ? styles.disabled : ''}`} disabled={!isBackButtonEnabled}>&#129168; Back</button>
                <button onClick={nextStep} className={`${styles.btnNext} ${step === steps.length ? styles.disabled : ''}`} disabled={!isNextButtonEnabled}>Next &#129170;</button>
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

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
      event.preventDefault();
      console.log("Form submitted:", formState);
      setLoading(true);
      // Simulate a server request
      setTimeout(() => {
        setLoading(false);
        nextStep();
      }, 1000);
    };

    return (
      <div className={styles.formContainer}>
        <div className={styles.title}>
          <Image src='/luna/logo.svg' alt='logo' width={32} height={32}></Image>
          Chad
        </div>
        <ProgressBar currentStep={step} totalSteps={4}></ProgressBar>
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
    const [platform, setPlatform] = useFormState({ platformId: 1 });
    const handleConnectToShopify = () => {
      setLoading(true);
      handleConnectShopify('Shopify', () => setLoading(false));
      const event = {
        target: {
            name: 'platformId',
            value: '[connected-shopify-account]'
        }
    } as ChangeEvent<HTMLInputElement>;
      setPlatform(event);
      console.log('Shopify connected');
    }
    useEffect(() => {
      if ( isStoreConnected === true) {
        setIsNextButtonEnabled(true);
      } else {
        setIsNextButtonEnabled(false);
      }
      setIsBackButtonEnabled(false);
    }, []);

    if (loading) {
      return <MockRequest />;
    }
    else if (iUseShopify === true && isStoreConnected === true) {
      return (
        <div className={styles.formContainer} style={{ textAlign: "center" }}>
          <Image src='/luna/store.svg' alt='logo' width={90} height={90}></Image>

          <div className={styles.title}>Store connected</div>
          <div className={styles.welcome}>Chad is now able to manage customer support requests for [STORE-NAME].</div>
          <Button onclick={() => nextStep()}>Continue</Button>

          <span className={styles.misc}>Not your store? <a onClick={() => setIsStoreConnected(false)} className={styles.miscLink}>Connect another one</a></span>
        </div>
      );
    }
    else if (iUseShopify === true && isStoreConnected === false) {
      return (
        <div className={styles.formContainer}>
          <div className={styles.title}>
            <Image src='/luna/logo.svg' alt='logo' width={32} height={32}></Image>
            Chad
          </div>
          <ProgressBar currentStep={step} totalSteps={4}></ProgressBar>
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
          <a onClick={() => setIUseShopify(false)} className={styles.no}>I don&apos;t use Shopify</a>
        </div>
      );
    }
    else if (iUseShopify === false && isStoreConnected === false) {
      return (
        <div className={styles.formContainer}>
          <div className={styles.title}>
            <Image src='/luna/logo.svg' alt='logo' width={32} height={32}></Image>
            Chad
          </div>
          <div className={styles.title}>Don’t use Shopify?</div>
          <div className={styles.welcome}>
            Chad Beta is currently only available on Shopify. We’ll send you an email when Chad becomes available on your platform.
          </div>
          <form
            action=""
            onSubmit={(event: FormEvent) => {
              event.preventDefault();
              setIsStoreConnected(true);
              console.log("Form sent:", platform);
              setLoading(true);

              // Simulate a server request
              setTimeout(() => {
                setLoading(false);
              }, 1000); // Simulate a 1-second server request
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
            <span className={styles.misc}>Actually use Shopify? <a onClick={() => setIUseShopify(true)} className={styles.miscLink}>Connect</a></span>
          </form>
        </div>
      );
    }
    else if (iUseShopify === false && isStoreConnected === true) {

      return (
        <div className={styles.formContainer} style={{ textAlign: "center" }}>
          <Image src='/luna/checkmark.svg' alt='logo' width={160} height={160}></Image>
          <div className={styles.title}>Response received</div>
          <div className={styles.welcome}>Thank you for your interest in Chad! We’ll be hard at work building integrations to support your platform.</div>
          <Button onclick={() => nextStep()}>Done</Button>
          <span className={styles.misc}>Not your store? <a onClick={() => setIsStoreConnected(false)} className={styles.miscLink}>Connect another one</a></span>
        </div>
      );
    }
  };
  const Step2 = () => {
    const [email, setEmail] = useFormState({ emailId: 1 });
    const handleConnectToGmail = () => {
      setLoading(true);
      handleConnectGmail('Gmail', () =>{ setLoading(false);console.log('Gmail connected:', email);});
      const event = {
        target: {
            id: 'emailId',
            value: '[connected-gmail-account]'
        }
    } as ChangeEvent<HTMLInputElement>;
      setEmail(event);      
      console.log('Gmail connected');
  }
    useEffect(() => {
      setIsBackButtonEnabled(true);
      if ( isEmailConnected === true) {
        setIsNextButtonEnabled(true);
      } else {
        setIsNextButtonEnabled(false);
      }
    }, []);
    if (loading) {
      return <MockRequest />;
    }
    else if (iUseGmail === true && isEmailConnected === true) {
      return (
        <div className={styles.formContainer} style={{ textAlign: "center" }}>
          <Image src='/luna/checkmark.svg' alt='logo' width={160} height={160}></Image>
          <div className={styles.title}>Gmail connected</div>
          <div className={styles.welcome}>Chad is now able to manage customer support requests for [STORE-NAME].</div>
          <Button onclick={() => nextStep()}>Continue</Button>

          <span className={styles.misc}>Not your Gmail account? <a onClick={() => setisEmailConnected(false)} className={styles.miscLink}>Connect another one</a></span>
        </div>
      );
    }
    else if (iUseGmail === true && isEmailConnected === false) {
      return (
        <div className={styles.formContainer}>
          <div className={styles.title}>
            <Image src='/luna/logo.svg' alt='logo' width={32} height={32}></Image>
            Chad
          </div>
          <ProgressBar currentStep={step} totalSteps={4}></ProgressBar>
          <div className={styles.title}>Connect your customer support email </div>
          <div className={styles.welcome}>
            Allows Chad to send automated responses on your behalf from your usual support mailbox
          </div>
          <div className={styles.benefitsWrapper}>
            <Benefit title='Contextual responses' description='Custom responses to any support situation from “where’s my stuff?” to “I want a refund”'></Benefit>
            <Benefit title='Reply from anywhere' description='Respond to your customers via email or Chad chat—it’s all saved in the same thread'></Benefit>
            <Benefit title='Categorical inbox tags' description='Automatically checks your store policy and existing inventory before resolving or escalating each request'></Benefit>
          </div>

          <button onClick={() => handleConnectToGmail()} className={styles.connectGmail}>
            <span className={styles.googleLogo}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_2499_50436)">
                <path d="M17.8246 9.20731C17.8246 8.59552 17.775 7.98041 17.6691 7.37854H9.18005V10.8443H14.0414C13.8396 11.962 13.1915 12.9508 12.2423 13.5792V15.8279H15.1426C16.8457 14.2604 17.8246 11.9455 17.8246 9.20731Z" fill="#4285F4" />
                <path d="M9.17995 18.0006C11.6073 18.0006 13.6543 17.2036 15.1458 15.8279L12.2455 13.5792C11.4386 14.1281 10.3969 14.439 9.18326 14.439C6.83529 14.439 4.84448 12.8549 4.13016 10.7252H1.13733V13.0434C2.66516 16.0826 5.77705 18.0006 9.17995 18.0006V18.0006Z" fill="#34A853" />
                <path d="M4.12696 10.7252C3.74996 9.60739 3.74996 8.39703 4.12696 7.27927V4.96106H1.13743C-0.139072 7.50414 -0.139072 10.5003 1.13743 13.0434L4.12696 10.7252V10.7252Z" fill="#FBBC04" />
                <path d="M9.17995 3.56225C10.4631 3.5424 11.7032 4.02523 12.6325 4.9115L15.202 2.34196C13.575 0.814129 11.4155 -0.0258495 9.17995 0.000606499C5.77705 0.000606499 2.66516 1.91867 1.13733 4.96111L4.12686 7.27931C4.83786 5.1463 6.83198 3.56225 9.17995 3.56225V3.56225Z" fill="#EA4335" />
              </g>
              <defs>
                <clipPath id="clip0_2499_50436">
                  <rect width="18" height="18" fill="white" />
                </clipPath>
              </defs>
            </svg>
            </span>
            <span className={styles.googleText}>Connect Gmail account</span>
          </button>
          <a onClick={() => setiUseGmail(false)} className={styles.no}>I don&apos;t use Gmail</a>
        </div>
      );
    }
    else if (iUseGmail === false && isEmailConnected === false) {
      return (
        <div className={styles.formContainer}>
          <div className={styles.title}>
            <Image src='/luna/logo.svg' alt='logo' width={32} height={32}></Image>
            Chad
          </div>
          <div className={styles.title}>Don’t use Gmail?</div>
          <div className={styles.welcome}>
            Chad Beta is currently only integrated with Gmail. We’ll send you an email when Chad becomes compatible with your support ticket platform.
          </div>
          <form
            action=""
            onSubmit={(event: FormEvent) => {
              event.preventDefault();
              setisEmailConnected(true);
              console.log("Form sent:", email);
              setLoading(true);

              // Simulate a server request
              setTimeout(() => {
                setLoading(false);
              }, 1000);
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
              onChange={setEmail}
              id='emailId'
            ></InputSelect>
            <Button>Submit</Button>
            <span className={styles.misc}>Actually use Gmail? <a onClick={() => setiUseGmail(true)} className={styles.miscLink}>Connect</a></span>
          </form>
        </div>
      );
    }
    else if (iUseGmail === false && isEmailConnected === true) {
      return (
        <div className={styles.formContainer} style={{ textAlign: "center" }}>

          <Image src='/luna/checkmark.svg' alt='logo' width={160} height={160}></Image>
          <div className={styles.title}>Response received</div>
          <div className={styles.welcome}>Thank you for your interest in Chad! We’ll be hard at work building integrations to support your email client.</div>
          <Button onclick={() => nextStep()}>Done</Button>
        </div>
      );
    }
  };
  const Step3 = () => {
    useEffect(() => {
      setIsNextButtonEnabled(true);
      setIsBackButtonEnabled(true);
    }, []);
    return (
      <div className={styles.formContainer} >
        <div className={styles.title}>You’re ready to go! 🚀</div>
        <ProgressBar currentStep={step} totalSteps={4}></ProgressBar>
        <div className={styles.welcome}>A fully loaded self-service portal is now ready to deploy on your Shopify store.</div>

        <div className={styles.welcome}>We’ve programmed it to follow industry best practices for shipping, return & exchange, and payment policy.</div>

        <div className={styles.welcome}>You can customize these settings to fit your store policy anytime.</div>

        <div className={styles.welcome}>Lastly, nothing is live until you hit “Go Live”!</div>
        <Button onclick={() => nextStep()}>Start customizing</Button>
      </div>
    )
  }

  return (
    <div className={styles.registerWrapper}>
      <div className={styles.registerContainer}>
        <ProgressIndicator />
        <div className={styles.formWrapper}>
          {loading ? <MockRequest /> : (step === 0 && <Step0 />)}
          {loading ? null : (step === 1 && <Step1 />)}
          {loading ? null : (step === 2 && <Step2 />)}
          {loading ? null : (step === 3 && <Step3 />)}



        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
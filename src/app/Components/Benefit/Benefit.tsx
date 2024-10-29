import React from 'react';
import styles from './Benefit.module.css';
interface BenefitProps {
    title: string;
    description: string;
}


const Benefit: React.FC<BenefitProps> = ({ title, description }) => {
    return (
        <div className={styles.benefitWrapper}>
            <div>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.3333 4L5.99996 11.3333L2.66663 8" stroke="#65BD47" strokeWidth="1.29167" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>

            <div>
                <h2 className={styles.benefitTitle}>{title}</h2>
                <p className={styles.benefitDescrption}>{description}</p>
            </div>
        </div>
    );
};

export default Benefit;
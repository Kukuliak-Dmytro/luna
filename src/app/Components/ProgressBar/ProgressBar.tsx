import React from 'react';
import styles from './ProgressBar.module.css';
const ProgressBar = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => {
    currentStep++;
    return (
        <div className={styles.wrapper}>
            <div className={styles.progressText}>Step {currentStep} of {totalSteps}</div>
            <div className={styles.progressBar}>
            {[...Array(totalSteps)].map((_, index) => (
                <div
                key={index}
                className={`${styles.progressStep} ${index < currentStep ? styles.active : ''} ${index === currentStep - 1 ? styles.lastStep : ''}`}
                ></div>
            ))}
            </div>
        </div>
    );
}

export default ProgressBar;
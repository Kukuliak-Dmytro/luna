import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
    width?: string;
    height?: string;
    children: React.ReactNode;
    onclick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ width, height, children,onclick }) => {
    return (
        <button style={{ width, height }} className={styles.btnPrimary} onClick={onclick}>
            {children}
        </button>
    );
};

export default Button;

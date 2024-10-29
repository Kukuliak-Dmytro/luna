import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
    width?: string;
    height?: string;
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ width, height, children }) => {
    return (
        <button style={{ width, height }} className={styles.btnPrimary}>
            {children}
        </button>
    );
};

export default Button;

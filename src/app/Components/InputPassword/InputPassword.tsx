import React, { useState } from 'react';
import styles from './InputPassword.module.css';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

interface InputPasswordProps {
    label: string;
    id?: string;
    placeholder?: string;
    required?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputPassword: React.FC<InputPasswordProps> = ({ label, id, placeholder, required = true, onChange }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={styles.inputPassword}>
            <label htmlFor={id} className={styles.label}>{label}</label>
            <div className={styles.inputWrapper}>
                <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder={placeholder}
                    id={id}
                    required={required}
                    onChange={onChange}
                    className={styles.input}
                />
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className={styles.toggleButton}
                >
                    {showPassword ? <FaEyeSlash/> : <FaEye/> }
                </button>
            </div>
        </div>
    );
};

export default InputPassword;
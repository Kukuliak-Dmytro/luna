import React from 'react';
import styles from './InputText.module.css';

interface InputTextProps {
    label: string;
    type: string;
    id?: string;
    placeholder?: string;
    required?: boolean;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputText: React.FC<InputTextProps> = ({ label, type='text', id, placeholder, required=true, onChange }) => {
    return (
        <div className={styles.inputText}>
            <label htmlFor={id} className={styles.label}>{label}</label>
            <input type={type} placeholder={placeholder} id={id} required={required} onChange={onChange} className={styles.input}/>
        </div>
    );
};

export default InputText;

import React from 'react';
import styles from  './InputSelect.module.css';

interface InputSelectProps {
    label: string|number;
    options: {name:string,value:string|number}[];
    id?: string;
    onChange?: (event: any) => void;
}
const InputSelect: React.FC<InputSelectProps> = ({ label, options,id,onChange }) => {
    return (
        <div className={styles.selectWrapper}>
            <label htmlFor={id} className={styles.label}>{label}</label>
            <select id={id} onChange={onChange} className={styles.select}>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default InputSelect;
import { useState, ChangeEvent } from 'react';

type InputChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;

/**
 * Custom hook to manage form state.
 *
 * @template T - The shape of the form state object.
 * @param {T} initialState - The initial state of the form.
 * @returns {[T, (event: InputChangeEvent) => void]} - An array containing the current form state and a change handler function.
 *
 * @example
 * const [formState, handleChange] = useFormState({ name: '', email: '' });
 *
 * <input
 *   type="text"
 *   name="name"
 *   value={formState.name}
 *   onChange={handleChange}
 * />
 * <input
 *   type="email"
 *   name="email"
 *   value={formState.email}
 *   onChange={handleChange}
 * />
 */
const useFormState = <T extends Record<string, number|string|boolean>>(initialState: T) => {
    const [formState, setFormState] = useState<T>(initialState);

    const handleChange = (event: InputChangeEvent) => {
        const { id, name, value } = event.target;
        const key = name || id; // Use name if provided, otherwise use id
        setFormState((prev) => {
            const newState = {
                ...prev,
                [key]: value
            };
            return newState;
        });

        // Log the new state after it has been set
        // for debugging purposes
        // setTimeout(() => {
        //     console.log({ ...formState, [key]: value });
        // }, 0);
    };

    return [formState, handleChange] as const;
};

export default useFormState;
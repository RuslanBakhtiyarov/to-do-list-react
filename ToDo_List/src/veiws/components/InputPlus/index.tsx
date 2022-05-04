import React,{useState, useCallback} from "react";

import styles from './index.module.scss';


interface ImputPlusProps {
    onAdd: (title: string) => void;
}

export const ImputPlus: React.FC<ImputPlusProps> = ({
    onAdd,
}) => {
    const [inputValue, setInputValue] = useState('');
    const addTask = useCallback(() => {
        onAdd(inputValue);
        setInputValue('');
    }, [inputValue]);

    return (
        <div className={styles.InputPlus}>
            <input
                type="text"
                className={styles.InputPlusValue}
                value={inputValue}
                onChange={(evt) => {
                    setInputValue(evt.target.value);
                }}
                onKeyDown={(evt) => {
                    if (evt.key === 'Enter') {
                        addTask();
                    }
                }}
                placeholder="Type here..."
            />
            <button
                onClick={addTask}
                aria-label="Add"
                className={styles.InputPlusButton}
            />
        </div>
    )
 };
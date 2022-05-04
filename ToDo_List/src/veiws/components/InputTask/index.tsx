import React,{useState, useEffect, useRef} from "react";

import styles from './input.module.scss';


interface ImputTaskProps {
    id: string,
    title: string,
    onDone: (id: string) => void;
    onEdited: (id: string, title: string) => void;
    onRemoved: (id: string) => void;
}

export const ImputTask: React.FC<ImputTaskProps> = ({
    id,
    title,
    onDone,
    onEdited,
    onRemoved

}) => {

    const [checked, setChecked] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [value, setValue] = useState(title);
    const editTitleInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditMode) {
            editTitleInputRef?.current?.focus();
        }
    }, [isEditMode]);

    return (
        <div className={styles.InputTask}>
            <label className={styles.InputTaskLabel}>
                <input
                    type="checkbox"
                    checked={checked}
                    disabled={isEditMode}
                    className={styles.InputTaskCheckbox}
                    onChange={(evt) => {
                        setChecked(evt.target.checked);
                        if (evt.target.checked) {
                            setTimeout(() => {
                                onDone(id);
                            }, 400);
                        }
                    }}
                />
                {isEditMode ? (
                    <input
                        value={value}
                        ref={editTitleInputRef}
                        onChange={(evt) => {
                            setValue(evt.target.value);
                        }}
                        onKeyDown={(evt) => {
                            if (evt.key === 'Enter') {
                                onEdited(id, value);
                                setIsEditMode(false);
                            }
                        }}
                        className={styles.InputTaskEditTitle}
                    />
                ) : (
                    <h3 className={styles.InputTaskTitle}>{title}</h3>
                )}
            </label>
            {isEditMode ? (
                <button
                    aria-level="Save"
                    className={styles.InputTaskSave}
                    onClick={() => {
                    onEdited(id, value);
                    setIsEditMode(false);
                }}
                />
            ) : (
                <button
                aria-level="Edit"
                className={styles.InputTaskEdit}
                onClick={() => {
                    setIsEditMode(true);
                }}
                />
            )}
            <button
                aria-level="Remove"
                className={styles.InputTaskRemove}
                onClick={() => {
                    if (confirm('Are you sure?')) {
                        onRemoved(id);
                    }
                }}
            />
            
        </div>
    )
 };
// src/components/DoseInput.tsx

import React from 'react';
import { FormData } from '../types';
import { FaPlus, FaMinus } from 'react-icons/fa';
import styles from './Common.module.css';


interface DoseInputProps {
    doseCount: number;
    formData: FormData;
    addDose: () => void;
    removeDose: () => void;
    onDoseChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    submitForm: () => Promise<void>;
}

const DoseInput: React.FC<DoseInputProps> = ({ doseCount, formData, addDose, removeDose, onDoseChange, onTimeChange, submitForm }) => {
    return (
        <section className={styles.formSection}>
            <h2 className={styles.formHeader}>Dosierung</h2>

            <form id="dosingForm" method="post" onSubmit={e => e.preventDefault()} className="space-y-4">
                <div id="doses" className="overflow-auto md:max-h-24">
                    {Array.from({ length: doseCount }, (_, index) => (
                        <div className="flex flex-col md:flex-row gap-6 mb-4" key={index}>
                            <div className="md:w-1/2">
                                <label className={styles.formLabel}>Dosis {index + 1} (mg):</label>
                                <input
                                    name={`dose${index + 1}`}
                                    type="number"
                                    className={styles.inputField}
                                    onChange={onDoseChange}
                                    value={formData.doses[index] || ''}
                                />
                            </div>
                            {index === 0 ?
                                <div className="md:w-1/2">
                                    <label className={styles.formLabel}>Beginn:</label>
                                    <input
                                        name="starting_time_picker"
                                        type="time"
                                        className={styles.inputField}
                                        onChange={onTimeChange}
                                    />
                                </div>
                                :
                                <div className="md:w-1/2">
                                    <label className={styles.formLabel}>Zeit {index + 1} (Min):</label>
                                    <input
                                        name={`time${index + 1}`}
                                        type="number"
                                        className={styles.inputField}
                                        onChange={onDoseChange}
                                        value={formData.times[index] || ''}
                                    />
                                </div>
                            }
                        </div>
                    ))}
                </div>
                <div className="flex justify-between items-center mt-8">
                    <div className="mx-1">
                    <button
                        type="button"
                        onClick={addDose}
                        className={`${styles.buttonCommon} ${styles.addButton}`}
                    >
                        <FaPlus className="mx-1" />
                    </button>
                    <button
                        type="button"
                        onClick={removeDose}
                        className={`${styles.buttonCommon} ${styles.removeButton}`}
                    >
                        <FaMinus className="mx-1" />
                    </button>
                    </div>
                    <button 
                        onClick={submitForm} 
                        className={`${styles.buttonCommon} ${styles.calculateButton}`}
                    >
                            Berechnen
                    </button>
                    

                </div>
            </form>
        </section>
    );
};

export default DoseInput;
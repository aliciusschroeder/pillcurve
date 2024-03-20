// src/components/DoseInput.tsx

import React from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import styles from './Common.module.css';


interface DoseInputProps {
    doseCount: number;
    doses: number[];
    times: number[];
    onDoseChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onAddDose: () => void;
    onRemoveDose: () => void;
    onStartingTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onCalculateClick: () => void;
}

const DoseInput: React.FC<DoseInputProps> = ({
    doseCount,
    doses,
    times,
    onDoseChange,
    onTimeChange,
    onAddDose,
    onRemoveDose,
    onStartingTimeChange,
    onCalculateClick,
}) => {
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
                                    value={doses[index] || ''}
                                />
                            </div>
                            {index === 0 ?
                                <div className="md:w-1/2">
                                    <label className={styles.formLabel}>Beginn:</label>
                                    <input
                                        name="starting_time_picker"
                                        type="time"
                                        className={styles.inputField}
                                        onChange={onStartingTimeChange}
                                    />
                                </div>
                                :
                                <div className="md:w-1/2">
                                    <label className={styles.formLabel}>Zeit {index + 1} (Min):</label>
                                    <input
                                        name={`time${index + 1}`}
                                        type="number"
                                        className={styles.inputField}
                                        onChange={onTimeChange}
                                        value={times[index] || ''}
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
                            onClick={onAddDose}
                            className={`${styles.buttonCommon} ${styles.addButton}`}
                        >
                            <FaPlus className="mx-1" />
                        </button>
                        <button
                            type="button"
                            onClick={onRemoveDose}
                            className={`${styles.buttonCommon} ${styles.removeButton}`}
                        >
                            <FaMinus className="mx-1" />
                        </button>
                    </div>
                    <button
                        onClick={onCalculateClick}
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
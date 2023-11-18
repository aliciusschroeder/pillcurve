// src/components/DoseInput.tsx

import React from 'react';
import { FormData } from '../types';
import { FaPlus, FaMinus } from 'react-icons/fa';

interface DoseInputProps {
    doseCount: number;
    formData: FormData;
    addDose: () => void;
    removeDose: () => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    submitForm: () => Promise<void>;
}

const DoseInput: React.FC<DoseInputProps> = ({ doseCount, formData, addDose, removeDose, handleChange, handleTimeChange, submitForm }) => {
    return (
        <section className="rounded-xl border border-gray-700 p-4 mb-4">
            <h2 className="text-xl font-bold mb-4">Dosierung</h2>
            <form id="dosingForm" method="post" onSubmit={e => e.preventDefault()} className="space-y-4">
                <div id="doses" className="max-h-80 overflow-auto">
                    {Array.from({ length: doseCount }, (_, index) => (
                        <div className="flex flex-col md:flex-row gap-4 mb-2" key={index}>
                            <div className="md:w-1/2">
                                <label className="block text-sm font-medium">Dosis {index + 1} (mg):</label>
                                <input
                                    name={`dose${index + 1}`}
                                    type="number"
                                    className="bg-gray-700 rounded-lg py-2 pl-3 w-full"
                                    onChange={handleChange}
                                    value={formData.doses[index] || ''}
                                />
                            </div>
                            {index === 0 ?
                                <div className="md:w-1/2">
                                    <label className="block text-sm font-medium md:w-1/2">Beginn:</label>
                                    <input
                                        name="starting_time_picker"
                                        type="time"
                                        className="bg-gray-700 rounded-lg py-2 pl-3 w-full"
                                        onChange={handleTimeChange}
                                    />
                                </div>
                                :
                                <div className="md:w-1/2">
                                    <label className="block text-sm font-medium">Zeit {index + 1} (Min):</label>
                                    <input
                                        name={`time${index + 1}`}
                                        type="number"
                                        className="bg-gray-700 rounded-lg py-2 pl-3 w-full"
                                        onChange={handleChange}
                                        value={formData.times[index] || ''}
                                    />
                                </div>
                            }
                        </div>
                    ))}
                </div>
                <div className="flex justify-between items-center mt-4">
                    <button
                        type="button"
                        onClick={addDose}
                        className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        <FaPlus className="mr-2" />
                    </button>
                    <button
                        type="button"
                        onClick={removeDose}
                        className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        <FaMinus className="mr-2" />
                    </button>

                    <button onClick={submitForm} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Berechnen</button>

                </div>
            </form>
        </section>
    );
};

export default DoseInput;
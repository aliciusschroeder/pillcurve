// src/components/DosingForm.tsx

import React, { useState } from 'react';
import Head from 'next/head';
import PresetSelector from './PresetSelector';
import DoseInput from './DoseInput';
import ChartDisplay from './ChartDisplay';
import { PresetOption } from '../types';
import { useDosingForm } from '../hooks/useDosingForm';
import Footer from './Footer';

const DosingForm: React.FC = () => {
    const {
        presets,
        selectedPreset,
        setSelectedPreset,
        formData,
        setFormData,
        addDose,
        removeDose,
        handleChange,
        handleTimeChange,
        chartData,
        submitForm,
    } = useDosingForm();

    return (
        <>
                    <ChartDisplay formData={formData} chartData={chartData}/>
                    <aside className="md:w-96 bg-gray-800 p-6">
                        <h1 className="text-4xl font-bold text-center mb-6">PillCurve</h1>
                        <PresetSelector
                            presets={presets}
                            selectedPreset={selectedPreset}
                            setSelectedPreset={setSelectedPreset}
                            formData={formData}
                            setFormData={setFormData}
                        />
                        <DoseInput
                            doseCount={formData.doses.length}
                            formData={formData}
                            addDose={addDose}
                            removeDose={removeDose}
                            handleChange={handleChange}
                            handleTimeChange={handleTimeChange}
                            submitForm={submitForm}
                        />
                    </aside>
        </>
    );
};

export default DosingForm;
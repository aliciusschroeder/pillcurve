# 💊 PillCurve

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-0.2.0-brightgreen.svg)]()
[![Next.js](https://img.shields.io/badge/Next.js-v14.2.12-black.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5.6.2-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v3.4.12-38B2AC.svg)](https://tailwindcss.com/)
[![Material UI](https://img.shields.io/badge/Material--UI-v5.16.7-0081CB.svg)](https://mui.com/)

**PillCurve** is an interactive web application that calculates the remaining effects of substances based on dosage and pharmacokinetics. Customize your dosing schedule, visualize effect curves, and share your regimen with ease.

> *"In my humble opinion, the tool I have developed fills a significant gap in the digital landscape, addressing a need that, based on my extensive research, has not been met by existing solutions on the internet. My hope is that it will save many of us a lot of head-scratching and calculations. However, I would like to emphasize that what you see today is merely the first prototype. This current iteration represents the minimal viable product—the very first buildable draft that transforms an idea into a functional web application. It's a starting point, a foundation upon which much more can be built and improved. Your understanding and feedback at this early stage are greatly appreciated as we embark on this exciting journey of development and refinement."*

![PillCurve Application Screenshot](https://github.com/aliciusschroeder/pillcurve/blob/main/public/Screenshot.jpg)

## 🚀 Features

- **Preset Selection**: Choose from a predefined list of substances or create custom presets.
- **Custom Dosing**: Personalize your dosing schedule with flexible timing and amounts.
- **Starting Time Input**: Specify your regimen's starting time with a user-friendly time picker.
- **Interactive Chart**: Visualize effect curves with markers indicating intake times.
- **URL Sharing**: Share your dosing regimen effortlessly via encoded URLs.

## 📚 Table of Contents

- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Usage](#-usage)
- [Contributing](#-contributing)
- [Documentation](#-documentation)
  - [Components](#components)
  - [Hooks](#hooks)
  - [Utilities](#utilities)
- [Roadmap](#-roadmap)
- [Contact](#-contact)

## 💻 Tech Stack

- **[Next.js](https://nextjs.org/)**: The leading React framework for production-grade applications.
- **[TypeScript](https://www.typescriptlang.org/)**: Typed JavaScript at any scale.
- **[Tailwind CSS](https://tailwindcss.com/)**: Rapidly build modern websites without ever leaving your HTML.
- **[Material UI](https://mui.com/)**: A popular React UI framework for building responsive and accessible web applications.

## 🛠️ Getting Started

First, clone the repository and install the dependencies:

```bash
git clone https://github.com/aliciusschroeder/pillcurve.git
cd pillcurve
pnpm install
```

> **Note**: This project uses `pnpm` as the package manager. If you don't have it installed, get it from [here](https://pnpm.io/installation).

To run the development server:

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## 🎮 Usage

1. **Select a Preset**: Choose a substance from the preset list or create a custom one by entering the half-life and t<sub>max</sub> values.
2. **Enter Dosage and Timing**:
   - Specify the starting time using the time picker.
   - Enter the dosage amounts.
   - For additional doses, specify the time after the starting time in minutes.
3. **Adjust Doses**: Add more doses by clicking the ➕ button or remove them with the ➖ button.
4. **Calculate**: Click on **"Berechnen"** to calculate and display the substance's effect curve.
5. **Share**: Use the URL to share your dosing regimen with others.

## 🤝 Contributing

Contributions are welcome! Check out the [roadmap](#-roadmap) for planned features, and feel free to suggest new ideas or improvements.

## 📖 Documentation

### Components

- **`ChartContainer.tsx`**: Wraps the chart component with styling.
- **`ChartCore.tsx`**: Renders the main chart using Recharts.
- **`ChartDisplay.tsx`**: Prepares data and passes it to `ChartCore`.
- **`DoseField.tsx`**: Input field for individual dose amounts.
- **`DoseInput.tsx`**: Manages dose and time inputs.
- **`DosingForm.tsx`**: Main form integrating all input components.
- **`Footer.tsx`**: Footer component displayed on all pages.
- **`PresetSelector.tsx`**: Allows selection of predefined substances or custom input.
- **`StartingTimeField.tsx`**: Input field for the starting time using a time picker.
- **`TimeField.tsx`**: Input field for specifying time after the starting time.

### Hooks

- **`useConcentrationData.ts`**: Calculates concentration data based on input.
- **`useDosingForm.ts`**: Manages form state and dosing calculations.
- **`useFormState.ts`**: Manages form data state.
- **`usePresetSelection.ts`**: Handles logic for preset selection and custom presets.
- **`useStartingTimeInput.ts`**: Manages starting time input and conversion.
- **`useUrlState.ts`**: Synchronizes form state with URL parameters for sharing.

### Utilities

- **`calculateConcentration.ts`**: Calculates drug concentration over time.
- **`doseUtils.ts`**: Utilities for managing doses.
- **`formatters.ts`**: Formats chart labels and tooltips.
- **`urlStateUtils.ts`**: Encodes and decodes URL state.

## 🗺️ Roadmap

- ✅ **DONE**: Enable Custom Presets
- ✅ **DONE**: Mark intake times in the graph
- ✅ **DONE**: Display actual time on the X-axis instead of minutes
- 🔄 **IN PROGRESS**: Allow users to enter additional intake times as time of day
- 🔜 **UPCOMING**:
  - Find a suitable data source to make many presets available at once (or make it community-driven)
  - Allow users to create and save new presets and/or dosing regimens
  - Add support for different pharmacokinetic models
  - Improve mobile responsiveness
  - Add localization and internationalization support

## 📬 Contact

For support, feedback, or inquiries, feel free to reach out via:

- [LinkedIn](https://www.linkedin.com/in/alicius/)
- [Instagram](https://www.instagram.com/aliciusschroeder/)
- [X (Twitter)](https://x.com/AliciusSchroder)

---

© 2023-2024 **Alicius Schröder** | [Visit the GitHub Repo](https://github.com/aliciusschroeder/pillcurve)
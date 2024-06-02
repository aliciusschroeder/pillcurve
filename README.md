# PillCurve

PillCurve is a web application designed to calculate the remaining effects of substances based on dosage and pharmacokinetics where you can enter individual timing and dosage schemes. Built with Next.js, TypeScript, and Tailwind CSS, it offers a sleek user interface and customizable calculations for various substances.

*In my humble opinion, the tool I have developed fills a significant gap in the digital landscape, addressing a need that, based on my extensive research, has not been met by existing solutions on the internet. My hope is that it will save many of us a lot of head-scratching and calculations. However, I would like to emphasize that what you see today is merely the first prototype. This current iteration represents the minimal viable product — the very first buildable draft that transforms an idea into a functional web application. It's a starting point, a foundation upon which much more can be built and improved. Your understanding and feedback at this early stage are greatly appreciated as we embark on this exciting journey of development and refinement.*

## Features

- **Preset Selection**: Choose from a predefined list of substances with known pharmacokinetics.
- **Custom Dosing**: Tailor the dosing schedule to your needs, with the ability to add and remove doses as required.
- **Interactive Chart**: Visualize the effect curve with an interactive chart.
- **Responsive Design**: A fully responsive layout that works on desktops, tablets, and mobile devices.

![PillCurve Application Screenshot](https://github.com/aliciusschroeder/pillcurve/blob/main/public/Screenshot.jpg)

## Tech Stack

- **[Next.js](https://nextjs.org/)**: The React framework for production.
- **[TypeScript](https://www.typescriptlang.org/)**: A typed superset of JavaScript that compiles to plain JavaScript.
- **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for rapidly building custom designs.

## Getting Started

Clone the repository and install the dependencies:

```bash
git clone https://github.com/aliciusschroeder/pillcurve.git
cd pillcurve
npm install
```

To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

1. Select a preset for the substance.
2. Enter the dosage and timing for your dosing regimen.
3. Add additional doses if necessary by clicking the '+' button.
4. Click on 'Berechnen' to calculate and display the substance's effect curve.

## Contributing

Contributions are welcome! I already have some ideas listed on my roadmap, but please feel free to add many more :)

## Documentation

- **ChartDisplay.tsx**: Component for rendering the effect curve chart.
- **DoseInput.tsx**: Input fields for dosing amounts and timing.
- **DosingForm.tsx**: The main form component handling the dosing logic.
- **useDosingForm.ts**: A custom hook managing the state and logic of the dosing form.


[//]: # (## License)
[//]: # (This project is licensed under the  License - see the [LICENSE.md] file for details.)

## Roadmap

- ✅ DONE ~~Enable Custom Presets~~
- Find a suitable data-source to make many presets available at once (or make it community driven)
- ✅ DONE ~~Mark intake times in the graph~~
- ✅ DONE ~~Display the actual time on the X-axis instead of minutes~~
- Allow user to switch between entering additional intake times as relative time in minutes (currently supported) or as time of day (not supported yet)

## Contact

For support, feedback, or inquiries, please contact me via my profile (LinkedIn, IG, X).

---
© 2023-2024 Alicius Schröder | [Visit GitHub repo](https://github.com/aliciusschroeder/pillcurve)
```

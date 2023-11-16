// pages/api/calculate.ts

import type { NextApiRequest, NextApiResponse } from 'next';

// Hilfsfunktion zur Umrechnung von Minuten in Stunden und Minuten
function minutesToTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}`;
}

// Funktion zur Berechnung der Konzentration
function calculateConcentration(halfLife: number, tMax: number, doses: number[], times: number[], startTime: number): number[] {
    const timePoints = Array.from({ length: 720 }, (_, i) => i); // 12 Stunden * 60 Minuten
    let concentration = new Array(timePoints.length).fill(0);

    const halfLifeMinutes = halfLife * 60;
    const tMaxMinutes = tMax * 60;

    doses.forEach((dose, index) => {
        const time = times[index];
        if (time !== undefined) {
            for (let t = time; t < timePoints.length; t++) {
                if (t <= time + tMaxMinutes) {
                    // Berechnung des Anflutens bis T_MAX
                    concentration[t] += (dose / tMaxMinutes) * (t - time);
                } else {
                    // Berechnung des Abflutens nach T_MAX
                    concentration[t] += (dose * Math.exp(-Math.log(2) / halfLifeMinutes * (t - time - tMaxMinutes)));
                }
            }
        }
    });

    return concentration;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { halfLife, tMax, doses, times, startingTime } = req.body;

        // Validierung der Eingaben
        if (!halfLife || !tMax || !doses || !times || !startingTime) {
            res.status(400).json({ message: 'Fehlende Eingabeparameter' });
            return;
        }

        const concentration = calculateConcentration(halfLife, tMax, doses, times, startingTime);
        res.status(200).json({ concentration });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Methode ${req.method} Nicht Erlaubt`);
    }
}

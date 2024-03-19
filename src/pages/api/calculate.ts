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
      //console.log('Received request body:', req.body);
  
      // Validation
      if (!halfLife || halfLife <= 0) {
        res.status(400).json({ message: 'Invalid half-life value' });
        return;
      }
      if (!tMax || tMax <= 0) {
        res.status(400).json({ message: 'Invalid t_max value' });
        return;
      }
      if (!doses || !Array.isArray(doses) || doses.length === 0) {
        res.status(400).json({ message: 'Invalid doses array' });
        return;
      }
      if (!times || !Array.isArray(times) || times.length !== doses.length) {
        res.status(400).json({ message: 'Invalid times array' });
        return;
      }
      if (!startingTime || startingTime < 0) {
        res.status(400).json({ message: 'Invalid starting time' });
        return;
      }
  
      try {
        const concentration = calculateConcentration(halfLife, tMax, doses, times, startingTime);
        res.status(200).json({ concentration });
      } catch (error) {
        console.error('Error calculating concentration:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
